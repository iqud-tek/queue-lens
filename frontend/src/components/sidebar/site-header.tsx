"use client";

import { ExternalLink } from "lucide-react";

import { Link } from "react-router-dom";
import { NavUser } from "./nav-user";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background text-foreground">
      <div className="flex h-[--header-height] w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold">
            TaskForce
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/dashboard"
            className="text-sm hover:text-primary-foreground/80"
          >
            Dashboard
          </Link>
          <Link
            to="/teams"
            className="text-sm hover:text-primary-foreground/80"
          >
            Teams
          </Link>
          <Link
            to="/account"
            className="text-sm hover:text-primary-foreground/80"
          >
            Account
          </Link>
          <Link
            to="/docs"
            className="flex items-center gap-1 text-sm hover:text-primary-foreground/80"
          >
            Docs
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            to="/support"
            className="flex items-center gap-1 text-sm hover:text-primary-foreground/80"
          >
            Support
            <ExternalLink className="h-3 w-3" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <NavUser
            user={{
              name: "varun",
              email: "varunsalat@gmail.com",
              avatar: "https://shorturl.at/PdUSb",
            }}
          />
        </div>
      </div>
    </header>
  );
}
