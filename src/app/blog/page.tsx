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
