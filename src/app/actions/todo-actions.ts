"use server";

import { Database } from "@/types/types_db";
import { createServerSideClient } from "@/lib/supabase/server";
import { BoardContent } from "../create/[id]/page";
export type TodoRow = Database["public"]["Tables"]["todo_up"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo_up"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo_up"]["Update"];

function handleError(error: unknown): never {
  // console.error(error);
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error("An unknown error occurred");
}

export async function createTodo(todo: TodoRowInsert): Promise<{
  data: TodoRow[] | null;
  error: Error | null;
  status: number;
}> {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todo_up")
    .insert([
      {
        title: todo.title,
        contents: todo.contents,
        start_date: todo.start_date,
        end_date: todo.end_date,
      },
    ])
    .select();
  console.log(status);

  return { data, error, status };
}

export async function getTodos() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase.from("todo_up").select("*");
  return { data, error, status } as {
    data: TodoRow[] | null;
    error: Error | null;
    status: number;
  };
}

export async function updateTodo({
  contents,
  id,
}: {
  contents: string;
  id: number;
}) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todo_up")
    .update({ contents: contents }) // contents 는 배열로 들어온다.
    .eq("id", id)
    .select();
  return { data, error, status };
}
