# read

- /src/app/actions/todo-actions.ts

```ts
// Read 기능
export async function getTodos() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase.from("todos").select("*");
  return { data, error, status };
}
```

- /src/components/common/navigation/SideNavigation.tsx

```tsx
"use client";
import { getTodos, TodosRow } from "@/app/actions/todo-actions";
// scss
import styles from "@/components/common/navigation/SideNavigation.module.scss";
// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dot, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SideNavigation() {
  const [todos, setTodos] = useState<TodosRow[] | null>([]);
  const fetchgetTodos = async () => {
    const { data, error, status } = await getTodos();
    // 에러발생시
    if (error) {
      toast.error("데이터조회실패", {
        description: `데이터조회에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터조회성공", {
      description: `데이터조회에 성공하였습니다.`,
      duration: 3000,
    });
    setTodos(data);
  };
  useEffect(() => {
    fetchgetTodos();
  }, []);
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
        <div className={styles.container_todos_list}>
          {todos?.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer"
            >
              <Dot className="mr-1 text-green-400 " />
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
```

- /src/components/common/navigation/SideNavigation.module.scss 추가

```scss
&_list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

## DB 칼럼 변경

- content => contents 이름 변경
  text => jsonb 타입 변경

- start_date 추가 (타입 : timestamptz : now())
- end_date 추가 (타입 : timestamptz)
- `npm run generate-types` 반드시 실행!!

## DB 변경으로 인한 데이터 추가 부분 수정 필요

- todo-actions.ts (추가)

```ts
// Create 기능
export async function createTodo(todo: TodosRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .insert([
      {
        title: todo.title,
        contents: todo.contents,
        start_date: todo.start_date,
        end_date: todo.end_date,
      },
    ])
    .select()
    .single();

  return { data, error, status };
}
```

- /src/components/common/navigation/SideNavigation.tsx

```tsx
// create
const onCreate = async () => {
  const { data, error, status } = await createTodo({
    title: "",
    contents: JSON.stringify([]),
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  });
  // 에러 발생시
  if (error) {
    toast.error("데이터 생성 실패", {
      description: `데이터 생성에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 성공시
  toast.success("데이터 생성 성공", {
    description: `데이터 생성에 성공하였습니다.`,
    duration: 3000,
  });
  // 데이터 추가 성공시 할 일 등록창으로 이동시킴
  // http://localhost:3000/create/ [data.id] 로 이동
};

<Button
  variant={"outline"}
  className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
  onClick={onCreate}
>
  Add New Page
