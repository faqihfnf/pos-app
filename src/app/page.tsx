import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-3">
      <h1 className="text-2xl font-bold">Welcome User</h1>
      <Link href="/admin">
        <Button variant="primary">Dashboard</Button>
      </Link>
    </div>
  );
}
