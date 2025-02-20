"use client";

import type * as React from "react";
import { Plus, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AddConnectionPopUp from "../protected/dashboard/AddConnectionPopUp";
import TestConnectionPopUp from "../protected/test-connection/TestConnectionPopUp";
import { useFetchSingleDashboardEntryQuery } from "@/store/apis/dashboardAPI";
import { useLocation } from "react-router-dom";
import CircularLoader from "../general/CircularLoader";
import { getErrorMessage } from "@/utils/generalFuncs";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const {
    data: connectionDetail,
    refetch,
    isLoading,
    isFetching,
    error,
  } = useFetchSingleDashboardEntryQuery(id);

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))] border-r bg-background"
      {...props}
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Connections</h2>
          <AddConnectionPopUp
            triggerComponent={
              <Button size="icon" variant="ghost">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Connection</span>
              </Button>
            }
            editForm={false}
          />
        </div>
        {/* It can be useful in future usage */}
        {/* <div className="mt-4">
          <Input placeholder="Search connections..." className="h-9 bg-muted" />
        </div> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading || isFetching ? (
                <div className="flex justify-center">
                  <CircularLoader />
                </div>
              ) : error ? (
                <div>
                  <p className="text-destructive">{getErrorMessage(error)}</p>
                </div>
              ) : (
                <SidebarMenuItem className="border-b py-2">
                  <div className="flex w-full items-center justify-between">
                    <TestConnectionPopUp
                      formData={connectionDetail}
                      refetch={refetch}
                      triggerComponent={
                        <SidebarMenuButton className="flex items-center hover:bg-transparent hover:underline">
                          <span
                            className={`mt-1 block h-2 w-2 rounded-full ${
                              connectionDetail?.status === "active"
                                ? "bg-success"
                                : "bg-destructive"
                            }`}
                          />
                          {connectionDetail.aliasName}
                        </SidebarMenuButton>
                      }
                    />
                    <div className="flex gap-1">
                      <Button variant={"ghost"} className="p-2">
                        <RefreshCw className="h-2 w-2" size={12} />
                        <span className="sr-only">Refresh</span>
                      </Button>
                      <Button variant={"ghost"} className="p-2">
                        <Trash2 className="h-2 w-2" size={12} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="p-4 text-sm text-muted-foreground">
          Trial has expired, please upgrade your subscription.
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
