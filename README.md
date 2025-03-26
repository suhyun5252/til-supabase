# Create

## 실습 1

- shadcn/ui Toast 컴포넌트 배치
- https://ui.shadcn.com/docs/components/toast 제거됨
- https://ui.shadcn.com/docs/components/sonner 사용

```bash
npx shadcn@latest add sonner
```

## 실습 2. Toast 적용하기

- /src/app/layout.tsx 에 적용

```tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideNavigation from "@/components/common/navigation/SideNavigation";
// shadcn/ui
import { Toaster } from "@/components/ui/sonner";

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
        <SideNavigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

## 실습 3.Toast 출력시키기

- /src/components/common/dialog/MarkdownDialog.tsx

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

function MarkdownDialog() {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  // todo 작성
  const onSubmit = () => {
    if (!title || !content) {
      toast.error("입력 항목을 확인해 주세요.", {
        description: "제목과 내용을 입력해주세요.",
        duration: 3000,
      });
      return;
    }

    toast.success("성공하였습니다.", {
      description: "Supabase에 자료가 저장되었습니다.",
      duration: 3000,
    });
  };
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-400 hover:bg-orange-500 hover:text-white"
              onClick={onSubmit}
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

## 실습 4. Supabase 연동하기 - actions 생성

- `/src/app/actions 폴더 생성`
- `/src/app/actions/todos-actions.ts 파일 생성`

```tsx
"use server";
import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type TodosRow = Database["public"]["Tables"]["todos"]["Row"];
export type TodosRowInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type TodosRowUpdate = Database["public"]["Tables"]["todos"]["Update"];

// Create 기능
export async function createTodo(todos: TodosRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .insert([{ title: todos.title, content: todos.content }])
    .select()
    .single();

  return { data, error, status };
}
```

## 실습 5. 서버 액션 실행하기

- MarkdownDialog.tsx 에서 서버 액션 실행하기

```tsx
// todo 작성
const onSubmit = async () => {
  if (!title || !content) {
    toast.error("입력 항목을 확인해 주세요.", {
      description: "제목과 내용을 입력해주세요.",
      duration: 3000,
    });
    return;
  }
  //서버 액션 실행하기

  const { data, error, status } = await createTodo({
    title,
    content,
  });

  if (error) {
    toast.error("등록 실패", {
      description: `Error : ${error.message}`,
      duration: 3000,
    });
    return;
  }

  toast.success("성공하였습니다.", {
    description: "Supabase에 자료가 저장되었습니다.",
    duration: 3000,
  });
};
```

## 실습 6. UI 수정(창닫기)

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { createTodo } from "@/app/actions/todo-actions";

function MarkdownDialog() {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);
  // 에디터 제목, 본문
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content) {
      toast.error("입력 항목을 확인해 주세요.", {
        description: "제목과 내용을 입력해주세요.",
        duration: 3000,
      });
      return;
    }
    //서버 액션 실행하기

    const { data, error, status } = await createTodo({
      title,
      content,
    });

    if (error) {
      toast.error("등록 실패", {
        description: `Error : ${error.message}`,
        duration: 3000,
      });
      return;
    }

    toast.success("성공하였습니다.", {
      description: "Supabase에 자료가 저장되었습니다.",
      duration: 3000,
    });
    setOpen(false);
    setTitle("");
    setContent("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-400 hover:bg-orange-500 hover:text-white"
              onClick={onSubmit}
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
