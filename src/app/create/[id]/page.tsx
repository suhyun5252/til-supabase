"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createTodo, getTodos, updateTodo } from "@/app/actions/todo-actions";
import Image from "next/image";

import BasicBoard from "@/components/common/board/BasicBoard";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";

import { nanoid } from "nanoid";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
// css
import styles from "@/app/create/[id]/page.module.scss";

interface Todo {
  id: number;
  title: string;
  start_date: string | Date;
  end_date: string | Date;
  contents: BoardContent[];
}

// 보드 하나 하나의 콘텐츠로
interface BoardContent {
  boardId: string | number;
  isCompleted: boolean;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  content: string;
}

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [boards, setBoards] = useState<Todo | null>(null);
  const [startDate, setStartDate] = useState<string | Date>(new Date());
  const [endDate, setEndDate] = useState<string | Date>(new Date());

  // step 1
  const onCreateBoard = async () => {
    let newContents: BoardContent[] = [];

    const boardContent: BoardContent = {
      boardId: nanoid(),
      isCompleted: false,
      title: "",
      startDate: "",
      endDate: "",
      content: "",
    };

    if (boards && boards.contents.length > 0) {
      newContents = [...boards.contents];
      newContents.push(boardContent);
      // step 2
      insertRowData(newContents);
    } else if (boards && boards.contents.length === 0) {
      newContents = [boardContent];
      // step 2
      insertRowData(newContents);
    }
  };
  // step 2
  const insertRowData = async (contents: BoardContent[]) => {
    if (boards?.contents) {
      // update 를 한다.
      const { data, error, status } = await updateTodo({
        contents: JSON.stringify(contents),
        id: Number(id),
      });

      if (error) {
        toast.error("Failed to update todo");
        return;
      }
      toast.success("Success", {
        description: "Supabase가 업데이트 되었습니다.",
        duration: 3000, // 3초 후 자동 사라짐 (옵션)
      });
      // step 3
      getData();
    } else {
      // 값이 없으면 생성
      const { data, error, status } = await createTodo({
        title: "New Todo",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        contents: JSON.stringify(contents),
      });

      if (error) {
        toast.error("Failed to create todo");
        return;
      }
      toast.success("Success", {
        description: "Supabase에 글이 생성되었습니다.",
        duration: 3000, // 3초 후 자동 사라짐 (옵션)
      });
      // step 3
      getData();
    }
  };

  // step 3 기존에 Supabase에 있는 데이터를 가져오는 함수
  const getData = async () => {
    const { data, error, status } = await getTodos();
    if (error) {
      toast.error("Failed to get todo");
      return;
    }
    if (data !== null) {
      data.forEach((item) => {
        if (item.id === Number(id)) {
          // contents가 문자열로 저장되어 있으므로 파싱이 필요합니다
          const parsedItem = {
            ...item,
            contents:
              typeof item.contents === "string"
                ? JSON.parse(item.contents)
                : item.contents,
          };
          setBoards(parsedItem as Todo);
        }
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.container_header}>
        <div className={styles.container_header_contents}>
          <input
            type="text"
            placeholder="Enter Title Here"
            className={styles.input}
          />
          <div className={styles.progressBar}>
            <span className={styles.progressBar_status}>1/10 completed</span>
            {/* 프로구래스바 UI */}
            <Progress
              value={33}
              className="w-[30%] h-2"
              indicatorColor="bg-orange-500"
            />
          </div>
          {/* 캘린더 추가 */}
          <div className={styles.calendarBox}>
            <div className={styles.calendarBox_calendar}>
              {/* 캘린더 UI */}
              <LabelCalendar label="From" required={true} />
              <LabelCalendar label="To" />
            </div>
            {/* 보드 추가 버튼 */}
            <Button
              variant="outline"
              className="w-[15%] text-white bg-orange-400 border-orange-500 hover:bg-orange-400 hover:text-white"
              onClick={onCreateBoard}
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      {/* Body 영역 */}
      <div className={styles.container_body}>
        {boards?.contents?.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className={styles.container_body_infoBox}>
              <span className={styles.title}>Ther is no board yet.</span>
              <span className={styles.subTitle}>
                Click the button and start flashing!
              </span>
              <button className={styles.button}>
                <Image
                  src="/assets/images/round-button.svg"
                  alt="round-button"
                  width={100}
                  height={100}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full h-full gap-4">
            {boards?.contents?.map((item) => <BasicBoard key={item.boardId} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
