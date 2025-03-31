import { LoginForm } from "@/components/auth/loginform";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[100vh]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
