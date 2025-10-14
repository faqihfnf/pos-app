"use client";

import DataTable from "@/components/common/data-table";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HEADER_TABLE_USER } from "@/constants/user-constant";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import React, { useMemo } from "react";
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

  const filteredData = useMemo(() => {
    return (users || []).map((user, index) => {
      return [
        index + 1,
        user.id,
        user.name,
        user.role,
        <DropdownAction
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil />
                  <span>Edit</span>
                </span>
              ),
              action: () => {
                toast.success("Edit user");
              },
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  <Trash2 />
                  <span>Delete</span>
                </span>
              ),
              variant: "destructive",
              action: () => {
                toast.success("Delete user");
              },
            },
          ]}
        />,
      ];
    });
  }, [users]);

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
      <DataTable
        header={HEADER_TABLE_USER}
        isLoading={isLoading}
        data={filteredData}
      />
    </div>
  );
}
