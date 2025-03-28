# Tiptap

- https://tiptap.dev/docs/editor/getting-started/configure
- https://tiptap.dev/docs/editor/extensions/nodes
- https://seungyong20.tistory.com/entry/Nextjs-Tiptap-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B3%BC-%EC%BB%A4%EC%8A%A4%ED%85%80%EB%A7%88%EC%9D%B4%EC%A7%95-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
- https://velog.io/@bae-sh/React-quill%EC%97%90%EC%84%9C-tiptap-%EC%9C%BC%EB%A1%9C

## 폴더구조

- `/src/app/blog 폴더 생성`
- `/src/app/blog/page.tsx 파일 생성`

```tsx
import React from "react";

function page() {
  return <div></div>;
}

export default page;
```

## 페이지 이동 버튼

- SideNavigation.tsx : 버튼 배치

```tsx
{
  /* page 추가 버튼 */
}
<div className={styles.container_buttonBox}>
  <Button
    variant={"outline"}
    className="flex-1 text-orange-500 border-orange-400 cursor-pointer hover:bg-orange-50 hover:text-orange-500"
    onClick={onCreate}
  >
    Add New Page
  </Button>
  <Button
    variant={"outline"}
    className="flex-1 text-orange-500 border-orange-400 cursor-pointer hover:bg-orange-50 hover:text-orange-500"
    onClick={() => router.push("/blog")}
  >
    Blog
  </Button>
</div>;
```

- SideNavigation.module.scss : 버튼 스타일 정의

```scss
//   페이지 추가 버튼
&_buttonBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin: 12px 0;
}
```

## 페이지 레이아웃

- /src/app/blog/page.tsx

```tsx
import React from "react";

function page() {
  return (
    <div className="w-[920px] h-[100vh] bg-[#f9f9f9] border-r border-[#d6d6d6] flex justify-center">
      page
    </div>
  );
}

export default page;
```

## Tiptap 컴퍼넌트 만들기

- `/src/components/editor 폴더` 만들기
- `/src/components/editor/create-editor.tsx 파일` 만들기

```tsx
import React from "react";

export const CreateEditor = () => {
  return <div className="w-full flex flex-col">create-editor</div>;
};
```

- /src/app/blog/page.tsx

```tsx
import { CreateEditor } from "@/components/editor/create-editor";
import React from "react";

function page() {
  return (
    <div className="w-[920px] h-[100vh] bg-[#f9f9f9] border-r border-[#d6d6d6] flex justify-center">
      <CreateEditor />
    </div>
  );
}

export default page;
```

## 설치하기

```bash
npm install @tiptap/core @tiptap/react @tiptap/starter-kit --legacy-peer-deps

npm i @tiptap/extension-link --legacy-peer-deps

npm i tiptap-markdown --legacy-peer-deps

npm i @tiptap/extension-highlight --legacy-peer-deps

npm i @tiptap/extension-image --legacy-peer-deps

npm i @tiptap/extension-code-block-lowlight --legacy-peer-deps

npm i @tiptap/extension-heading --legacy-peer-deps

npm i @tiptap/extension-color --legacy-peer-deps

npm i @tiptap/extension-text-align --legacy-peer-deps

npm i @tiptap/extension-text-style --legacy-peer-deps

npm install lowlight --legacy-peer-deps
```

## 툴바용 아이콘 이미지 /public 폴더 저장

- https://fonts.google.com/icons

## 출력하기

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const CreateEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 툴바 제작하기

- `/src/components/editor/toolbar.tsx 파일` 만들기

```tsx
import React from "react";

const toolbar = () => {
  return <div></div>;
};

export default toolbar;
```

## 툴바 배치하기

- CreateEditor.tsx

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

export const CreateEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 툴바 작성하기

```tsx
import { Editor } from "@tiptap/core";
import React from "react";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return <div></div>;
};

export default Toolbar;
```

## 아이콘 셋트 만들기

- `/src/components/editor/icon.module.css` 파일 생성

