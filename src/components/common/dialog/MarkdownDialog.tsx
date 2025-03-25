"use client";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
// Markdown
import MDEditor from "@uiw/react-md-editor";
// shadcn
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LabelCalendar from "../calendar/LabelCalendar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function MarkdownDialog() {
  const [content, setContent] = useState<string | undefined>("");
  return (
    <Dialog>
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
                className={styles.dialog_titlebox_title}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            <LabelCalendar label="From" required={false} />
            <LabelCalendar label="To" required={false} />
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
              className="font-normal border-orange-400 hover:bg-orange-500 hover:text-white"
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
