# Supabase 셋팅

## 1. `.env 파일 생성`

`/.env.local` 파일 생성
`/.env.production` 파일 생성

```txt
NEXT_PUBLIC_SUPABASE_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STORAGE_BUCKET=

SUPABASE_DB_PASSWORD=
SUPABASE_SERVICE_ROLE=
SITE_URL=http://localhost:3000
```

## 2. 계정 생성

- http://supabase.com
- 깃허브 연동 필수
- .env 내용 작성

## 3. 테이블 생성

- `public.todos` 생성
- id, title, content 생성
- RLS 해제하였음.

## 4. Supabase CLI 설치

- https://supabase.com/docs/guides/api/rest/generating-types

```bash
npm i supabase@">=1.8.1" --save-dev --legacy-peer-deps

```

```bash
npm i --save @supabase/ssr --legacy-peer-deps
npm install @supabase/supabase-js --legacy-peer-deps
```

- Supabase 로그인 후 실행

```bash
npx supabase login
```

## 5. 테이블의 데이터 타입 자동으로 생성하기

- package.json 수정

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "generate-types": "npx supabase gen types typescript --project-id 프로젝트아이디 --schema public > src/types/types_db.ts"
  },
```

```bash
$ npm run generate-types
```

- /src/types/types_db.ts 생성확인 요망

## 6. Supabase 활용 관련 파일 생성

- /src/lib 폴더에 기준
- `/src/lib/supabase 폴더 생성`
- `/src/lib/supabase/client.ts` 파일 생성

```ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/types_db";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- `/src/lib/supabase/server.ts` 파일 생성

```ts
"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createServerSideClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

- `/src/lib/supabase/middleware.ts` 파일 생성

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!
  console.log("supabaseResponse ========= ", supabaseResponse);
  return supabaseResponse;
}
```

## 7. Next.js 라우터 중간 처리 파일

- `/src/middleware.ts` : Next에 역할이 정해진 파일명.(경로 확인!!)
- 임시로 `src/_middleware.ts 파일명 변경`

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```
