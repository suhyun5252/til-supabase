"use server";
import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type TodosRow = Database["public"]["Tables"]["todos"]["Row"];
export type TodosRowInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type TodosRowUpdate = Database["public"]["Tables"]["todos"]["Update"];

// Create 기능
export async function createTodo(todo: TodosRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .insert([
      {
        title: todo.title,
        contents: todo.contents,
        start_date: todo.start_date,
        end_date: todo.end_date,
      },
    ])
    .select()
    .single();

  return { data, error, status };
}
// Read 기능
export async function getTodos() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase.from("todos").select("*");
  return { data, error, status } as {
    data: TodosRow[] | null;
    error: Error | null;
    status: number;
  };
}
// Read 기능 id 한개
export async function getTodosId(id: number) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("todos")
    .select()
    .eq("id", id)
    .single();
  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}

// Update 기능 id 한개
export async function updateTodosId(id: number, contents: string) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todos")
    .update({ contents: contents })
    .eq("id", id)
    .select()
    .single();

  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}
