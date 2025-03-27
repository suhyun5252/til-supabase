# Delete

- /src/app/create/[id]/page.tsx 추가

```tsx
const deleteContent = (deleteBoardId: string) => {
  console.log("삭제 boardId", deleteBoardId);
  const tempContentArr = contents.filter(
    (item) => item.boardId !== deleteBoardId
  );
};
```

```tsx
<div className="flex flex-col items-center justify-start w-full h-full gap-4">
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

- BasicBoard.tsx 추가

```tsx
interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
  deleteContent: (boardId: string) => void;
}
function BasicBoard({ item, updateContent, deleteContent }: BasicBoardProps) {
  return <div>BasicBoard</div>;
}
```

```tsx
<Button
  variant={"ghost"}
  className="font-normal text-gray-400 hover:bg-red-500 hover:text-white"
  onClick={() => deleteContent(item.boardId)}
>
  Delete
</Button>
```

## 필터링 contents 를 업데이트 진행

- /src/app/create/[id]/page.tsx

```tsx
// 컨텐츠 삭제 함수
const deleteContent = async (deleteBoardId: string) => {
  console.log("삭제 boardId", deleteBoardId);
  const tempContentArr = contents.filter(
    (item) => item.boardId !== deleteBoardId
  );
  // 서버에 Row 를 업데이트 합니다.
  const { data, error, status } = await updateTodoId(
    Number(id),
    JSON.stringify(tempContentArr)
  );

  fetchGetTodoId();
};
```

## home 버튼, page 수정버튼, page 삭제버튼, 레이아웃 배치

```tsx
{
  /* board 메뉴 */
}
<div className="absolute flex w-full items-center justify-center p-3">
  <div className="flex-1">
    <Button variant={"outline"}>
      <ChevronLeftIcon className="w-4 h-4" />
    </Button>
  </div>
  <div className="flex gap-2">
    <Button variant={"outline"}>저장</Button>
    <Button variant={"outline"}>삭제</Button>
  </div>
</div>;
```

## home 버튼 기능

```tsx
import { useParams, useRouter } from "next/navigation";
```

```tsx
const router = useRouter();
```

```tsx
<Button variant={"outline"} onClick={() => router.push("/")}>
  <ChevronLeftIcon className="w-4 h-4" />
</Button>
```

## 저장 버튼 기능

```tsx
// 타이틀 저장 함수
const handleSaveTitle = async () => {
  console.log("타이틀 저장 함수", title);
};
```

```tsx
<Button variant={"outline"} onClick={handleSaveTitle}>
  저장
</Button>
```

```tsx
<input
  type="text"
  placeholder="Enter Title Here"
  className={styles.input}
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

## 타이틀 수정 서버 액션 함수

- todo-action.ts

```ts
// Title 업데이트 함수
export async function updateTodoIdTitle(id: number, title: string) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todos")
    .update({ title: title })
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

## 타이틀 업데이트 활용하기

```tsx
// 타이틀 저장 함수
const handleSaveTitle = async () => {
  console.log("타이틀 저장 함수", title);
  const { data, error, state } = await updateTodoIdTitle(Number(id), title);
  console.log(data);
  console.log(error);
  console.log(state);
};
```

## page 삭제 버튼 기능

```tsx
<Button variant={"outline"} onClick={handleDeletBoard}>
  삭제
</Button>
```

## row 삭제 기능

- todo-action.ts

```ts
// row 삭제 기능
export async function deleteTodo(id: number) {
  const supabase = await createServerSideClient();
  const { error, status } = await supabase.from("todos").delete().eq("id", id);

  return { error, status } as {
    error: Error | null;
    status: number;
  };
}
```

- /src/app/create/[id]/page.tsx

```tsx
// page 삭제하기
const handleDeletBoard = async () => {
  console.log(id, "Id 제거");
  const { error, status } = await deleteTodo(Number(id));
  if (!error) {
    router.push("/");
  }
};
```
