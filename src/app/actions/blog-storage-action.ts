"use server";

import { createServerSideClient } from "@/lib/supabase/server";

// 에러 타입에 대해서 파악하기
function handleError(error: unknown) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// 파일 업로드
export async function uploadFile(formData: FormData): Promise<{
  id: string;
  path: string;
  fullPath: string;
} | null> {
  try {
    const supabase = await createServerSideClient();

    // getUser()를 사용하여 인증된 사용자 정보 가져오기
    // const {
    //   data: { user },
    //   error: userError,
    // } = await supabase.auth.getUser();

    // if (userError || !user) {
    //   console.error("인증된 사용자가 아닙니다.");
    //   return null;
    // }

    const file = formData.get("file") as File;

    // 파일 이름에 사용자 ID를 포함시켜 고유성 보장
    const fileExt = file.name.split(".").pop();
    // const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const fileName = `${"tester"}_${Date.now()}.${fileExt}`;

    // upsert : insert 와 update 를 동시에 처리할 수 있는 옵션
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BLOG_BUCKET as string)
      .upload(fileName, file, { upsert: true });

    if (error) {
      handleError(error);
      return null; // 에러 발생 시 null 반환
    }

    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
}
