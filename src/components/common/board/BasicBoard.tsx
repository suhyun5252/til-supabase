// shadcn
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
// css
import styles from "@/components/common/board/BasicBoard.module.scss";
import LabelCalendar from "../calendar/LabelCalendar";
import MarkdownDialog from "../dialog/MarkdownDialog";

function BasicBoard() {
  return (
    <div className={styles.container}>
      {/* 헤더 영역 */}
      <div className={styles.container_header}>
        <div className={styles.container_header_titleBox}>
          {/* Checkbox 컴포넌트 */}
          <Checkbox className="w-5 h-5" />
          <span className={styles.title}>
            Please enter a title for your board
          </span>
        </div>
        <Button variant="ghost">
          {/* 아이콘 */}
          <ChevronUp className="w-5 h-5" />
        </Button>
      </div>
      {/* 바디 영역 */}
      <div className={styles.container_body}>
        <div className={styles.container_body_calendarBox}>
          <LabelCalendar label="From" />
          <LabelCalendar label="To" />
        </div>
        <div className={styles.container_body_buttonBox}>
          <Button
            variant="ghost"
            className="font-normal text-gray-400 hover:bg-green-500 hover:text-white"
          >
            Duplicate
          </Button>
          <Button
            variant="ghost"
            className="font-normal text-gray-400 hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        </div>
      </div>
      {/* 하단 영역 */}
      <div className={styles.container_footer}>
        <MarkdownDialog />
      </div>
    </div>
  );
}

export default BasicBoard;
