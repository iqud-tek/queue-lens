import React from "react";
import Navbar from "../components/general/Navbar";
import { Outlet } from "react-router-dom";
// import Footer from "../components/general/Footer";
// import DashboardNavbar from "@/components/general/DashboardNavbar";
import { useSelector } from "react-redux";
import { selectAllLoginStates } from "@/store/slices/loginSlice";
import { Toaster } from "react-hot-toast";
const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector(selectAllLoginStates);

  return (
    <>
      <Toaster />
      {isAuthenticated ? null : <Navbar />}
      <div className="">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