```css
.itemBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
}

.toolbarBtn {
  width: 30px;
  height: 30px;
  background-size: 26px;
  background-repeat: no-repeat;
  background-position: center;
}

.toolbarBtn:not(:last-child) {
  margin-right: 10px;
}

.none {
  background-color: #ffffff !important;
}

.active {
  background-color: #e7e7e7 !important;
}

.line {
  width: 1px;
  height: 25px;
  margin: 0 15px;
  background-color: #cacad6;
}

.h1 {
  background-image: url("/editor_h1.svg");
}

.h2 {
  background-image: url("/editor_h2.svg");
}

.h3 {
  background-image: url("/editor_h3.svg");
}

.h4 {
  background-image: url("/editor_h4.svg");
}
.h5 {
  background-image: url("/editor_h5.svg");
}

.h6 {
  background-image: url("/editor_h6.svg");
}

.bold {
  background-image: url("/editor_bold.svg");
}

.italic {
  background-image: url("/editor_italic.svg");
}

.underline {
  background-image: url("/editor_underline.svg");
}

.strike {
  background-image: url("/editor_strike.svg");
}

.bulleted {
  background-size: 24px !important;
  background-image: url("/editor_list_bulleted.svg");
}

.numbered {
  background-size: 24px !important;
  background-image: url("/editor_list_numbered.svg");
}

.link {
  background-image: url("/editor_link.svg");
}

.image {
  background-image: url("/editor_image.svg");
}

.newline {
  background-image: url("/editor_line.svg");
}

.code {
  background-image: url("/editor_code.svg");
}

.quote {
  background-image: url("/editor_quote.svg");
}

.center {
  background-image: url("/editor_center.svg");
}
.left {
  background-image: url("/editor_left.svg");
}
.right {
  background-image: url("/editor_right.svg");
}
.justify {
  background-image: url("/editor_justify.svg");
}

.textColor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 7h6l2 10H7L9 7Z'/%3E%3Cpath d='M3 17h18'/%3E%3C/svg%3E");
}

.backgroundColor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19H5L3 17V7l2-2h7'/%3E%3Cpath d='M12 19h7l2-2V7l-2-2h-7'/%3E%3Cpath d='M8 12h8'/%3E%3Cpath d='M12 8v8'/%3E%3C/svg%3E");
}

.editor img {
  display: inline !important;
}
```

- `/src/components/editor/icon.tsx 파일` 생성

