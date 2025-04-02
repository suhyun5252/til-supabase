# React Query

- v3, v4, v5 각 버전의 사용법 및 설치법이 다름
- 현재는 `v5`를 사용함
- https://tanstack.com/query/v5
- https://tanstack.com/query/v5/docs/framework/react/overview
- https://velog.io/@kandy1002/React-Query-푹-찍어먹기

## 1. 설치

- 라이브러리

```bash
npm install @tanstack/react-query --legacy-peer-deps
```

- DevTools 설치

```bash
npm install @tanstack/react-query-devtools --legacy-peer-deps
```

## 2. 개념

- 데이터를 쉽게 가져오고, 자동으로 업데이트해 주는 도구 라이브러리
- `fresh` 한 데이터 : 최신 데이터
- `stale` 한 데이터 : 기존 데이터 (상해버린 데이터)
- 서버 상태를 불러오고, 캐싱하고, 지속적으로 동기화하고 업데이트 도움 라이브러리
- 캐싱기능과, Window Focus Refetching 기능 제공

## 3. 환경설정

### 3.1. ReactQueryProvider 생성

- 이 파일의 용도는 App 전체에서 React Query를 사용하기 위한 provider 역할
- `/src/providers 폴더` 생성
- `/src/providers/ReactQueryProvider.tsx 파일` 생성

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 개발자 도구
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev Tool : React Query DevTools 를 셋팅 */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
```

### 3.2 ReactQueryProvider 적용

- 앱 전체에서 활용할 것이므로
- `/src/app/layout.tsx` 파일에 적용

```tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
// import SideNavigation from "@/components/common/navigation/SideNavigation";
// shadcn/ui
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${roboto.variable}  antialiased`}>
        {/* <SideNavigation /> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
```

## 4. 기능 살펴보기 라우터 구성

- 간단한 Todo 로 실습

### 4.1 Server Action 생성

- `/src/app/actions/test-action.ts 파일` 생성

```ts
"use server";
const TODOS: string[] = [];
// 할일 목록 가져오기
export const getTodos = async (): Promise<string[]> => {
  // 일부러 서버 지연된것 처럼 1초 대기
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return TODOS;
};

// 할일 목록 추가하기
export const createTodos = async (data: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 새로운 todo 를 추가해서
  TODOS.push(data);
  return TODOS;
};
```

### 4.2 test 라우터로 생성

- http://localhost:3000/test 접근
- /src/app/test 폴더
- /src/app/test/page.tsx 파일생성

```tsx
import React from "react";

const page = () => {
  return (
    <div>
      <h1>Test Todo</h1>
    </div>
  );
};

export default page;
```

## 5. useQuery() 살펴보기 (데이터 가져오기)

- /src/app/test/page.tsx

```tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTodos } from "@/app/actions/test-action";

const Page = () => {
  const { data, isLoading, error, refetch } = useQuery({
    // 데이터 가져오기
    queryKey: ["uniq"],
    queryFn: getTodos,
  });
  return (
    <div>
      <h1>Test Todo</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
```

### 5.1 옵션 설명

```tsx
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
});
```

- `queryKey`
  - 데이터를 식별하는 고유 키, 구분자 역할.
  - 이름이 중복되어도 요청은 한 번만 하므로 의미없는 API 호출을 방지.
  - userId 가 1 이라는 값이라면? ["uniq", 1]
  - userId 가 2 이라는 값이라면? ["uniq", 2]
  - 각 사용자 별 목록을 별도로 관리 가능
- `const { data, isLoading, error, refetch, isFetching }`
  - data : 가져온 데이터 (성공하면 데이터 저장됨)
  - isLoading : 데이터 가져오는 중인지 여부 (true/false)
  - error : 에러 발생 시 에러 정보가 담겨있음
  - refetch : 데이터 새로고침 함수
  - `<button onClick={() => refetch()}>다시 호출</button>`
  - isFetching : 데이터 가져오는 중인지 여부 (true/false)

```tsx
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq", userId],
  queryFn: getTodos,
});
```

### 5.2 staleTime 옵션

- 일정한 시간만큼 새로운 데이터를 가져오지 않는다.
- 일정한 시간만큼 캐싱이 되어 있는 데이터를 사용한다.

```tsx
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq", userId],
  queryFn: getTodos,
  staleTime: 5000,
});
```

### 5.3 refetchInterval 옵션

- 일정한 시간만큼 새로운 데이터를 다시 가져옴.

