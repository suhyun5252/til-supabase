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
