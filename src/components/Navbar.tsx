"use client";
import { Home, LogIn, User } from "lucide-react";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";


export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/#home",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/#about",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "My Projects",
      link: "/#projects-section",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    
    
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
     
    </div>
  );
}

