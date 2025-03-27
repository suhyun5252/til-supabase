"use client";

import { useEffect, useState } from "react";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";

// Markdown
import MDEditor from "@uiw/react-md-editor";

// shadcn/ui
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// 컴포넌트
import LabelCalendar from "../calendar/LabelCalendar";

// contents 배열에 대한 타입 정의
interface BoardContent {
  boardId: string; // 랜덤한 아이디를 생성해줄 예정
  isCompleted: boolean;
  title: string;
  content: string;
  startDate: string | Date;
  endDate: string | Date;
}

interface BasicBoardProps {
  item: BoardContent;
  updateContent: (newData: BoardContent) => void;
}

function MarkdownDialog({ item, updateContent }: BasicBoardProps) {
  const [isCheckCompleted, setIsCheckCompleted] = useState<boolean>(
    item.isCompleted
  );
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);

  // 에디터의 제목/본문 내용
  const [title, setTitle] = useState<string | undefined>(
    item.title ? item.title : ""
  );
  const [content, setContent] = useState<string | undefined>(
    item.content ? item.content : ""
  );

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // const [isCompleted, setIsComplted] = useState<boolean>(
  //   item.isCompleted ? item.isCompleted : false
  // );

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content || !startDate || !endDate) {
      toast.error("입력항목을 확인해 주세요.", {
        description: "제목, 내용, 날짜를 입력해주세요.",
        duration: 3000,
      });
      return;
    }

    // 해당 Row 를 바로 업데이트 하는 것이 아니고,
    // contents 칼럼의 [] 을 업데이트하고.. 실제 Row 를 업데이트 해야함.
    const tempContent: BoardContent = {
      boardId: item.boardId,
      startDate: startDate,
      endDate: endDate,
      title: title,
      content: content,
      isCompleted: isCheckCompleted,
    };
    updateContent(tempContent);

    // 창닫기
    setOpen(false);
    // setTitle("");
    // setContent("");
  };

  useEffect(() => {
    setIsCheckCompleted(item.isCompleted);
  }, [item.isCompleted]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full justify-center flex font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          {/* 현재 내용이 있는 경우와 내용이 없는 경우로 구분 */}
          {item.title ? "Modify Content" : "Add Content"}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-fit min-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog_titleBox}>
              <Checkbox
                className="w-5 h-5"
                checked={isCheckCompleted}
                onCheckedChange={() => {
                  setIsCheckCompleted(!isCheckCompleted);
                }}
              />
              <input
                type="text"
                placeholder="Write a title for your board"
                className={styles.dialog_titleBox_title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            {/* 잠시 뒤 날짜 전달 */}
            <LabelCalendar
              label="From"
              required={false}
              selectedDate={startDate}
              onDateChange={setStartDate}
            />
            <LabelCalendar
              label="To"
              required={false}
              selectedDate={endDate}
              onDateChange={setEndDate}
            />
          </div>
          <Separator />
          {/* 마크다운 입력 영역 */}
          <div className={styles.dialog_markdown}>
            <MDEditor height={"100%"} value={content} onChange={setContent} />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog_buttonBox}>
            <Button
              variant={"ghost"}
              className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
