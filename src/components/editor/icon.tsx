"use client";
import styles from "@/components/editor/icon.module.css";
import { Editor } from "@tiptap/core";

// H1 아이콘 및 기능
function H1({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 1 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 1 })
    .run();

  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h1} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// H2 아이콘 및 기능
function H2({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 2 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 2 })
    .run();
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h2} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// H3 아이콘 및 기능
function H3({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 3 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 3 })
    .run();
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h3} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// H4 아이콘 및 기능
function H4({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 4 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 4 })
    .run();
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 4 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h4} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// H5 아이콘 및 기능
function H5({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 5 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 5 })
    .run();

  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 5 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h5} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// H6 아이콘 및 기능
function H6({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 6 });
  const canToggle = editor
    .can()
    .chain()
    .focus()
    .toggleHeading({ level: 6 })
    .run();

  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleHeading({ level: 6 }).run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!canToggle}
      className={`${styles.toolbarBtn} ${styles.h6} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// Bold 아이콘 및 기능
function Bold({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("bold");
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleBold().run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={`${styles.toolbarBtn} ${styles.bold} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// Italic 아이콘 및 기능
function Italic({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("italic");
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleItalic().run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className={`${styles.toolbarBtn} ${styles.italic} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
// Strikethrough 아이콘
function Strikethrough({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("strike");
  // 클릭시 실행
  const handleClick = () => {
    editor.chain().focus().toggleStrike().run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      className={`${styles.toolbarBtn} ${styles.strike} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}

// 내용 정렬 아이콘
function Left({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("textAlign", { align: "left" });
  const handleClick = () => {
    editor.chain().focus().setTextAlign("left").run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().setTextAlign("left").run()}
      className={`${styles.toolbarBtn} ${styles.left} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
function Center({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("textAlign", { align: "center" });
  //   비활성화 되는 이유는 현재 editor 에 정렬 플러그인이 셋팅 안되어서
  const handleClick = () => {
    editor.chain().focus().setTextAlign("center").run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().setTextAlign("center").run()}
      className={`${styles.toolbarBtn} ${styles.center} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}
function Right({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("textAlign", { align: "right" });
  const handleClick = () => {
    editor.chain().focus().setTextAlign("right").run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().setTextAlign("right").run()}
      className={`${styles.toolbarBtn} ${styles.right} ${isActive ? styles.active : styles.none}`}
    ></button>
  );
}

/** TextColor 아이콘 */
function TextColor({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const colors = [
    "#000000", // 검정
    "#FF0000", // 빨강
    "#00FF00", // 초록
    "#0000FF", // 파랑
    "#FF00FF", // 마젠타
    "#00FFFF", // 시안
    "#FFFF00", // 노랑
    "#808080", // 회색
  ];

  return (
    <div className="relative group">
      <button
        className={`${styles.toolbarBtn} ${styles.textColor}`}
        title="글자 색상"
      />
      <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white border rounded-lg shadow-lg top-full left-0 z-50">
        {colors.map((color) => (
          <button
            key={color}
            className="w-6 h-6 m-1 border rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => editor.chain().focus().setColor(color).run()}
          />
        ))}
        <button
          className="w-6 h-6 m-1 border rounded-full flex items-center justify-center text-xs"
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="색상 제거"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** BackgroundColor 아이콘 */
function BackgroundColor({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const colors = [
    "#FFEB3B", // 노랑
    "#FFA726", // 주황
    "#EF5350", // 빨강
    "#AB47BC", // 보라
    "#7E57C2", // 남보라
    "#42A5F5", // 파랑
    "#26A69A", // 청록
    "#66BB6A", // 초록
    "#FFFFFF", // 흰색
    "#E0E0E0", // 밝은 회색
  ];

  return (
    <div className="relative group">
      <button
        className={`${styles.toolbarBtn} ${styles.backgroundColor}`}
        title="배경 색상"
      />
      <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white border rounded-lg shadow-lg top-full left-0 z-50">
        {colors.map((color) => (
          <button
            key={color}
            className="w-6 h-6 m-1 border rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => editor.chain().focus().setHighlight({ color }).run()}
          />
        ))}
        <button
          className="w-6 h-6 m-1 border rounded-full flex items-center justify-center text-xs"
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          title="배경색 제거"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** Quote 아이콘 */
function Quote({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const isActive = editor.isActive("blockquote");
  const handleClick = () => {
    editor.chain().focus().toggleBlockquote().run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      className={`${styles.toolbarBtn} ${styles.quote} ${
        isActive ? styles.active : styles.none
      }`}
    />
  );
}

/** Code 아이콘 */
function Code({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const isActive = editor.isActive("code");
  const handleClick = () => {
    editor.chain().focus().toggleCode().run();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      className={`${styles.toolbarBtn} ${styles.code} ${
        isActive ? styles.active : styles.none
      }`}
    />
  );
}

/** Link 아이콘 */
function Link({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const isActive = editor.isActive("link");

  const handleClick = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL을 입력하세요:", previousUrl);

    // 취소를 누르면 null이 반환됩니다
    if (url === null) {
      return;
    }

    // 빈 문자열이면 링크를 제거합니다
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // 유효한 URL인지 확인
    try {
      new URL(url);
    } catch (e) {
      alert("유효한 URL을 입력해주세요.");
      return;
    }

    // 링크 설정
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.toolbarBtn} ${styles.link} ${
        isActive ? styles.active : styles.none
      }`}
    />
  );
}

/** AddPhoto 아이콘 */
function AddPhoto({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const handleClick = () => {
    // 여기에서 실제 이미지 업로드 로직 or URL 입력 등 처리 가능
    // 임시로 샘플 이미지 삽입
    editor.chain().focus().setImage({ src: "https://i.pravatar.cc" }).run();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.toolbarBtn} ${styles.image}`}
    />
  );
}

// Icon 객체로 모아서 export
export const Icon = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Bold,
  Italic,
  Strikethrough,
  Left,
  Center,
  Right,
  TextColor,
  BackgroundColor,
  Quote,
  Code,
  Link,
  // AddPhoto,
};
