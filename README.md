# test

## 1. 목록에서 page 이동하기

- sideNavigation.tsx

```tsx
{
  todos!.map((item) => (
    <div
      key={item.id}
      className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer"
      onClick={() => router.push(`/create/${item.id}`)}
    >
      <Dot className="mr-1 text-green-400 " />
      <span className="text-sm">{item.title ? item.title : "No Title"}</span>
    </div>
  ));
}
```

## 2. Page에서 목록 스크롤 시키기

- src/app/create/[id]/page.tsx
- `overflow-y-auto` 추가

```tsx
<div className="flex flex-col items-center justify-start w-full h-full gap-4 overflow-y-auto">
  {contents.map((item) => (
    <BasicBoard
      key={item.boardId}
      item={item}
      updateContent={updateContent}
      deleteContent={deleteContent}
    />
  ))}
</div>
```

- global.css 추가

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display: none;
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

## 3. Progress 정리하기

- src/app/create/[id]/page.tsx

```tsx
// Progress Bar 처리
const [completedCount, setCompletedCount] = useState<number>(0);
```

```tsx
<span className={styles.progressBar_status}>
  {completedCount}/{contents.length} completed!
</span>
```

```tsx
<Progress
  value={totalCount}
  className="w-[30%] h-2"
  indicateColor="bg-orange-500"
/>
```

```tsx
// contents 의 isCompleted 가 true 인 갯수 파악하기
const calcCompletedCount = (temp: BoardContent[]) => {
  const count = temp.filter((item) => item.isCompleted === true);
  setCompletedCount(count.length);
  setTotalCount((count.length / temp.length) * 100);
  // console.log("completedCount : ", completedCount);
};
```

```tsx
// contents 의 isCompleted 가 true 인 갯수 파악하기
const calcCompletedCount = () => {
  const count = contents.filter((item) => item.isCompleted).length;
  setCompletedCount(count);
};
```

### checkbox 처리 필요

- BasicBoard.tsx

```tsx
"use client";
```

```tsx
const [isComplted, setIsCompleted] = useState<boolean>(item.isCompleted);
```

```tsx
<Checkbox
  className="w-5 h-5"
  checked={item.isCompleted}
  onCheckedChange={() => {
    item.isCompleted = !item.isCompleted;
    console.log("item.isCompleted : ", item.isCompleted);
    setIsCompleted(item.isCompleted);
    updateContent(item);
  }}
/>
```

- MarkdownDialog

```tsx
const [isCheckCompleted, setIsCheckCompleted] = useState<boolean>(
  item.isCompleted
);
```

```tsx
<Checkbox
  className="w-5 h-5"
  checked={isCheckCompleted}
  onCheckedChange={() => {
    setIsCheckCompleted(!isCheckCompleted);
  }}
/>
```

- `  isCompleted: isCheckCompleted,` 수정

```tsx
const tempContent: BoardContent = {
  boardId: item.boardId,
  startDate: startDate,
  endDate: endDate,
  title: title,
  content: content,
  isCompleted: isCheckCompleted,
};
```

```tsx
useEffect(() => {
  setIsCheckCompleted(item.isCompleted);
}, [item.isCompleted]);
```

### 출력하기

- /src/app/create/[id]/page.tsx
- `calcCompletedCount(temp);` 수정
- `calcCompletedCount 매개변수 수정`

```tsx
// id 에 해당하는 Row 데이터를 읽어오기
const fetchGetTodoId = async () => {
  const { data, error, status } = await getTodoId(Number(id));
  // 에러 발생시
  if (error) {
    toast.error("데이터 호출 실패", {
      description: `데이터 호출에 실패하였습니다. ${error.message}`,
      duration: 3000,
    });
    return;
  }
  // 최종 데이터
  toast.success("데이터 호출 성공", {
    description: "데이터 호출에 성공하였습니다",
    duration: 3000,
  });

  setTitle(data?.title ? data.title : "");
  setStarDate(data?.start_date ? new Date(data.start_date) : new Date());
  setEndDate(data?.end_date ? new Date(data.end_date) : new Date());
  const temp = data?.contents ? JSON.parse(data.contents as string) : [];
  setContents(temp);
  // 카운트
  calcCompletedCount(temp);
};

// contents 의 isCompleted 가 true 인 갯수 파악하기
const calcCompletedCount = (temp: BoardContent[]) => {
  const count = temp.filter((item) => item.isCompleted).length;
  setCompletedCount(count);
  // console.log("completedCount : ", completedCount);
};
```

### 날짜 보완

- todo-aciton.ts 변경

```ts
// Update 기능 id 한개
export async function updateTodoIdTitle(
  id: number,
  title: string,
  startDate: Date | undefined,
  endDate: Date | undefined
) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todos")
    .update({
      title: title,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    })
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

- /src/app/create/[id]/page.tsx

```tsx
// 타이틀 저장 함수
const handleSaveTitle = async () => {
  const { data, error, status } = await updateTodoIdTitle(
    Number(id),
    title,
    startDate,
    endDate
  );
};
```

```tsx
<LabelCalendar
  label="From"
  required={false}
  selectedDate={startDate}
  onDateChange={setStarDate}
/>
<LabelCalendar
  label="To"
  required={false}
  selectedDate={endDate}
  onDateChange={setEndDate}
/>
```
