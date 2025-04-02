"use server";
const TODOS: string[] = [];
// 할일 목록 가져오기
export const getTodos = async (): Promise<string[]> => {
  // 일부러 서버 지연된것 처럼 1초 대기
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return TODOS;
};

// 할일 목록 추가하기
export const createTodos = async (data: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 새로운 todo 를 추가해서
  TODOS.push(data);
  return TODOS;
};
