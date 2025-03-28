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
