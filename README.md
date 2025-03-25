# MarkDown Editor

- `/src/components/common/board 폴더 생성`
- `/src/components/common/board/BasicBoard.tsx 파일 생성`
- `/src/components/common/board/BasicBoard.module.scss 파일 생성`

# 실습 1.

## 실습 1.1. BasicBoard.tsx

```tsx
import styles from "@/components/common/board/BasicBoard.module.scss";

function BasicBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          <span className={styles.title}>
            Please enter a title for your board
          </span>
        </div>
      </div>
      <div className={styles.container_body}></div>
    </div>
  );
}

export default BasicBoard;
```

## 실습 1.2. shadcn/ui Checkbox

- https://ui.shadcn.com/docs/components/checkbox

```bash
npx shadcn@latest add checkbox --legacy-peer-deps
```

## 실습 1.3. BasicBoard.tsx

```tsx
import styles from "@/components/common/board/BasicBoard.module.scss";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp } from "lucide-react";

function BasicBoard() {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          <Checkbox className="w-5 h-5" />
          <span className={styles.title}>
            Please enter a title for your board
          </span>
          <Button variant={"ghost"}>
            <ChevronUp calcMode="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* 본문 */}
      <div className={styles.container_body}>
        <div className={styles.container_body_calendarBax}>
          캘린더 선택 버튼 작성예정
        </div>
        <div className={styles.container_body_buttonBox}>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-green-500 hover:text-white"
          >
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        </div>
      </div>
      {/* 하단 */}
      <div className={styles.container_footer}></div>
    </div>
  );
}

export default BasicBoard;
```

## 실습 1.4. BasicBoard.module.scss

```scss
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &_titleBox {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 8px;
      .title {
        width: 100%;
        font-weight: 500;
        font-size: 24px;
        color: #454545;

        &::placeholder {
          font-weight: 500;
          color: #dbdbdb;
        }
      }
    }
  }

  &_body {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin: 24px 0 14px 0;

    &_calendarBox {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding-top: 14px;
    border-top: 1px solid #bdbdbd;
  }
}
```

## 실습 1.5. Board 화면 출력 페이지 만들기

- http://localhost:3000/create
- /src/app/create 폴더 생성
- /src/app/create/page.tsx 파일 생성
- /src/app/create/page.module.scss 파일 생성

## 실습 1.6. Board 출력

```tsx
import styles from "@/app/create/page.module.scss";
import BasicBoard from "@/components/common/board/BasicBoard";

function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.container_body}>
        <BasicBoard />
      </div>
    </div>
  );
}

export default Page;
```

```scss
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 920px;
  height: 100vh;
  background-color: #f9f9f9;
  border-right: 1px solid #e6e6e6;
}
```

## 실습 1.7. Create 페이지 추가

- https://ui.shadcn.com/docs/components/progress

```bash
 npx shadcn@latest add progress
```

- progress 컴포넌트 props 추가

```tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// 사용자 정의 인터페이스
interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicateColor?: string;
}

function Progress({
  className,
  value,
  indicateColor,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`h-full w-full flex-1 transition-all ${indicateColor && indicateColor}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
```

## 실습 1.8. Create 페이지 출력

```tsx
import styles from "@/app/create/page.module.scss";
import BasicBoard from "@/components/common/board/BasicBoard";
import { Progress } from "@/components/ui/progress";

function Page() {
  return (
    <div className={styles.container}>
      {/* 상단 */}
      <header className={styles.container_header}>
        <div className={styles.container_header_contents}>
          <input
            type="text"
            placeholder="Enter Title Here"
            className={styles.input}
          />
          {/* 진행율 */}
          <div className={styles.progressBar}>
            <span className={styles.progressBar_status}>1/10 completed!</span>
            {/* Progress 컴포넌트 배치 */}
            <Progress
              value={33}
              className="w-[30%] h-2"
              indicateColor="bg-orange-500"
            />
          </div>
          {/* 캘린더 선택 추가 */}
          <div className={styles.calendarBox}>캘린터 선택 버튼</div>
        </div>
      </header>
      {/* 본문 */}
      <div className={styles.container_body}>
        <BasicBoard />
      </div>
    </div>
  );
}