```tsx
// 데이터 가져오기
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  refetchInterval: 5000,
});
```

### 5.4 enabled 옵션

- 조건에 따라서 true인 경우 데이터를 가져온다.

```tsx
// 데이터 가져오기
const [isEnabled, setIsEnabled] = useState<boolean>(false);

const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  enabled: isEnabled,
});
```

### 5.5 refetchOnWindowFocus 옵션

- 웹브라우저 윈도가 포커스 되는 경우 데이터 새로고침 여부.

```tsx
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  refetchOnWindowFocus: true,
});
```

### 5.6 refetchOnMount 옵션

- 컴포넌트가 마운트 되는 경우 데이터 새로고침 여부.

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  refetchOnMount: true,
});
```

### 5.7 refetchOnReconnect 옵션

- 네트워크가 다시 연결될 때 데이터 새로고침

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  refetchOnReconnect: true,
});
```

### 5.8 refetchIntervalInBackground 옵션

- 배경에서 데이터를 새로고침 여부

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  refetchIntervalInBackground: true,
});
```

### 5.9 gcTime 옵션

- 데이터를 캐시에 보관하는 시간

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  gcTime: 1000 * 60 * 5,
});
```

### 5.10 retry 옵션

- 데이터를 가져오다가 실패한 경우 몇 번 더 재실행 할 것인지

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  retry: 3,
});
```

### 5.11 retryDelay 옵션

- 재실행 대기시간

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["uniq"],
  queryFn: getTodos,
  retry: 3,
  retryDelay: 3000,
});
```

## 6. useMutation() 살펴보기 (데이터 추가, 수정, 삭제)

- 데이터를 생성, 수정, 삭제 등의 작업을 처리함
- 데이터를 변경하는 작업
- isLoading , isError, isSuccess 등으로 상태관리(점찍으면 나옴)
- mutation.mutate(데이터) : 데이터를 서버로 보내는 경우
  - `onClick={() => mutation.mutate()}`
- mutation.data : 성공시 반환되는 데이터
- mutation.isLoading : 서버 작업 요청 중이면 true
- mutation.isError : 서버 작업 실패시 true
- mutation.isSuccess : 서버 작업 성공시 true
- mutation.isPending : 서버 작업 요청 중이면 true

```tsx
"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { createTodos, getTodos } from "@/app/actions/test-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [testInput, setTestInput] = useState<string>("");
  // 데이터 가져오기
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["uniq"],
    queryFn: getTodos,
    retry: 3,
    retryDelay: 3000,
  });
  // 데이터 추가하기
  const createMutation = useMutation({
    mutationFn: async () => {
      if (testInput.trim() === "") {
        alert("할일을 등록해주세요.");
        return;
      }
      await createTodos(testInput);
    },
    onSuccess: () => {
      setTestInput("");
      refetch();
    },
    onError: (error) => {
      console.log("Error : 데이터 추가 실패함.");
      console.log(error.message);
    },
  });
  return (
    <div>
      <h1>Test Todo</h1>
      <div className="flex gap-2">
        <Input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
        />
        <Button
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
        >
          {createMutation.isPending ? "추가중 ..." : "할일 추가"}
        </Button>
      </div>
      <div>
        <button onClick={() => refetch()}>다시 호출</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
```

### 6.1 onSuccess : 성공 후 실행될 함수

```tsx
// 데이터 추가하기
const createMutaion = useMutation({
  onSuccess: () => {
    setTestInput("");
    refetch();
  },
});
```

### 6.2 onError : 실패 후 실행될 함수

```tsx
// 데이터 추가하기
const createMutaion = useMutation({
  onError: (error) => {
    console.log("Error : 데이터 추가 실패함.");
    console.log(error.message);
  },
});
```

### 6.3 onSettled : 성공 실패 상관없이 실행될 함수

```tsx
// 데이터 추가하기
const createMutaion = useMutation({
  onSettled: () => {
    console.log("성공 실패 상관없이 실행됨.");
  },
});
```

### 6.4 mutateAsync : 비동기 처리

```tsx
// mutateAsync 비동기 실행 예제
const mutation = useMutation({
  mutationFn: createTodos,
});
const handleAdd = async () => {
  try {
    const now = await mutation.mutateAsync("추가요");
    console.log("now", now);
    queryClient.refetchQueries({ queryKey: ["uniq"] });
  } catch (error) {
    console.log(error);
  }
};
```

```tsx
<Button
  onClick={() => {
    handleAdd();
  }}
>
  비동기 실행
</Button>
```
