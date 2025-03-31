"use client";

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
});

export function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      toast.success("이메일이 발송되었습니다", {
        description: "이메일을 확인하여 비밀번호를 재설정해주세요.",
      });

      router.push("/auth/login");
    } catch (error) {
      toast.error("비밀번호 재설정 실패", {
        description: "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>비밀번호 재설정</CardTitle>
        <CardDescription>
          가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "처리 중..." : "재설정 링크 받기"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-center w-full text-sm text-muted-foreground">
          <Button
            variant="link"
            className="p-0 text-primary"
            onClick={() => router.push("/auth/login")}
          >
            로그인으로 돌아가기
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
