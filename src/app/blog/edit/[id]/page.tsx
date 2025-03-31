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
      {blog && <EditEditor blog={blog} />}
    </div>
  );
};

export default Page;
