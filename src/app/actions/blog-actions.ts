"use server";

import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type BlogRow = Database["public"]["Tables"]["blog"]["Row"];
export type BlogRowInsert = Database["public"]["Tables"]["blog"]["Insert"];
export type BlogRowUpdate = Database["public"]["Tables"]["blog"]["Update"];

// Create 기능
export async function createBlog(blog: BlogRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("blog")
    .insert([
      {
        title: blog.title,
        content: blog.content,
      },
    ])
    .select()
    .single();

  return { data, error, status };
}

// Read 기능
export async function getBlogs() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("blog")
    .select("*")
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
  const { data, error, status } = await supabase
    .from("blog")
    .select()
    .eq("id", id)
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

  const { data, error, status } = await supabase
    .from("blog")
    .update({ content: content, title: title })
    .eq("id", id)
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
  const { error, status } = await supabase.from("blog").delete().eq("id", id);

  return { error, status } as {
    error: Error | null;
    status: number;
  };
}
