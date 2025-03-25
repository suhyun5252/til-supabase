# shadcn/ui

- https://ui.shadcn.com

## 설치

```bash
npx shadcn@latest init
```

# SCSS 설정

- https://nextjs.org/docs/app/building-your-application/styling/sass

```bash
npm install --save-dev sass
```

# 실습 1.

- https://www.youtube.com/playlist?list=PL-cIzvS-5d-2yF2fmNv5S7PCv9zBFiHDe
- `npm run dev`

## 1.1. http://localhost:3000

- /src/app/page.tsx

```tsx
import React from "react";

function Home() {
  return <div>Home</div>;
}

export default Home;
```

## 실습 1.2 퍼블리싱

- `Live Sass Compiler` 플러그인 설치
- `Tailwind CSS IntelliSense` 플러그인 설치
- `Wathing Scss 실행`

- /src/app/page.tsx

```tsx
import styles from "@/app/page.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container_onBoarding}>
        <span className={styles.container_onBoarding_title}></span>
        <div className={styles.container_onBoarding_steps}>
          <span>1. Create a page</span>
          <span>2. Add boards to page</span>
        </div>
        {/* 페이지 추가 버튼 */}
      </div>
    </div>
  );
}

export default Home;
```

- /src/app/page.module.scss 파일생성

## 실습 1.3 shadcn/ui 의 Button 컴포넌트 설치

- https://ui.shadcn.com/docs/components/button

```bash
npx shadcn@latest add button
```

- /src/components/ui 폴더생성 및 Button.tsx 생성됨.

```tsx
import styles from "@/app/page.module.scss";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container_onBoarding}>
        <span className={styles.container_onBoarding_title}></span>
        <div className={styles.container_onBoarding_steps}>
          <span>1. Create a page</span>
          <span>2. Add boards to page</span>
        </div>
        {/* 페이지 추가 버튼 */}
        <Button
          variant={"outline"}
          className="w-full bg-transparent text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
        >
          Add New page
        </Button>
      </div>
    </div>
  );
}

export default Home;
```

- /src/app/page.moudle.scss

```scss
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 920px;
  height: 100vh;
  background-color: #f9f9f9;
  border-right: 1px solid #d6d6d6;
  &_onBoarding {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    gap: 20px;

    &_title {
      font-size: 28px;
      font-weight: 700;
      color: #454545;
    }
    &_steps {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      color: #454545;
    }
  }
}
```

## 실습 1.4. 전체 layout 글꼴 설정

- /src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

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
      <body className={`${roboto.variable}  antialiased`}>{children}</body>
    </html>
  );
}
```

## 실습 1.5. global.css 설정

- 기본 레이아웃 가운데 정렬

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    @apply bg-background text-foreground;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
```

# 실습 2. navigation 레이아웃

- /src/app 폴더는 가능하면 page 관련 사항 배치
- /src/components 폴더 활용
- `/src/components/common 폴더 생성`
- `/src/components/common/navigation 폴더 생성`
- `/src/components/common/navigation/SideNavigation.tsx 파일 생성`
- `/src/components/common/navigation/SideNavigation.module.scss 파일 생성`

## 실습 2.1. SideNavigation 작업

- https://lucide.dev/icons

```tsx
import styles from "@/components/common/navigation/SideNavigation.module.scss";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SideNavigation() {
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.container_searchBox}>
        <Button variant={"outline"} size={"icon"}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default SideNavigation;
```

## 실습 2.2. layout.tsx 에 배치

- /src/app/layout.tsx

```tsx
<body className={`${roboto.variable}  antialiased`}>
  <SideNavigation />
  {children}
</body>
```

## 실습 2.3. shadcn/ui input 에 배치

- https://ui.shadcn.com/docs/components/input

```bash
npx shadcn@latest add input
```

```tsx
import styles from "@/components/common/navigation/SideNavigation.module.scss";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SideNavigation() {
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.container_searchBox}>
        <Input
          type="text"
          placeholder="검색어를 입력하세요."
          className="focus-visible:right"
        />
        <Button variant={"outline"} size={"icon"}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default SideNavigation;
```

- /src/components/common/navigation/SideNavigation.module.scss

```scss
.container {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  &_searchBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
  }
}
```

## 실습 2.4. SideNavigation 수정

```tsx
import styles from "@/components/common/navigation/SideNavigation.module.scss";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SideNavigation() {
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.container_searchBox}>
        <Input
          type="text"
          placeholder="검색어를 입력하세요."
          className="focus-visible:right"
        />
        <Button variant={"outline"} size={"icon"}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {/* page 추가 버튼 */}
      <div className={styles.container_buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
        >
          Add New Page
        </Button>
      </div>
      {/* 추가 항목 출력 영역 */}
      <div className={styles.container_todos}>
        <div className={styles.container_todos_label}>Your Todo</div>
      </div>
    </div>
  );
}

export default SideNavigation;
```

## 실습 2.5. SideNavigation SCSS 수정

```scss
.container {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;

  padding: 20px 24px;

  //   검색창
  &_searchBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
  }
  //   페이지 추가 버튼
  &_buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 12px 0;
  }
  //   추가 항목 출력
  &_todos {
    display: flex;
    flex-direction: column;
    width: 100%;

    &_label {
      margin: 8px 0;
      font-size: 14px;
      font-weight: 500;
      color: #a6a6a6;
    }
  }
}
```