```tsx
"use client";

import styles from "./icon.module.css";

// H1 아이콘 및 기능
function H1() {
  return <button></button>;
}
// H2 아이콘 및 기능
function H2() {
  return <button></button>;
}
// H3 아이콘 및 기능
function H3() {
  return <button></button>;
}
// H4 아이콘 및 기능
function H4() {
  return <button></button>;
}
// H5 아이콘 및 기능
function H5() {
  return <button></button>;
}
// H6 아이콘 및 기능
function H6() {
  return <button></button>;
}

// Bold 아이콘 및 기능
function Bold() {
  return <button></button>;
}
// Italic 아이콘 및 기능
function Italic() {
  return <button></button>;
}
// Strikethrough 아이콘 및 기능
function Strikethrough() {
  return <button></button>;
}

// icon 객체로 모아서 export

export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
"use client";

import { Editor } from "@tiptap/core";
import styles from "./icon.module.css";

// H1 아이콘 및 기능
function H1({ editor }: { editor: Editor }) {
  return <button></button>;
}
// H2 아이콘 및 기능
function H2({ editor }: { editor: Editor }) {
  return <button></button>;
}
// H3 아이콘 및 기능
function H3({ editor }: { editor: Editor }) {
  return <button></button>;
}
// H4 아이콘 및 기능
function H4({ editor }: { editor: Editor }) {
  return <button></button>;
}
// H5 아이콘 및 기능
function H5({ editor }: { editor: Editor }) {
  return <button></button>;
}
// H6 아이콘 및 기능
function H6({ editor }: { editor: Editor }) {
  return <button></button>;
}

// Bold 아이콘 및 기능
function Bold({ editor }: { editor: Editor }) {
  return <button></button>;
}
// Italic 아이콘 및 기능
function Italic({ editor }: { editor: Editor }) {
  return <button></button>;
}
// Strikethrough 아이콘 및 기능
function Strikethrough({ editor }: { editor: Editor }) {
  return <button></button>;
}

// icon 객체로 모아서 export

export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
"use client";

import { Editor } from "@tiptap/core";
import styles from "./icon.module.css";

// H1 아이콘 및 기능
function H1({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// H2 아이콘 및 기능
function H2({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// H3 아이콘 및 기능
function H3({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// H4 아이콘 및 기능
function H4({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// H5 아이콘 및 기능
function H5({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// H6 아이콘 및 기능
function H6({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}

// Bold 아이콘 및 기능
function Bold({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// Italic 아이콘 및 기능
function Italic({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}
// Strikethrough 아이콘 및 기능
function Strikethrough({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return <button></button>;
}

// icon 객체로 모아서 export

export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
"use client";

import { Editor } from "@tiptap/core";
import styles from "./icon.module.css";

// H1 아이콘 및 기능
function H1({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 1 });
  return <button></button>;
}
// H2 아이콘 및 기능
function H2({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 2 });
  return <button></button>;
}
// H3 아이콘 및 기능
function H3({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 3 });
  return <button></button>;
}
// H4 아이콘 및 기능
function H4({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 4 });
  return <button></button>;
}
// H5 아이콘 및 기능
function H5({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 5 });
  return <button></button>;
}
// H6 아이콘 및 기능
function H6({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("heading", { level: 6 });
  return <button></button>;
}

// Bold 아이콘 및 기능
function Bold({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("bold");
  return <button></button>;
}
// Italic 아이콘 및 기능
function Italic({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("italic");
  return <button></button>;
}
// Strikethrough 아이콘 및 기능
function Strikethrough({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("strikethrough");
  return <button></button>;
}

// icon 객체로 모아서 export

export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
"use client";

import { Editor } from "@tiptap/core";
import styles from "./icon.module.css";

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
  return <button></button>;
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
  return <button></button>;
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
  return <button></button>;
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
  return <button></button>;
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
  return <button></button>;
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
  return <button></button>;
}

// Bold 아이콘 및 기능
function Bold({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("bold");
  const canToggle = editor.can().chain().focus().toggleBold().run();
  return <button></button>;
}
// Italic 아이콘 및 기능
function Italic({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("italic");
  const canToggle = editor.can().chain().focus().toggleItalic().run();
  return <button></button>;
}
// Strikethrough 아이콘 및 기능
function Strikethrough({ editor }: { editor: Editor }) {
  if (!editor) return null;
  const isActive = editor.isActive("strikethrough");
  const canToggle = editor.can().chain().focus().toggleStrikethrough().run();
  return <button></button>;
}

// icon 객체로 모아서 export

export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
  return <button onClick={handleClick} disabled={!canToggle}></button>;
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
    ></button>
  );
}
// Icon 객체로 모아서 export
export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

```tsx
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
// Icon 객체로 모아서 export
export const Icon = { H1, H2, H3, H4, H5, H6, Bold, Italic, Strikethrough };
```

## 툴바에 아이콘 배치하기

- Toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <div>
      {/* 첫번째 줄 */}
      <div>
        <div>
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div>
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 글자 정렬 아이콘 배치 및 기능 적용하기

- Icon.tsx

```tsx
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
};
```

## 툴바에 정렬 아이콘 배치

- Toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 정렬 기능 플러그인 연결

- create-editor.tsx

```tsx
// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";

const editor = useEditor({
  extensions: [StarterKit, TextAlign],
  content: "<p>안녕하세요.</p>",
});
```

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "./toolbar";

export const CreateEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right"],
      }),
    ],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 글자 색상 추가

- icon.tsx 추가

```tsx
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
};
```

## 툴바에 글자 색상 아이콘 배치

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 에디터에 글자색 넣는 설정

- create-editor.tsx

```tsx
import TextStyle from "@tiptap/extension-text-style";
// color
import { Color } from "@tiptap/extension-color";

