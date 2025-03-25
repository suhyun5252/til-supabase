import styles from "@/components/common/board/BasicBoard.module.scss";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp } from "lucide-react";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import MarkdownDialog from "@/components/common/dialog/MarkdownDialog";

function BasicBoard() {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          <Checkbox className="w-5 h-5" />
          <span className={styles.title}>
            Please enter a title for your board
          </span>
          <Button variant={"ghost"}>
            <ChevronUp calcMode="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* 본문 */}
      <div className={styles.container_body}>
        <div className={styles.container_body_calendarBox}>
          <LabelCalendar label="From" required={false} />
          <LabelCalendar label="To" required={true} />
        </div>
        <div className={styles.container_body_buttonBox}>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-green-500 hover:text-white"
          >
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        </div>
      </div>
      {/* 하단 */}
      <div className={styles.container_footer}></div>
      <MarkdownDialog />
    </div>
  );
}

export default BasicBoard;
