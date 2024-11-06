"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AdminLinkProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}
const AdminLink: React.FC<AdminLinkProps> = ({ href, title, icon }) => {
  const pathname = usePathname();
  const isAtiveLink = pathname === href;
  return <Link href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${isAtiveLink ? "text-primary bg-muted" : "text-muted-foreground"}`}>
     {icon}
     {title}
  </Link>;
};

export default AdminLink;
