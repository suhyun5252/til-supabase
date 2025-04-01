"use client";

import { signInWithGoogle, signInWithKakao } from "@/lib/supabase/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일을 입력해주세요.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("로그인 실패", {
        description: "이메일과 비밀번호를 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });

      // router.push("/dashboard");
      // router.refresh();
    } catch (error) {
      toast.error("로그인 실패", {
        description: "Google 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithKakao();
      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });
    } catch (error) {
      toast.error("로그인 실패", {
        description: "Kakao 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          계정에 로그인하여 서비스를 이용하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button
                    variant="link"
                    className="px-0 text-xs text-muted-foreground"
                    onClick={() => router.push("/auth/reset-password")}
                  >
                    비밀번호를 잊으셨나요?
                  </Button>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Google로 계속하기
        </Button>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleKakaoLogin}
          disabled={isLoading}
        >
          Kakao로 계속하기
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Button
            variant="link"
            className="p-0 text-primary"
            onClick={() => router.push("/auth/signup")}
          >
            회원가입
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