const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph", "blockquote"],
      alignments: ["left", "center", "right"],
    }),
    Color,
    TextStyle,
  ],
  content: "<p>안녕하세요.</p>",
});
```

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
// color
import { Color } from "@tiptap/extension-color";
import Toolbar from "./toolbar";

export const CreateEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right"],
      }),
      Color,
      TextStyle,
    ],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 하이라이트 아이콘 배치

- icon.tsx

```tsx
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
};
```

## 툴바에 배치

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
          <Icon.BackgroundColor editor={editor} />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 에디터에 배치

- create-editor.tsx

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
// extension : color
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
// extension : code block, background
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";

import Toolbar from "./toolbar";

export const CreateEditor = () => {
  // 배경색
  const lowlight = createLowlight(common);
  const CustomHighlight = Highlight.configure({
    multicolor: true,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right"],
      }),
      Color,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: lowlight,
      }),
      CustomHighlight,
    ],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 인용문 아이콘 배치

- icon.tsx

```tsx
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
};
```

## 툴바에 배치

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
          <Icon.BackgroundColor editor={editor} />
        </div>
        <div className="flex items-center gap-2">
          <Icon.Quote editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

# 코드 아이콘

- icon.tsx

```tsx
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
};
```

## 툴바에 배치

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
          <Icon.BackgroundColor editor={editor} />
        </div>
        <div className="flex items-center gap-2">
          <Icon.Quote editor={editor} />
          <Icon.Code editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 링크 아이콘 배치

- icon.tsx

```tsx
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
};
```

## 툴바 배치

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
          <Icon.BackgroundColor editor={editor} />
        </div>
        <div className="flex items-center gap-2">
          <Icon.Quote editor={editor} />
          <Icon.Code editor={editor} />
          <Icon.Link editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 에디터에 익스텐션 설정

- create-editor.tsx

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
// extension : color
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
// extension : code block, background
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
// Link
import Link from "@tiptap/extension-link";
import Toolbar from "./toolbar";

export const CreateEditor = () => {
  // 배경색
  const lowlight = createLowlight(common);
  const CustomHighlight = Highlight.configure({
    multicolor: true,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right"],
      }),
      Color,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: lowlight,
      }),
      CustomHighlight,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "cursor-pointer text-blue-500 hover:underline",
        },
      }),
    ],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

## 이미지 아이콘 배치하기

- icon.tsx

```tsx
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
  AddPhoto,
};
```

## 툴바에 배치하기

- toolbar.tsx

```tsx
import { Editor } from "@tiptap/core";
import React from "react";
import { Icon } from "@/components/editor/icon";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border-b-2">
      {/* 첫번째줄 */}
      <div className="flex gap-2 p-2 border-b">
        <div className="flex items-center gap-2">
          <Icon.H1 editor={editor} />
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Strikethrough editor={editor} />
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="flex justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Icon.Left editor={editor} />
          <Icon.Center editor={editor} />
          <Icon.Right editor={editor} />
          <Icon.TextColor editor={editor} />
          <Icon.BackgroundColor editor={editor} />
        </div>
        <div className="flex items-center gap-2">
          <Icon.Quote editor={editor} />
          <Icon.Code editor={editor} />
          <Icon.Link editor={editor} />
          <Icon.AddPhoto editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
```

## 에디터에 익스텐션 설정

- create-editor.tsx

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
// extension : color
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
// extension : code block, background
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
// Link
import Link from "@tiptap/extension-link";
// Image
import Image from "@tiptap/extension-image";
import Toolbar from "./toolbar";

export const CreateEditor = () => {
  // 배경색
  const lowlight = createLowlight(common);
  const CustomHighlight = Highlight.configure({
    multicolor: true,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right"],
      }),
      Color,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: lowlight,
      }),
      CustomHighlight,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "cursor-pointer text-blue-500 hover:underline",
        },
      }),
      Image,
    ],
    content: "<p>안녕하세요.</p>",
  });
  return (
    <div className="w-full flex flex-col">
      <h3>블로그 작성하기</h3>
      <div>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
```

# tailwind 영향에서 배제하기

-globals.css

```css
.ProseMirror {
  /* 기본 스타일 */
  > * + * {
    margin-top: 0.75em;
  }

  /* 헤딩 스타일 */
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  h3 {
    font-size: 1.17em;
    font-weight: bold;
  }
  h4 {
    font-size: 1em;
    font-weight: bold;
  }
  h5 {
    font-size: 0.83em;
    font-weight: bold;
  }
  h6 {
    font-size: 0.67em;
    font-weight: bold;
  }

  /* 리스트 스타일 */
  ul,
  ol {
    padding: 0 1rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  /* 코드 블록 스타일 */
  pre {
    background: #0d0d0d;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }

  code {
    background: #00000010;
    color: #616161;
    padding: 0.25rem;
    border-radius: 0.25rem;
  }

  /* 인용구 스타일 */
  blockquote {
    border-left: 2px solid #0070f3;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
  }
}
```
