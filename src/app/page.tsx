"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";

export default function Home() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Welcome back, {profile.name} </h1>
      <Link href="/admin">
        <Button variant="primary">Dashboard</Button>
      </Link>
    </div>
  );
}
