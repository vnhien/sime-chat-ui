"use client";

import { AUTH_TOKEN_KEY } from "@/utils";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function LoginRequired({ children }: PropsWithChildren) {
  const router = useRouter();
  useEffect(() => {
    const jwt = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!jwt) {
      router.push("login");
    }
  }, [router]);

  return <div>{children}</div>;
}
