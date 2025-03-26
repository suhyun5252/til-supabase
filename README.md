# content 데이터 출력 및 수정

- Props 로 모든 `데이터`를 전달 및 `업데이트 함수` 전달함.

```tsx
<BasicBoard key={item.boardId} item={item} updateContent={updateContent} />
```

- BasicBoard.tsx : props 전달

```tsx

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function BasicBoard({ item, updateContent }: BasicBoardProps) {
  .....
}
```

```tsx
<MarkdownDialog item={item} updateContent={updateContent} />
```

- MarkdownDialog.tsx

```tsx
interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function MarkdownDialog({ item, updateContent }: BasicBoardProps) {
  .....
}
```

## Markdown 에 데이터 출력

```tsx
"use client";

import { useState } from "react";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";

// Markdown
import MDEditor from "@uiw/react-md-editor";

// shadcn/ui
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// 컴포넌트
import LabelCalendar from "../calendar/LabelCalendar";
import { createTodo } from "@/app/actions/todos-action";

// contents 배열에 대한 타입 정의
interface BoardContent {
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
  boardId: string; // 랜던함 아이디를 생성해줄 예정
}

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function MarkdownDialog({ item, updateContent }: BasicBoardProps) {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);

  // 에디터의 제목/본문 내용
  const [title, setTitle] = useState<string | undefined>(
    item.title ? item.title : ""
  );
  const [content, setContent] = useState<string | undefined>(
    item.content ? item.content : ""
  );

  const [startDate, setStartDate] = useState<Date | string>(
    item.startDate ? item.startDate : new Date().toISOString()
  );
  const [endDate, setEndDate] = useState<Date | string>(
    item.endDate ? item.endDate : new Date().toISOString()
  );

  const [isCompleted, setIsComplted] = useState<boolean>(
    item.isCompleted ? item.isCompleted : false
  );

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content || !startDate || !endDate) {
      toast.error("입력항목을 확인해 주세요.", {
        description: "제목, 내용, 날짜를 입력해주세요.",
        duration: 3000,
      });
      return;
    }

    // 해당 Row 를 바로 업데이트 하는 것이 아니고,
    // contents 칼럼의 [] 을 업데이트하고.. 실제 Row 를 업데이트 해야함.
    const tempContent: BoardContent = {
      boardId: item.boardId,
      startDate: startDate,
      endDate: endDate,
      title: title,
      content: content,
      isCompleted: isCompleted,
    };
    updateContent(tempContent);

    // 창닫기
    setOpen(false);
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full justify-center flex font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          {/* 현재 내용이 있는 경우와 내용이 없는 경우로 구분 */}
          {item.title ? "Modify Content" : "Add Content"}
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
                className={styles.dialog_titleBox_title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            {/* 잠시 뒤 날짜 전달 */}
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
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
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

# 마크다운 수정 내용을 Row 업데이트 실행하기

```tsx
"use client";

import { useState } from "react";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";

// Markdown
import MDEditor from "@uiw/react-md-editor";

// shadcn/ui
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// 컴포넌트
import LabelCalendar from "../calendar/LabelCalendar";
import { createTodo } from "@/app/actions/todos-action";

// contents 배열에 대한 타입 정의
interface BoardContent {
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
  boardId: string; // 랜던함 아이디를 생성해줄 예정
}

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function MarkdownDialog({ item, updateContent }: BasicBoardProps) {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);

  // 에디터의 제목/본문 내용
  const [title, setTitle] = useState<string | undefined>(
    item.title ? item.title : ""
  );
  const [content, setContent] = useState<string | undefined>(
    item.content ? item.content : ""
  );

  const [startDate, setStartDate] = useState<Date | string>(
    item.startDate ? item.startDate : new Date().toISOString()
  );
  const [endDate, setEndDate] = useState<Date | string>(
    item.endDate ? item.endDate : new Date().toISOString()
  );

  const [isCompleted, setIsComplted] = useState<boolean>(
    item.isCompleted ? item.isCompleted : false
  );

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content || !startDate || !endDate) {
      toast.error("입력항목을 확인해 주세요.", {
        description: "제목, 내용, 날짜를 입력해주세요.",
        duration: 3000,
      });
      return;
    }

    // 해당 Row 를 바로 업데이트 하는 것이 아니고,
    // contents 칼럼의 [] 을 업데이트하고.. 실제 Row 를 업데이트 해야함.
    const tempContent: BoardContent = {
      boardId: item.boardId,
      startDate: startDate,
      endDate: endDate,
      title: title,
      content: content,
      isCompleted: isCompleted,
    };
    updateContent(tempContent);

    // 창닫기
    setOpen(false);
    // setTitle("");
    // setContent("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full justify-center flex font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          {/* 현재 내용이 있는 경우와 내용이 없는 경우로 구분 */}
          {item.title ? "Modify Content" : "Add Content"}
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
                className={styles.dialog_titleBox_title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            {/* 잠시 뒤 날짜 전달 */}
            <LabelCalendar
              label="From"
              required={false}
              selectedDate={startDate}
              onDateChange={setStartDate}
            />
            <LabelCalendar
              label="To"
              required={false}
              selectedDate={endDate}
              onDateChange={setEndDate}
            />
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
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
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

- LabelCalendar : 날짜 적용

```tsx
"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import styles from "@/components/common/calendar/LabelCalendar.module.scss";
import { Dispatch, SetStateAction } from "react";

interface LabelCalendarProps {
  label: string;
  required: boolean;
  selectedDate: Date | string;
  onDateChange: Dispatch<SetStateAction<string | Date>>;
}
// required : true 면  날짜 선택
// required : false 면  날짜 선택 불가
function LabelCalendar({
  label,
  required,
  selectedDate,
  onDateChange,
}: LabelCalendarProps) {
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
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        {!required && (
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
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

## 날짜가 1이 차이나는 문제

- 원인은 기준시 차이때문
- BasicBoard.tsx 에서 날짜 선택 컴포넌트 수정

```tsx
import styles from "@/components/common/board/BasicBoard.module.scss";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp } from "lucide-react";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import MarkdownDialog from "../dialog/MarkdownDialog";

