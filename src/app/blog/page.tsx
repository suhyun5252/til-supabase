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
