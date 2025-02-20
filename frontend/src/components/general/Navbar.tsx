import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { navLinks } from "@/constants";
// import { useSelector } from "react-redux";
// import { selectAllLoginStates } from "@/store/slices/loginSlice";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const { isAuthenticated } = useSelector(selectAllLoginStates);
  // const localUser = localStorage.getItem("user");

  // useEffect(() => {
  //   if (!(localUser && isAuthenticated)) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, localUser, navigate]);

  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-border bg-card text-card-foreground">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Logo
          </span>
        </Link>
        <div className="flex space-x-3 md:order-2 rtl:space-x-reverse">
          <Button asChild>
            <Link to={"/login"}>Get started</Link>
          </Button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] p-2 text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
        </div>
        <div
          className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col space-y-4 rounded-lg border border-border bg-muted p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-card md:p-0 rtl:space-x-reverse">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.link}
                  className="block rounded-[var(--radius)] bg-primary px-3 py-2 text-primary-foreground md:bg-transparent md:p-0 md:text-primary"
                  aria-current="page"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