export default Page;
```

## 실습 1.9. Create 페이지 SCSS 작업

```scss
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 920px;
  height: 100vh;
  background-color: #f9f9f9;
  border-right: 1px solid #e6e6e6;

  &_header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    background-color: #fff;

    &_contents {
      width: 100%;
      padding: 20px 28px;
      margin-top: 68px;

      .input {
        font-size: 36px;
        font-weight: 700;
        outline: none;

        &::placeholder {
          color: #c4c4c4;
        }
      }

      .progressBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        gap: 16px;
        margin: 8px 0 16px 0;

        &_status {
          color: #6d6d6d;
          font-size: 14px;
        }
      }

      .calendarBox {
        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 20px;

        &_calendar {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
    }
  }
  &_body {
    display: flex;
    align-items: flex-start; // 추후 수정
    justify-content: center;

    width: 100%;
    height: calc(100vh - 250px);

    padding: 28px 16px;

    &_infoBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .title {
        font-size: 24px;
        font-weight: 700;
        color: #454545;
      }

      .subTitle {
        margin: 14px 0 28px 0;
        font-size: 18px;
        color: #454545;
      }

      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 74px;
        height: 74px;

        outline: none;
        border: none;
        cursor: pointer;
      }
    }
  }
}
```

## 실습 1.10. shadcn/ui Calendar 컴포넌트

- https://ui.shadcn.com/docs/components/date-picker
- https://ui.shadcn.com/docs/components/calendar

```bash
npx shadcn@latest add calendar
```

- https://ui.shadcn.com/docs/components/popover

```bash
npx shadcn@latest add popover
```

- `/src/components/common/calendar 폴더` 생성
- `/src/components/common/calendar/LabelCalendar.tsx 파일` 생성
- `/src/components/common/calendar/LabelCalendar.module.scss 파일` 생성
- LabelCalendar.tsx

```tsx
"use client";
import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import styles from "@/components/common/calendar/LabelCalendar.module.scss";

interface LabelCalendarProps {
  label: string;
  required: boolean;
}

function LabelCalendar({ label, required }: LabelCalendarProps) {
  const [date, setDate] = useState<Date>();
  return (
    <div className={styles.container}>
      <span className={styles.container_label}>{label}</span>
      {/* shadcn/ui Calendar 배치 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default LabelCalendar;
```

- LabelCalendar.module.scss

```scss
.container {
  display: flex;
  align-items: center;
  gap: 12px;
  &_label {
    color: #d6d6d6;
  }
}
```

## 1.11. create 페이지 추가

```tsx
import styles from "@/app/create/page.module.scss";
import BasicBoard from "@/components/common/board/BasicBoard";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function Page() {
  return (
    <div className={styles.container}>
      {/* 상단 */}
      <header className={styles.container_header}>
        <div className={styles.container_header_contents}>
          <input
            type="text"
            placeholder="Enter Title Here"
            className={styles.input}
          />
          {/* 진행율 */}
          <div className={styles.progressBar}>
            <span className={styles.progressBar_status}>1/10 completed!</span>
            {/* Progress 컴포넌트 배치 */}
            <Progress
              value={33}
              className="w-[30%] h-2"
              indicateColor="bg-orange-500"
            />
          </div>
          {/* 캘린더 선택 추가 */}
          <div className={styles.calendarBox}>
            <div className={styles.calendarBox_calendar}>
              <LabelCalendar label="From" required={true} />
              <LabelCalendar label="To" required={true} />
            </div>
            <Button
              variant={"outline"}
              className="w-[15%] text-white bg-orange-400 border-orange-500 hover:bg-orange-400 hover:text-white cursor-pointer"
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      {/* 본문 */}
      <div className={styles.container_body}>
        <BasicBoard />
      </div>
    </div>
  );
}

export default Page;
```

## 1.12. LabelCalendar 에 calendar 옵션 처리(보이기, 숨기기)

```tsx
"use client";
import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import styles from "@/components/common/calendar/LabelCalendar.module.scss";

