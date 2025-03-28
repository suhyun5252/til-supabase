"use client";
import { uploadFile } from "@/app/actions/blog-storage-action";
// 이미지 주소를 생성해주는 것 (업로드 후 문자열로)
import { getImageUrl } from "@/utils/storage-utils";
import { Editor } from "@tiptap/react";

interface AddPhotoProps {
  editor: Editor;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export default function AddPhoto({ editor, onImageUpload }: AddPhotoProps) {
  const handleUploadPhoto = async (files: FileList | null) => {
    if (files === null || !editor) return;

    const file = files[0];

    if (onImageUpload) {
      const imageUrl = await onImageUpload(file);
      if (imageUrl) {
        editor.commands.setImage({ src: imageUrl });
      }
    } else {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFile(formData);
      const IMG_URL = getImageUrl(result?.path ?? "");
      editor.commands.setImage({ src: IMG_URL });
    }
  };

  return (
    <button
      type="button"
      className="relative w-8 h-8 cursor-pointer opacity-70 hover:opacity-40"
    >
      <input
        type="file"
        className="absolute top-0 left-0 w-8 h-8 outline-none opacity-0 file:cursor-pointer"
        accept="image/*"
        onChange={(e) => {
          handleUploadPhoto(e.target.files);
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 -960 960 960"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
      </svg>
    </button>
  );
}
