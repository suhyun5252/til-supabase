# 사용자 구분 필드 구성

- 각 테이블 컬럼 추가 : user_id(uuid), user_email(text)
- `npm run generate-types` 반드시 실행

## 인증관련 참조

- https://supabase.com/docs/reference/javascript/auth-signinwithpassword

## 할일 액션 수정

- todo-actions.ts 수정

```ts
"use server";
import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type TodosRow = Database["public"]["Tables"]["todos"]["Row"];
export type TodosRowInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type TodosRowUpdate = Database["public"]["Tables"]["todos"]["Update"];

// Create 기능
export async function createTodo(todo: TodosRowInsert) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("todos")
    .insert([
      {
        title: todo.title,
        contents: todo.contents,
        start_date: todo.start_date,
        end_date: todo.end_date,
        user_id: user.id, // 로그인 사용자 정보
        user_email: user.email, // 로그인 사용자 정보
      },
    ])
    .select()
    .single();

  return { data, error, status };
}
// Read 기능
export async function getTodos() {
  const supabase = await createServerSideClient();

  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id) // 로그인 사용자 정보
    .order("id", { ascending: false });
  return { data, error, status } as {
    data: TodosRow[] | null;
    error: Error | null;
    status: number;
  };
}
// Read 기능 id 한개
export async function getTodoId(id: number) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("todos")
    .select()
    .eq("id", id)
    .eq("user_id", user.id) // 로그인 사용자 정보
    .single();
  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}

// Update 기능 id 한개
export async function updateTodoId(id: number, contents: string) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("todos")
    .update({ contents: contents })
    .eq("id", id)
    .eq("user_id", user.id) // 로그인 사용자 정보
    .select()
    .single();

  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}

// Title 업데이트 함수
export async function updateTodoIdTitle(
  id: number,
  title: string,
  startDate: Date | undefined,
  endDate: Date | undefined
) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("todos")
    .update({
      title: title,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id) // 로그인 사용자 정보
    .select()
    .single();

  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}

// row 삭제 기능
export async function deleteTodo(id: number) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }
  const { error, status } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // 로그인 사용자 정보

  return { error, status } as {
    error: Error | null;
    status: number;
  };
}
```

## 블로그 액션 수정

- blog-actions.ts

```ts
"use server";

import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type BlogRow = Database["public"]["Tables"]["blog"]["Row"];
export type BlogRowInsert = Database["public"]["Tables"]["blog"]["Insert"];
export type BlogRowUpdate = Database["public"]["Tables"]["blog"]["Update"];

// Create 기능
export async function createBlog(blog: BlogRowInsert) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("blog")
    .insert([
      {
        title: blog.title,
        content: blog.content,
        user_id: blog.user_id,
        user_email: blog.user_email,
      },
    ])
    .eq("user_id", user.id) // 로그인 사용자 정보

    .select()
    .single();

  return { data, error, status };
}

// Read 기능
export async function getBlogs() {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("blog")
    .select("*")
    .eq("user_id", user.id) // 로그인 사용자 정보
    .order("id", { ascending: false });
  return { data, error, status } as {
    data: BlogRow[] | null;
    error: Error | null;
    status: number;
  };
}

// Read 기능 id 한개
export async function getBlogId(id: number) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("blog")
    .select()
    .eq("id", id)
    .eq("user_id", user.id) // 로그인 사용자 정보
    .single();
  return { data, error, status } as {
    data: BlogRow | null;
    error: Error | null;
    status: number;
  };
}

// Update 기능 id 한개
export async function updateBlogId(id: number, title: string, content: string) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("blog")
    .update({ content: content, title: title })
    .eq("id", id)
    .eq("user_id", user.id) // 로그인 사용자 정보
    .select()
    .single();

  return { data, error, status } as {
    data: BlogRow | null;
    error: Error | null;
    status: number;
  };
}

// row 삭제 기능
export async function deleteBlog(id: number) {
  const supabase = await createServerSideClient();
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("User not authenticated"),
      status: 401,
    };
  }

  const { error, status } = await supabase
    .from("blog")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // 로그인 사용자 정보

  return { error, status } as {
    error: Error | null;
    status: number;
  };
}
```

## 블로그 스토리지 액션 수정(파일 액션 수정)

- blog-storage-action.ts

```ts
"use server";

import { createServerSideClient } from "@/lib/supabase/server";

// 에러 타입에 대해서 파악하기
function handleError(error: unknown) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// 파일 업로드
export async function uploadFile(formData: FormData): Promise<{
  id: string;
  path: string;
  fullPath: string;
} | null> {
  try {
    const supabase = await createServerSideClient();

    // getUser()를 사용하여 인증된 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("인증된 사용자가 아닙니다.");
      return null;
    }

    const file = formData.get("file") as File;

    // 파일 이름에 사용자 ID를 포함시켜 고유성 보장
    const fileExt = file.name.split(".").pop();

    // 인증 과정을 거치고 나면 사용자 ID를 이용해서 파일을 생성한다.
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    // const fileName = `${"tester"}_${Date.now()}.${fileExt}`;

    // upsert : insert 와 update 를 동시에 처리할 수 있는 옵션
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BLOG_BUCKET as string)
      .upload(fileName, file, { upsert: true });

    if (error) {
      handleError(error);
      return null; // 에러 발생 시 null 반환
    }

    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
}

// supabase 에서 파일 삭제
export async function deleteFile(fileName: string) {
  const supabase = await createServerSideClient();

  // getUser()를 사용하여 인증된 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("인증된 사용자가 아닙니다.");
    return null;
  }

  // 파일 삭제시 파일명을 배열로 요소로 추가해서 삭제한다.
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BLOG_BUCKET as string)
    .remove([fileName]);
  handleError(error);
  return data;
}
```

- RLS 정책을 설정해줘야함(SQL Editor 설정 -blog-data 버킷)

```sql
-- ✅ RLS 활성화
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ✅ SELECT
CREATE POLICY "Authenticated users can read blog-data"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IS NOT NULL AND
    bucket_id = 'blog-data'
  );

-- ✅ INSERT (※ WITH CHECK만 사용)
CREATE POLICY "Authenticated users can upload to blog-data"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    bucket_id = 'blog-data'
  );

-- ✅ UPDATE
CREATE POLICY "Authenticated users can update blog-data"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IS NOT NULL AND
    bucket_id = 'blog-data'
  )
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    bucket_id = 'blog-data'
  );

-- ✅ DELETE
CREATE POLICY "Authenticated users can delete blog-data"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() IS NOT NULL AND
    bucket_id = 'blog-data'
  );

```
