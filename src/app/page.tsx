"use client";
import styles from "@/app/page.module.scss";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createTodo } from "@/app/actions/todo-actions";
import { useRouter } from "next/navigation";

function Home() {
  // router
  const router = useRouter();
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
  return (
    <div className={styles.container}>
      <div className={styles.container_onBoarding}>
        <span className={styles.container_onBoarding_title}></span>
        <div className={styles.container_onBoarding_steps}>
          <span>1. Create a page</span>
          <span>2. Add boards to page</span>
        </div>
        {/* 페이지 추가 버튼 */}
        <Button
          variant={"outline"}
          className="w-full bg-transparent text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
          onClick={onCreate}
        >
          Add New page
        </Button>
      </div>
    </div>
  );
}

export default Home;