interface LabelCalendarProps {
  label: string;
  required: boolean;
}
// required : true 면  날짜 선택
// required : false 면  날짜 선택 불가
function LabelCalendar({ label, required }: LabelCalendarProps) {
  const [date, setDate] = useState<Date>();
  return (
    <div className={styles.container}>
      <span className={styles.container_label}>{label}</span>
      {/* shadcn/ui Calendar 배치 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        {!required && (
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}

export default LabelCalendar;
```

## 1.13. BasicBoard.tsx 수정

```tsx
import styles from "@/components/common/board/BasicBoard.module.scss";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp } from "lucide-react";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";

function BasicBoard() {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          <Checkbox className="w-5 h-5" />
          <span className={styles.title}>
            Please enter a title for your board
          </span>
          <Button variant={"ghost"}>
            <ChevronUp calcMode="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* 본문 */}
      <div className={styles.container_body}>
        <div className={styles.container_body_calendarBox}>
          <LabelCalendar label="From" required={false} />
          <LabelCalendar label="To" required={true} />
        </div>
        <div className={styles.container_body_buttonBox}>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-green-500 hover:text-white"
          >
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        </div>
      </div>
      {/* 하단 */}
      <div className={styles.container_footer}></div>
    </div>
  );
}

export default BasicBoard;
```

# 실습 2. Markdown Editor 설치

- https://ui.shadcn.com/docs/components/separator

```bash
npx shadcn@latest add separator
```

## 2.1. shadcn/ui Dialog 설치

- https://ui.shadcn.com/docs/components/dialog

```bash
npx shadcn@latest add dialog

```

## 2.2 실습

- `/src/components/common/dialog 폴더 생성`
- `/src/components/common/dialog/MarkdownDialog.tsx 파일 생성`
- `/src/components/common/dialog/MarkdownDialog.module.scss 파일 생성`

## 2.2.1 MarkdownDialog.tsx

```tsx
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
// shadcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LabelCalendar from "../calendar/LabelCalendar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
function MarkdownDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Content
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-fit min-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog_titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board"
                className={styles.dialog_titlebox_title}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            <LabelCalendar label="From" required={false} />
            <LabelCalendar label="To" required={false} />
          </div>
          <Separator />
          {/* 마크다운 입력 영역 */}
          <div className={styles.dialog_markdown}>여기에 에디터 배치</div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog_buttonBox}>
            <Button
              variant={"ghost"}
              className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-400 hover:bg-orange-500 hover:text-white"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
```

## 2.2.2 MarkdownDialog.module.scss

```scss
.dialog {
  &_titleBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 8px;

    &_title {
      width: 100%;
      outline: none;
      border: none;

      font-weight: 500;
      font-size: 24px;
      color: #303030;
      &::placeholder {
        font-weight: 500;
        color: #bdbdbd;
      }
    }
  }
  &_calendarBox {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;
    padding-top: 16px;
  }
  &_markdown {
    width: 100%;
    height: 40vh;
    padding-top: 16px;
  }
  &_buttonBox {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 16px;
    padding-top: 16px;
  }
}
```

# Markdown Editor 설치

- https://www.npmjs.com/package/@uiw/react-md-editor

```bash
 npm i @uiw/react-md-editor --legacy-peer-deps
```

## 실습 1.

- MarkdownDialog.tsx

```tsx
"use client";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
// Markdown
import MDEditor from "@uiw/react-md-editor";
// shadcn
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LabelCalendar from "../calendar/LabelCalendar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function MarkdownDialog() {
  const [content, setContent] = useState<string | undefined>("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Content
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-fit min-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog_titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board"
                className={styles.dialog_titlebox_title}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            <LabelCalendar label="From" required={false} />
            <LabelCalendar label="To" required={false} />
          </div>
          <Separator />
          {/* 마크다운 입력 영역 */}
          <div className={styles.dialog_markdown}>
            <MDEditor height={"100%"} value={content} onChange={setContent} />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog_buttonBox}>
            <Button
              variant={"ghost"}
              className="font-normal text-center text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-400 hover:bg-orange-500 hover:text-white"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
```
