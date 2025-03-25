"use client";
import MDEditor from "@uiw/react-md-editor";
import LabelCalendar from "../calendar/LabelCalendar";
// shadcn/ui
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// css
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";
import { useState } from "react";
import { createTodo } from "@/app/actions/todo-actions";

function MarkdownDialog() {
  const [open, setOpen] = useState<boolean>(false);
  // 추가
  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string | undefined>("");

  // supabase 추가 버튼
  const onSubmit = async () => {
    if (!title || !content) {
      toast.error("입력항목을 확인해주세요.", {
        description: "제목과 내용을 입력해주세요.",
        duration: 3000, // 3초 후 자동 사라짐 (옵션)
      });
      return;
    }

    // supabase 추가
    const data = await createTodo({ title, contents });
    console.log(data);
    if (data.error) {
      toast.error("Error", {
        description: "Supabase에 글이 등록되지 않았습니다.",
        duration: 3000, // 3초 후 자동 사라짐 (옵션)
      });
      return;
    }
    toast.success("Success", {
      description: "Supabase에 글이 등록되었습니다.",
      duration: 3000, // 3초 후 자동 사라짐 (옵션)
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Content
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-fit min-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog_titleBox}>
              <Checkbox className="w-5 h-5" />
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
            <LabelCalendar label="From" />
            <LabelCalendar label="To" />
          </div>
          <Separator />
          {/* 마크다운 입력 영역 */}
          <div className={styles.dialog_markdown}>
            <MDEditor
              height={100 + "%"}
              value={content}
              onChange={setContent}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog_buttonBox}>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
              onClick={onSubmit}
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