// contents 배열에 대한 타입 정의
interface BoardContent {
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
  boardId: string; // 랜덤한 아이디를 생성해줄 예정
}

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function BasicBoard({ item, updateContent }: BasicBoardProps) {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          <Checkbox className="w-5 h-5" />
          <span className={styles.title}>
            {item.title ? item.title : "Please enter a title for your board"}
          </span>
          <Button variant={"ghost"}>
            <ChevronUp calcMode="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* 본문 */}
      <div className={styles.container_body}>
        <div className={styles.container_body_calendarBox}>
          <LabelCalendar
            label="From"
            required={true}
            selectedDate={new Date(item.startDate)}
          />
          <LabelCalendar
            label="To"
            required={true}
            selectedDate={new Date(item.endDate)}
          />
          {/* <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">From</span>
            <Input value={item.startDate.toString().split("T")[0]} disabled />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">From</span>
            <Input value={item.endDate.toString().split("T")[0]} disabled />
          </div> */}
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
      <div className={styles.container_footer}>
        <MarkdownDialog item={item} updateContent={updateContent} />
      </div>
    </div>
  );
}

export default BasicBoard;
```

- LabelCalender.tsx

```tsx
"use client";
import { Dispatch, SetStateAction, useState } from "react";

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
  selectedDate: Date | undefined;
  onDateChange?: Dispatch<SetStateAction<undefined | Date>>;
}
// required : true 면  날짜 선택
// required : false 면  날짜 선택 불가
function LabelCalendar({
  label,
  required,
  selectedDate,
  onDateChange,
}: LabelCalendarProps) {
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
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        {!required && (
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
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

- MarkdownDialog.tsx

```tsx
"use client";

import { useState } from "react";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";

// Markdown
import MDEditor from "@uiw/react-md-editor";

// shadcn/ui
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// 컴포넌트
import LabelCalendar from "../calendar/LabelCalendar";

// contents 배열에 대한 타입 정의
interface BoardContent {
  boardId: string; // 랜덤한 아이디를 생성해줄 예정
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
}

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function MarkdownDialog({ item, updateContent }: BasicBoardProps) {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);

  // 에디터의 제목/본문 내용
  const [title, setTitle] = useState<string | undefined>(
    item.title ? item.title : ""
  );
  const [content, setContent] = useState<string | undefined>(
    item.content ? item.content : ""
  );

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const [isCompleted, setIsComplted] = useState<boolean>(
    item.isCompleted ? item.isCompleted : false
  );

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content || !startDate || !endDate) {
      toast.error("입력항목을 확인해 주세요.", {
        description: "제목, 내용, 날짜를 입력해주세요.",
        duration: 3000,
      });
      return;
    }

    // 해당 Row 를 바로 업데이트 하는 것이 아니고,
    // contents 칼럼의 [] 을 업데이트하고.. 실제 Row 를 업데이트 해야함.
    const tempContent: BoardContent = {
      boardId: item.boardId,
      startDate: startDate,
      endDate: endDate,
      title: title,
      content: content,
      isCompleted: isCompleted,
    };
    updateContent(tempContent);

    // 창닫기
    setOpen(false);
    // setTitle("");
    // setContent("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full justify-center flex font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          {/* 현재 내용이 있는 경우와 내용이 없는 경우로 구분 */}
          {item.title ? "Modify Content" : "Add Content"}
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
                className={styles.dialog_titleBox_title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            {/* 잠시 뒤 날짜 전달 */}
            <LabelCalendar
              label="From"
              required={false}
              selectedDate={startDate}
              onDateChange={setStartDate}
            />
            <LabelCalendar
              label="To"
              required={false}
              selectedDate={endDate}
              onDateChange={setEndDate}
            />
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
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
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
