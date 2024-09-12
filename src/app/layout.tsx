import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthModal from "@/components/auth/AuthModal";
import Navbar from "@/components/navbar/navbar";
import ChatSidebar from "@/components/sidebar/chat-sidebar";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/firebase/firebase-user-provider";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUserPlus
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [

    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Create Character",
      href: "/character/new",
      icon: (
        <IconUserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    
    
  ];

  return (
    <html lang="en">
    <body className={inter.className}>
    <UserProvider>

    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <AuthModal />
      <Toaster />

      <ChatSidebar links={links}/>
      <div className="flex flex-1 flex-col">
    <Navbar></Navbar>
      <div className="p-2 md:px-8 lg:px-16 xl:px-24 rounded-tl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
       
      {children}
      </div>
    </div>
    </div>
    </UserProvider>

    </body>
  </html>
 
  );
}
