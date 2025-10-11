"use client";
import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Coffee, EllipsisVertical, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AppSidebar() {
  const isMobile = useSidebar().isMobile;
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="font-semibold">
                <div className="flex items-center justify-center gap-2 rounded-full bg-indigo-500 p-2 text-slate-100">
                  <Coffee className="size-5" />
                </div>
                <span className="text-lg">Marifah Cafe</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="cursor-pointer">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">A</AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <h4 className="truncate font-medium">John Doe</h4>
                    <p className="text-muted-foreground truncate text-xs">
                      Admin
                    </p>
                  </div>
                  <EllipsisVertical className="ml-auto size-5" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">John Doe</h4>
                      <p className="text-muted-foreground truncate text-xs">
                        Admin
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="text-red-400">
                    <LogOut className="mr-2 size-4 text-red-400" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
