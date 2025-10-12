"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function UserManagement() {
  const supabase = createClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact" })
        .order("created_at");

      if (error) {
        toast.error("Failed to fetch users", { description: error.message });
        return [];
      }
      return data;
    },
  });
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full flex-col justify-between gap-2 lg:flex-row">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-4">
          <Input placeholder="Search" className="w-full" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"primary"}>Add User</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {users?.map((user) => (
        <div key={user.id} className="">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-muted-foreground text-sm">{user.role}</p>
        </div>
      ))}
    </div>
  );
}
