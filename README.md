# blog 목록 출력

- blog 접속시 목록 출력
- 목록 선택시 blog/[id] 로 이동
- 상세 내용에서 삭제/수정 버튼 출력

## 폴더구조

- read : /src/app/blog/page.tsx
  - http://localhost:3000/blog
- create : /src/app/blog/create/page.tsx
  - http://localhost:3000/blog/create
- edit : /src/app/blog/edit/[id]/page.tsx
  - http://localhost:3000/blog/edit/1
- list : /src/app/blog/edit/page.tsx
  - http://localhost:3000/blog/edit

## List 목록 page

```tsx
"use client";

import Link from "next/link";
import { BlogRow, deleteBlog, getBlogs } from "@/app/actions/blog-actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogRow[] | null>([]);
  const fetchGetBlogs = async () => {
    const { data, error, status } = await getBlogs();
    if (data) {
      setBlogs(data);
    }
  };

  //   내용 삭제 : 이미지도 같이 삭제
  const deleteContent = async (_id: number) => {
    console.log("이미지 삭제 처리 필요");
    const { error, status } = await deleteBlog(Number(_id));
    if (!error) {
      fetchGetBlogs();
    }
  };
  useEffect(() => {
    fetchGetBlogs();
  }, []);
  return (
    <div className="w-[920px] h-[100vh] bg-[#f9f9f9] border-r border-[#d6d6d6] flex justify-center">
      <div className="w-full p-5  border-r border-[#000]">
        <h1 className="w-full text-center p-2 mb-10 bg-slate-100 rounded-b-md shadow-md text-2xl font-bold">
          Blog List
        </h1>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          {blogs &&
            blogs.map((item) => (
              <div
                key={item.id}
                className="w-full flex justify-between items-center gap-2 p-2 rounded-lg border border-gray-200 shoadow-sm bg-white shadow-md my-1"
              >
                <p className="flex-1 text-sm font-medium cursor-pointer">
                  <Link href={`/blog/${item.id}`}>{item.title}</Link>
                </p>
                <div>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() => {
                      deleteContent(item.id);
                    }}
                  >
                    <Trash className="w-5 h-5"></Trash>
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => router.push("/blog/create")}
          >
            생성
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
```

## Read page

```tsx
"use client";

import { deleteBlog, getBlogId } from "@/app/actions/blog-actions";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  // 무조건 id string !
  const { id } = useParams();
  const [title, setTitle] = useState<string | null>("");
  const [date, setDate] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");

  //   console.log(id);
  const fetchgetBlogId = async (_id: string) => {
    const { data, error, status } = await getBlogId(Number(_id));
    console.log(data);
    // 타입가드 적용
    if (data) {
      setTitle(data?.title);
      setDate(data?.created_at);
      setContent(data?.content);
    }
  };
  //   내용 삭제 : 이미지도 같이 삭제
  const deleteContent = async () => {
    console.log("이미지 삭제 처리 필요");
    const { error, status } = await deleteBlog(Number(id));
    if (!error) {
      router.push(`/blog`);
    }
  };
  useEffect(() => {
    fetchgetBlogId(id as string);
  }, [id]);
  return (
    <div className="w-[920px] h-[100vh] bg-[#f9f9f9] border-r border-[#d6d6d6] flex justify-center">
      <div className="w-full">
        <h1 className="w-full text-center text-xl mb-4 font-bold flex flex-col">
          Blog Read
        </h1>
        <div className="space-y-2">
          <div className="w-full p-4 font-semibold mb-2">Tilte : {title}</div>
          <div className="w-full p-4 text-gray-600 text-sm mb-2">
            Date : {date?.split("T")[0]}
          </div>
          <div className="w-full p-4 editor">
            {" "}
            Content :
            <div dangerouslySetInnerHTML={{ __html: content || "" }}></div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-2 mt-4">
          <Button
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition-colors"
            variant={"outline"}
            onClick={() => {
              router.push(`/blog/edit/${id}`);
            }}
          >
            수정
          </Button>
          <Button
            className="px-4 py-2 bg-gray-500 cursor-pointer text-white rounded hover:bg-gray-600 transition-colors"
            onClick={() => deleteContent()}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
```

## Edit page

- /src/app/blog/edit/[id]/page.tsx

```tsx
"use client";
import { BlogRow, getBlogId } from "@/app/actions/blog-actions";
import EditEditor from "@/components/editor/edit-editor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogRow | null>(null);
  console.log(id);

  const fetchGetBlogId = async (_id: string) => {
    const { data, error, status } = await getBlogId(Number(_id));
    if (data) {
      setBlog(data);
    }
  };
  useEffect(() => {
    fetchGetBlogId(id as string);
  }, []);
  return (
    <div className="w-[920px] h-[100vh] bg-[#f9f9f9] border-r border-[#d6d6d6] flex justify-center">
      <EditEditor blog={blog} />
    </div>
  );
};

export default Page;
```

- /src/components/editor/edit-editor.tsx

```tsx

```
