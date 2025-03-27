# jotai

- https://jotai.org
- https://tutorial.jotai.org/quick-start/intro

```bash
npm install jotai@latest --legacy-peer-deps
```

## /src/app/store 폴더 생성

- `/src/app/store` 폴더 생성
- `/src/app/store/indext.ts 파일` 생성

```ts
import { atom } from "jotai";

// 상태값 저장 구분용 변수
export const sidebarStateAtom = atom<string>("");
```

## Store 활용

- SideNavigation.tsx

```tsx
// jotai
const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom);
```

```tsx
useEffect(() => {
  fetchgetTodos();
}, [sidebarState]);
```

## Store 갱신하기

- `/src/app/create/[id]/page.tsx` 파일

```tsx
const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom);
```

- `/src/app/actions/todo-actions.ts` 파일 수정

```ts
// Read 기능
export async function getTodos() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });
  return { data, error, status } as {
    data: TodosRow[] | null;
    error: Error | null;
    status: number;
  };
}
```

- 삭제하기 동기화

- SideNavigation.tsx 파일 수정
- `setSidebarState("default");` 위로 이동

```tsx
    setSidebarState("default");
  };
useEffect(() => {
  if (sidebarState !== "default") {
    fetchgetTodos();
  }
  if (sidebarState === "delete") {
    router.push("/");
  }
}, [sidebarState]);
```

- /[id]/Page.tsx 파일 수정

```tsx
// page 삭제하기
const handleDeletBoard = async () => {
  console.log(id, "Id 제거");
  const { error, status } = await deleteTodo(Number(id));
  if (!error) {
    setSidebarState("deletePage");
  }
};
```
