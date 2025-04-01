"use server";

import { Provider } from "@supabase/supabase-js";
import { createServerSideClient } from "./server";
import { redirect } from "next/navigation";

const signInWith = (provider: Provider) => async () => {
  const supabase = await createServerSideClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

// 구글
const signInWithGoogle = signInWith("google");
// 카카오
const signInWithKakao = signInWith("kakao");

// 로그아웃
const signOut = async () => {
  const supabase = await createServerSideClient();
  await supabase.auth.signOut();
};

export { signInWithGoogle, signOut, signInWithKakao };