</Button>;
```

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
import { createTodo } from "@/app/actions/todo-actions";

function MarkdownDialog() {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);
  // 에디터 제목, 본문
  const [title, setTitle] = useState<string | undefined>("");
  const [contents, setContents] = useState<string | undefined>("");

  // todo 작성
  const onSubmit = async () => {
    if (!title || !contents) {
      toast.error("입력 항목을 확인해 주세요.", {
        description: "제목과 내용을 입력해주세요.",
        duration: 3000,
      });
      return;
    }
    //서버 액션 실행하기

    const { data, error, status } = await createTodo({
      title,
      contents,
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
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
    setContents("");
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
            <MDEditor height={"100%"} value={contents} onChange={setContents} />
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

# 데이터 추가 후 할일 여러개 등록 페이지로 이동하기

- http://localhost:3000/create/[id] 로 이동처리
- app/create 파일들을 /app/create/[id] 폴더로 이동
- SideNavigation.tsx 라우터 추가

```tsx
//  router
const router = useRouter();
const [todos, setTodos] = useState<TodosRow[] | null>([]);
// create
const onCreate = async () => {
  const { data, error, status } = await createTodo({
    title: "",
    contents: JSON.stringify([]),
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  });
  // 에러 발생시
  if (error) {
    toast.error("데이터 생성 실패", {
      description: `데이터 생성에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 성공시
  toast.success("데이터 생성 성공", {
    description: `데이터 생성에 성공하였습니다.`,
    duration: 3000,
  });
  // 데이터 추가 성공시 할 일 등록창으로 이동시킴
  // http://localhost:3000/create/ [data.id] 로 이동
  console.log(data.id);
  router.push(`/create/${data.id}`);
};
```

## 상세페이지에서 params 를 알아내서 처리

- todo-actions.ts : id 에 해당하는 Row 데이터

```ts
// Read 기능 id 한개
export async function getTodosId(id: number) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .select()
    .eq("id", id)
    .single();
  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}
```

- /src/app/create/[id]/page.tsx

```tsx
const fetchGetTodoId = async () => {
  const { data, error, status } = await getTodosId(Number(id));
  if (error) {
    toast.error("데이터 조회 실패", {
      description: `데이터 조회에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 성공시
  toast.success("데이터 조회 성공", {
    description: `데이터 조회에 성공하였습니다.`,
    duration: 3000,
  });
  console.log(data);
};
useEffect(() => {
  fetchGetTodoId();
}, []);
```

- id 에 해당하는 contents[] 안의 요소에 대한 타입 정의

```tsx
// contents 배열에 대한 타입 정의
export interface BoardContent {
  boardId: string; // 랜덤한 아이디를 생성할 예정
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
}
```

- 화면에 각 보드에 출력시킬 state

```tsx
// 데이터 출력 state
const [title, setTitle] = useState<string | null>("");
const [contents, setContents] = useState<BoardContent[]>([]);
const [startDate, setStartDate] = useState<string | Date>("");
const [endDate, setEndDate] = useState<string | Date>("");
```

```tsx
// 데이터 출력 state
const [title, setTitle] = useState<string | null>("");
const [contents, setContents] = useState<BoardContent[]>([]);
const [startDate, setStartDate] = useState<string | Date>("");
const [endDate, setEndDate] = useState<string | Date>("");
// id 에 해당하는 Row 데이터를 읽어오기
const fetchGetTodoId = async () => {
  const { data, error, status } = await getTodosId(Number(id));
  if (error) {
    toast.error("데이터 조회 실패", {
      description: `데이터 조회에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 성공시
  toast.success("데이터 조회 성공", {
    description: `데이터 조회에 성공하였습니다.`,
    duration: 3000,
  });
  setTitle(data?.title ? data.title : "");
  setStartDate(data?.start_date ? data.start_date : new Date());
  setEndDate(data?.end_date ? data.end_date : new Date());
  const temp = data?.contents ? JSON.parse(data.contents as string) : [];
  setContents(temp);
};
useEffect(() => {
  fetchGetTodoId();
}, []);
```

## Page 에서 Add new Board 를 선택시 여러개 추가

```tsx
// 컨텐츠 추가하기
const onCreateContent = () => {
  // 기본을 추가될 내용
  const addContents: BoardContent = {
    boardId: "1111",
    title: "",
    content: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    isCompleted: false,
  };
  const updateContent = [...contents, addContents];
  // 서버에 Row 를 업데이트
  // setContents([...contents, addContents]);
  // console.log(contents);
};
```

- todo-actions.ts : update 액션 추가

```ts
// Update 기능 id 한개
export async function updateTodosId(id: number, contents: string) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todos")
    .update({ contents: contents })
    .eq("id", id)
    .select()
    .single();

  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}
```

- 컨텐츠 추가하기 수정

```tsx
// 컨텐츠 추가하기
const onCreateContent = async () => {
  // 기본으로 추가될 내용
  const addContent: BoardContent = {
    boardId: "1111",
    title: "",
    content: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    isCompleted: false,
  };
  const updateContent = [...contents, addContent];
  // 서버에 Row 를 업데이트 합니다.
  const { data, error, status } = await updateTodoId(
    Number(id),
    JSON.stringify(updateContent)
  );

  // 에러 발생시
  if (error) {
    toast.error("데이터 컨텐츠 업데이트 실패", {
      description: `데이터 컨텐츠 업데이트에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 최종 데이터
  toast.success("데이터 컨텐츠 업데이트 성공", {
    description: "데이터 컨텐츠 업데이트에 성공하였습니다",
    duration: 3000,
  });

  // 자료 새로 후출
  fetchGetTodoId();
};
```

## 목록 출력하기

```tsx
{
  /* 본문 */
}
<div className={styles.container_body}>
  {/* contents 배열의 개수 만큼 출력 되어야함 */}
  {contents.length == 0 ? (
    <div>없음</div>
  ) : (
    <div>
      {contents.map((item) => (
        <BasicBoard key={item.boardId} />
      ))}
    </div>
  )}
</div>;
```

## 랜덤한 boardId 생성하기 : 라이브러리

```bash
npm i nanoid --legacy-peer-deps
```

```tsx
// 기본을 추가될 내용
const addContents: BoardContent = {
  boardId: nanoid(),
  title: "",
  content: "",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  isCompleted: false,
};
```

## 목록이 없는 경우 추가

```tsx
<div className={styles.container_body}>
  {/* conents 배열의 개수 만큼 출력이 되어야 함. */}
  {contents.length == 0 ? (
    <div className={styles.container_body_infoBox}>
      <span className={styles.title}>There is no board yet. </span>
      <span className={styles.subTitle}>
        Click the button and start flashing!
      </span>
      <button className={styles.button} onClick={onCreateContent}>
        <Image
          src="/assets/images/round-button.svg"
          alt="add board"
          width={100}
          height={100}
        />
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-start w-full h-full gap-4">
      {contents.map((item) => (
        <BasicBoard key={item.boardId} />
      ))}
    </div>
  )}
</div>
```

# 첫 페이지에서 Row 추가하기

- /src/app/page.tsx

```tsx
"use client";
import { getTodosId, updateTodosId } from "@/app/actions/todo-actions";
import styles from "@/app/create/[id]/page.module.scss";
// scss
import BasicBoard from "@/components/common/board/BasicBoard";
//comp
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
// shadcn
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// nanoid
import { nanoid } from "nanoid";
import Image from "next/image";

// contents 배열에 대한 타입 정의
export interface BoardContent {
  boardId: string; // 랜덤한 아이디
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
}

function Page() {
  const { id } = useParams();
  // 데이터 출력 state
  const [title, setTitle] = useState<string | null>("");
  const [contents, setContents] = useState<BoardContent[]>([]);
  const [startDate, setStartDate] = useState<string | Date>("");
  const [endDate, setEndDate] = useState<string | Date>("");
  // id 에 해당하는 Row 데이터를 읽어오기
  const fetchGetTodoId = async () => {
    const { data, error, status } = await getTodosId(Number(id));
    if (error) {
      toast.error("데이터 조회 실패", {
        description: `데이터 조회에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 성공시
    toast.success("데이터 조회 성공", {
      description: `데이터 조회에 성공하였습니다.`,
      duration: 3000,
    });
    setTitle(data?.title ? data.title : "");
    setStartDate(data?.start_date ? data.start_date : new Date());
    setEndDate(data?.end_date ? data.end_date : new Date());
    const temp = data?.contents ? JSON.parse(data.contents as string) : [];
    setContents(temp);
  };

  // 컨텐츠 추가하기
  const onCreateContent = async () => {
    // 기본을 추가될 내용
    const addContents: BoardContent = {
      boardId: nanoid(),
      title: "",
      content: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      isCompleted: false,
    };
    const updateContent = [...contents, addContents];
    // setContents([...contents, addContents]);
    // console.log(contents);
    // 서버에 Row 를 업데이트
    const { data, error, status } = await updateTodosId(
      Number(id),
      JSON.stringify(updateContent)
    );
    // 에러 발생시
    if (error) {
      toast.error("데이터 컨텐츠 업데이트 실패", {
        description: `데이터 컨텐츠 업데이트에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      console.log(error);

      return;
    }
    // 최종 데이터
    toast.success("데이터 컨텐츠 업데이트 성공", {
      description: "데이터 컨텐츠 업데이트에 성공하였습니다",
      duration: 3000,
    });

    // 자료 새로 호출
    fetchGetTodoId();
  };
  useEffect(() => {
    fetchGetTodoId();
  }, []);
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
              <LabelCalendar label="From" required={false} />
              <LabelCalendar label="To" required={true} />
            </div>
            <Button
              variant={"outline"}
              className="w-[15%] text-white bg-orange-400 border-orange-500 hover:bg-orange-400 hover:text-white cursor-pointer"
              onClick={onCreateContent}
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      {/* 본문 */}
      <div className={styles.container_body}>
        {/* conents 배열의 개수 만큼 출력이 되어야 함. */}
        {contents.length == 0 ? (
          <div className={styles.container_body_infoBox}>
            <span className={styles.title}>There is no board yet. </span>
            <span className={styles.subTitle}>
              Click the button and start flashing!
            </span>
            <button className={styles.button} onClick={onCreateContent}>
              <Image
                src="/images/round-button.svg"
                alt="add board"
                width={100}
                height={100}
              />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full h-full gap-4">
            {contents.map((item) => (
              <BasicBoard key={item.boardId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
```
