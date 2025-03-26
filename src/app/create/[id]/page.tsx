"use client";
import { useParams } from "next/navigation";
// nanoid
import { nanoid } from "nanoid";
// scss
import styles from "@/app/create/[id]/page.module.scss";
// action
import { getTodoId, updateTodoId } from "@/app/actions/todo-actions";
// component
import BasicBoard from "@/components/common/board/BasicBoard";
// shadcn/ui
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

// contents 배열에 대한 타입 정의
interface BoardContent {
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
  boardId: string; // 랜던함 아이디를 생성해줄 예정
}

function Page() {
  const { id } = useParams();
  // 데이터 출력 state
  const [title, setTitle] = useState<string | null>("");
  const [contents, setContents] = useState<BoardContent[]>([]);
  const [startDate, setStarDate] = useState<undefined | Date>(new Date());
  const [endDate, setEndDate] = useState<undefined | Date>(new Date());

  // 컨텐츠 데이터 업데이트 함수
  const updateContent = async (newData: BoardContent) => {
    console.log("최종전달 ", newData);

    const newContentArr = contents.map((item) => {
      if (item.boardId === newData.boardId) {
        return newData;
      }
      return item;
    });
    // 서버에 Row 를 업데이트 합니다.
    const { data, error, status } = await updateTodoId(
      Number(id),
      JSON.stringify(newContentArr)
    );

    fetchGetTodoId();
  };

  // id 에 해당하는 Row 데이터를 읽어오기
  const fetchGetTodoId = async () => {
    const { data, error, status } = await getTodoId(Number(id));
    // 에러 발생시
    if (error) {
      toast.error("데이터 호출 실패", {
        description: `데이터 호출에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터 호출 성공", {
      description: "데이터 호출에 성공하였습니다",
      duration: 3000,
    });

    setTitle(data?.title ? data.title : "");
    setStarDate(data?.start_date ? new Date(data.start_date) : new Date());
    setEndDate(data?.end_date ? new Date(data.end_date) : new Date());
    const temp = data?.contents ? JSON.parse(data.contents as string) : [];
    setContents(temp);
  };

  // 컨텐츠 추가하기
  const initData: BoardContent = {
    boardId: nanoid(),
    title: "",
    content: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    isCompleted: false,
  };

  const onCreateContent = async (newData: BoardContent) => {
    const addContent = newData;
    // 기본으로 추가될 내용

    const updateContent = [...contents, addContent];
    console.log("updateContent : ", updateContent);
    // 서버에 Row 를 업데이트 합니다.
    const { data, error, status } = await updateTodoId(
      Number(id),
      JSON.stringify(updateContent)
    );

    // 에러 발생시
    if (error) {
      toast.error("데이터 컨텐츠 업데이트 실패", {
        description: `데이터 컨텐츠 업데이트에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터 컨텐츠 업데이트 성공", {
      description: "데이터 컨텐츠 업데이트에 성공하였습니다",
      duration: 3000,
    });

    // 자료 새로 후출
    fetchGetTodoId();
  };

  useEffect(() => {
    fetchGetTodoId();
  }, []);

  return (
    <div className={styles.container}>
      {/* 상단 */}
      <header className={styles.container_header}>
        <div className={styles.container_header_contents}>
          <input
            type="text"
            placeholder="Enter Title Here"
            className={styles.input}
          />
          {/* 진행율 */}
          <div className={styles.progressBar}>
            <span className={styles.progressBar_status}>1/10 completed!</span>
            {/* Progress 컴포넌트 배치 */}
            <Progress
              value={33}
              className="w-[30%] h-2"
              indicateColor="bg-orange-500"
            />
          </div>
          {/* 캘린더 선택 추가 */}
          <div className={styles.calendarBox}>
            <div className={styles.calendarBox_calendar}>
              <LabelCalendar
                label="From"
                required={false}
                selectedDate={startDate}
              />
              <LabelCalendar
                label="To"
                required={true}
                selectedDate={endDate}
              />
            </div>
            <Button
              variant={"outline"}
              className="w-[15%] text-white bg-orange-400 border-orange-500 hover:bg-orange-400 hover:text-white cursor-pointer"
              onClick={() => onCreateContent(initData)}
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      {/* 본문 */}
      <div className={styles.container_body}>
        {/* conents 배열의 개수 만큼 출력이 되어야 함. */}
        {contents.length == 0 ? (
          <div className={styles.container_body_infoBox}>
            <span className={styles.title}>There is no board yet. </span>
            <span className={styles.subTitle}>
              Click the button and start flashing!
            </span>
            <button
              className={styles.button}
              onClick={() => onCreateContent(initData)}
            >
              <Image
                src="/assets/images/round-button.svg"
                alt="add board"
                width={100}
                height={100}
              />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full h-full gap-4">
            {contents.map((item) => (
              <BasicBoard
                key={item.boardId}
                item={item}
                updateContent={updateContent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
