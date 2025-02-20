import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/loginSlice";
import { Menu, X } from "lucide-react"; // Optional: For the hamburger menu
import { dashboardNavLinks } from "@/constants";

const DashboardNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-card px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-lg font-semibold text-foreground">
          <Link to="/dashboard">YourLogo</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden space-x-6 lg:flex">
          {dashboardNavLinks.map((link, i) => (
            <Link
              to={link.link}
              className="text-muted-foreground hover:text-foreground"
              key={i}
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Profile & Logout Button */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Link
            to="/profile"
            className="text-muted-foreground hover:text-foreground"
          >
            Profile
          </Link>

          <Button
            variant="outline"
            className="text-muted-foreground hover:bg-muted/90"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="space-y-4 bg-card py-4 lg:hidden">
          {dashboardNavLinks.map((link, i) => (
            <Link
              to={link.link}
              key={i}
              className="block text-muted-foreground hover:text-foreground"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <Link
              to="/profile"
              className="block text-muted-foreground hover:text-foreground"
            >
              Profile
            </Link>
            <Button
              variant="outline"
              className="mt-2 w-full text-muted-foreground hover:bg-muted/90"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
