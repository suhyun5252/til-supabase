"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { createTodos, getTodos } from "@/app/actions/test-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/providers/ReactQueryProvider";

const Page = () => {
  const [testInput, setTestInput] = useState<string>("");
  // 데이터 가져오기
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["uniq"],
    queryFn: getTodos,
    retry: 3,
    retryDelay: 3000,
  });
  // 데이터 추가하기
  const createMutation = useMutation({
    mutationFn: async () => {
      if (testInput.trim() === "") {
        alert("할일을 등록해주세요.");
        return;
      }
      await createTodos(testInput);
    },
    onSuccess: () => {
      setTestInput("");
      refetch();
    },
    onError: (error) => {
      console.log("Error : 데이터 추가 실패함.");
      console.log(error.message);
    },
    onSettled: () => {
      console.log("성공 실패 상관없이 실행됨.");
    },
  });

  // mutateAsync 비동기 실행 예제
  const mutation = useMutation({
    mutationFn: createTodos,
  });
  const handleAdd = async () => {
    try {
      const now = await mutation.mutateAsync("추가요");
      console.log("now", now);
      queryClient.refetchQueries({ queryKey: ["uniq"] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Test Todo</h1>
      <div>
        <Button
          onClick={() => {
            handleAdd();
          }}
        >
          비동기 실행
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
        />
        <Button
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
        >
          {createMutation.isPending ? "추가중 ..." : "할일 추가"}
        </Button>
      </div>
      <div>
        <button onClick={() => refetch()}>다시 호출</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
