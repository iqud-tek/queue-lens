import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { SiteHeader } from "./sidebar/site-header";
import { AppSidebar } from "./sidebar/app-sidebar";

const ProtectedRoute: React.FC = () => {
  const user = localStorage.getItem("user");
  const location = useLocation();
  const currentEndpoint = location.pathname;
  console.log("Current Endpoint:", currentEndpoint);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            {currentEndpoint !== "/dashboard" && <AppSidebar />}
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default ProtectedRoute;
