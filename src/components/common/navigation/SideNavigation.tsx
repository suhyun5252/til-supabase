"use client";
import { createTodo, getTodos, TodosRow } from "@/app/actions/todo-actions";
import { sidebarStateAtom } from "@/app/store";
// scss
import styles from "@/components/common/navigation/SideNavigation.module.scss";
// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { Dot, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SideNavigation() {
  // jotai
  const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom);
  //  router
  const router = useRouter();
  const [todos, setTodos] = useState<TodosRow[] | null>([]);
  // create
  const onCreate = async () => {
    const { data, error, status } = await createTodo({
      title: "",
      contents: JSON.stringify([]),
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
    });
    // 에러 발생시
    if (error) {
      toast.error("데이터 생성 실패", {
        description: `데이터 생성에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 성공시
    toast.success("데이터 생성 성공", {
      description: `데이터 생성에 성공하였습니다.`,
      duration: 3000,
    });
    // 데이터 추가 성공시 할 일 등록창으로 이동시킴
    // http://localhost:3000/create/ [data.id] 로 이동
    console.log(data.id);

    router.push(`/create/${data.id}`);
  };
  // read
  const fetchgetTodos = async () => {
    const { data, error, status } = await getTodos();
    // 에러발생시
    if (error) {
      toast.error("데이터조회실패", {
        description: `데이터조회에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터조회성공", {
      description: `데이터조회에 성공하였습니다.`,
      duration: 3000,
    });
    setTodos(data);
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
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.container_searchBox}>
        <Input
          type="text"
          placeholder="검색어를 입력하세요."
          className="focus-visible:right"
        />
        <Button variant={"outline"} size={"icon"}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {/* page 추가 버튼 */}
      <div className={styles.container_buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
          onClick={onCreate}
        >
          Add New Page
        </Button>
      </div>
      {/* 추가 항목 출력 영역 */}
      <div className={styles.container_todos}>
        <div className={styles.container_todos_label}>
          {/* 로그아웃 버튼 배치 */}
          {"홍길동"}님 YourTodo
        </div>
        <div className={styles.container_todos_list}>
          {todos!.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer"
              onClick={() => router.push(`/create/${item.id}`)}
            >
              <Dot className="mr-1 text-green-400 " />
              <span className="text-sm">
                {item.title ? item.title : "No Title"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
