# tiptap 내용을 supabase에 저장하기

## UI 추가

- `/src/components/editor/editor.module.css 파일` 생성

```css
/* Tiptap Style  */
.ProseMirror-focused {
  border: none !important;
  outline: none !important;
}

.ProseMirror {
  min-height: 300px;
  padding: 15px 0px;
  padding-bottom: 1.25rem;
}

.tiptap .is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  font-size: 0.875rem;
}

.tiptap p {
  padding: 0.375rem 0;
}

.tiptap pre {
  background: #0d0d0d;
  border-radius: 0.5rem;
  color: #fff;
  font-family: inherit;
  padding: 0.75rem 1rem;
  line-height: 1.6rem;
}
.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 1rem;
  padding: 0;
}
.tiptap ul,
.tiptap ol {
  padding: 0 2rem;
}
.tiptap ol p {
  padding: 0;
}
.tiptap ul > li {
  list-style: disc;
}

.tiptap ul > li {
  list-style: circle;
}
.tiptap ol > li {
  list-style: decimal;
}

.tiptap blockquote {
  border-left: 3px solid var(--color-border);
  margin-left: 0;
  margin-right: 0;
  padding-left: 0.625rem;
}

.tiptap a {
  text-decoration: underline;
  color: #477bff;
}

.tiptap iframe {
  padding: 0.625rem 0;
}

.tiptap .tableWrapper {
  margin: 1.25rem 0;
}

.tiptap table {
  overflow: hidden;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  border: 1px solid var(--color-border);
  user-select: contain;
}

.tiptap table tr:nth-child(2n) {
  background-color: var(--color-background);
}

.tiptap table tr:nth-child(2n + 1) {
  background-color: var(--color-deep-background);
}

.tiptap table tr td {
  padding: 0.9375rem 0.375rem;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.tiptap .resize-cursor td:has(.column-resize-handle) {
  border-right: 2px solid #477bff !important;
  cursor: col-resize;
}
.main {
  padding: 5px;
}
.editor {
  padding: 20px;
  border: 1px solid #cacad6;
}

/* 추가 코드 */
.editor :global(.ProseMirror) {
  padding: 1rem;
}
.editor :global(.ProseMirror:focus) {
  outline: none; /* 포커스 시 생기는 테두리 제거 */
}

.editor h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
}

.editor h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
}

.editor h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
}

.editor h4 {
  font-size: 1em;
  font-weight: bold;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
}

.editor h5 {
  font-size: 0.83em;
  font-weight: bold;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
}

.editor h6 {
  font-size: 0.67em;
  font-weight: bold;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
}
.editor code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
  font-family: "Consolas", "Monaco", "Andale Mono", monospace;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  white-space: pre-wrap;
}
.editor blockquote {
  border-left: 4px solid #ddd;
  margin: 1.5em 0;
  padding: 0.5em 1em;
  background-color: #f9f9f9;
  font-style: italic;
}

.editor blockquote p {
  margin: 0;
}

/* 기본 이미지 스타일 */
.editor img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  display: inline-block;
}

/* 텍스트 정렬에 따른 이미지 정렬 */
.editor p[style*="text-align: center"] {
  text-align: center;
}

.editor p[style*="text-align: right"] {
  text-align: right;
}

.editor p[style*="text-align: left"] {
  text-align: left;
}

/* 이미지를 포함한 문단의 스타일 */
.editor p {
  display: block;
  width: 100%;
}
```

- create-editor.tsx 수정

```tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// css
import styles from "@/components/editor/editor.module.css";

// extension : 내용 정렬
import TextAlign from "@tiptap/extension-text-align";
// extension : color
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
// extension : code block, background
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
// extension : Link
import Link from "@tiptap/extension-link";
// extension : Image
import Image from "@tiptap/extension-image";

import Toolbar from "./toolbar";
//  shadcn/ui 버튼
import { Button } from "@/components/ui/button";

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
    <div className="w-[95%] flex flex-col bg-white my-3 p-3">
      <h3>블로그 작성하기</h3>
      <div className="w-full flex-col items-center justify-center">
        <div className="w-full my-2">
          <input className="w-full p-2 border-2 border-gray-300 rounded-md" />
        </div>
        <div className={styles.editor}>
          {editor && <Toolbar editor={editor} />}
          <EditorContent editor={editor} />
        </div>
        <div className="flex w-full item-center justify-center p-2">
          <Button type="button" className="px-4 py-2">
            Add Blog
          </Button>
        </div>
      </div>
    </div>
  );
};
```

## Supabase 테이블 생성

```bash
npm run generate-types
```

## 블로그용 액션 추가하기

- actions/blog-actions.ts 생성

```ts
"use server";

import { createServerSideClient } from "@/lib/supabase/server";
import { Database } from "@/types/types_db";

export type BlogRow = Database["public"]["Tables"]["blog"]["Row"];
export type BlogRowInsert = Database["public"]["Tables"]["blog"]["Insert"];
export type BlogRowUpdate = Database["public"]["Tables"]["blog"]["Update"];

// Create 기능
export async function createBlog(blog: BlogRowInsert) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("blog")
    .insert([
      {
        title: blog.title,
        content: blog.content,
      },
    ])
    .select()
    .single();

  return { data, error, status };
}

// Read 기능
export async function getBlogs() {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("blog")
    .select("*")
    .order("id", { ascending: false });
  return { data, error, status } as {
    data: BlogRow[] | null;
    error: Error | null;
    status: number;
  };
}

// Read 기능 id 한개
export async function getBlogId(id: number) {
  const supabase = await createServerSideClient();
  const { data, error, status } = await supabase
    .from("blog")
    .select()
    .eq("id", id)
    .single();
  return { data, error, status } as {
    data: BlogRow | null;
    error: Error | null;
    status: number;
  };
}

// Update 기능 id 한개
export async function updateBlogId(
  id: number,
  title: string,
  contents: string
) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("blog")
    .update({ title: title, contents: contents })
    .eq("id", id)
    .select()
    .single();

  return { data, error, status } as {
    data: BlogRow | null;
    error: Error | null;
    status: number;
  };
}

// row 삭제 기능
export async function deleteBlog(id: number) {
  const supabase = await createServerSideClient();
  const { error, status } = await supabase.from("blog").delete().eq("id", id);

  return { error, status } as {
    error: Error | null;
    status: number;
  };
}
```
