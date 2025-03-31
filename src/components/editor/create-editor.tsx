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
import { createBlog } from "@/app/actions/blog-actions";
import { useState } from "react";
import { toast } from "sonner";
import { deleteFile } from "@/app/actions/blog-storage-action";
import { useRouter } from "next/navigation";

export const CreateEditor = () => {
  const router = useRouter();
  //  내용
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
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
    content: content, // 초기값
    //  내용 갱신시 실행
    onUpdate({ editor }) {
      // 내용 읽기
      setContent(editor.getHTML());
    },
    // 에디터의 내용 분석하기
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          const { from, to } = view.state.selection;
          // Case 1: 단일 이미지 노드가 선택된 경우
          const currentNode = view.state.doc.nodeAt(from);
          if (currentNode?.type.name === "image") {
            const imageUrl = currentNode.attrs.src;
            // Supabase에 저장된 이미지인 경우에만 처리
            if (imageUrl.includes("supabase")) {
              console.log("Single image delete:", imageUrl);
              deleteImageFromSupabase(imageUrl); // 실제 삭제 함수 호출 (현재는 주석 처리됨)
            }
            return false; // 기본 삭제 동작 방지
          }

          // Case 2: Backspace로 이미지 삭제하는 경우
          // 커서가 이미지 바로 뒤에 있을 때 (from과 to가 같음 = 선택된 영역이 없음)
          if (event.key === "Backspace" && from === to) {
            const nodeBefore = view.state.doc.nodeAt(from - 1);
            if (nodeBefore?.type.name === "image") {
              const imageUrl = nodeBefore.attrs.src;
              if (imageUrl.includes("supabase")) {
                console.log("Backspace image delete:", imageUrl);
                deleteImageFromSupabase(imageUrl);
              }
            }
          }

          // Case 3: 여러 노드가 선택된 경우 (드래그로 여러 요소 선택)
          if (from !== to) {
            let pos = from;
            // 선택된 영역 내의 모든 노드를 순회
            while (pos < to) {
              const node = view.state.doc.nodeAt(pos);
              // 이미지 노드를 발견하면 처리
              if (node?.type.name === "image") {
                const imageUrl = node.attrs.src;
                if (imageUrl.includes("supabase")) {
                  console.log("Selected image delete:", imageUrl);
                  deleteImageFromSupabase(imageUrl);
                }
              }
              // 다음 노드로 이동 (노드의 크기만큼 position 증가)
              pos += node ? node.nodeSize : 1;
            }
          }
        }
        // Backspace 키를 눌렀을 때 빈 blockquote 처리
        if (event.key === "Backspace") {
          const { selection } = view.state;
          const { empty, $anchor } = selection;
          const isBlockquote = $anchor.parent.type.name === "blockquote";

          if (empty && isBlockquote && $anchor.parent.content.size === 0) {
            editor?.commands.clearNodes();
            return true;
          }
        }
        return false;
      },
    },
  });

  // Supabase 에서 이미지 삭제하는 함수
  const deleteImageFromSupabase = async (imageUrl: string) => {
    console.log("deleteImageFromSupabase", imageUrl);
    try {
      // URL에서 파일명만 추출
      const fileNameMatch = imageUrl.match(/([^\/]+)$/);
      if (fileNameMatch) {
        const fileName = fileNameMatch[1]; // "slide-3.png"
        console.log("Deleting image from Supabase:", fileName);
        await deleteFile(fileName); // await로 삭제 완료 대기
      }
    } catch (error) {
      console.error("Error deleting image from Supabase:", error);
    }
  };

  const onSubmit = async () => {
    const { data, error, status } = await createBlog({
      content: content,
      title: title,
    });
    if (!title || !content) {
      toast.error("입력항목을 확인해 주세요.", {
        description: "제목,내용을 입력해주세요.",
        duration: 3000,
      });
      return;
    }
    if (error) {
      toast.error("실패", {
        description: `블로그 작성에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    toast.success("성공", {
      description: `블로그 작성에 성공하였습니다.`,
      duration: 3000,
    });
    setTitle("");
    setContent("");
    router.push("/blog");
    console.log(data, error, status);
  };
  return (
    <div className="w-[95%] flex flex-col bg-white my-3 p-3">
      <h3>블로그 작성하기</h3>
      <div className="w-full flex-col items-center justify-center">
        <div className="w-full my-2">
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.editor}>
          {editor && <Toolbar editor={editor} />}
          <EditorContent
            editor={editor}
            onClick={() => editor?.commands.focus()}
          />
        </div>
        <div className="flex w-full item-center justify-center p-2">
          <Button
            type="button"
            className="px-4 py-2 cursor-pointer"
            onClick={onSubmit}
          >
            Add Blog
          </Button>
        </div>
      </div>
    </div>
  );
};
