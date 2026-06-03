"use client";
import { post } from "@/helpers/api";
import { getGreeting } from "@/helpers/functions";
import { Power } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminHeader = () => {
  const [greetings] = useState(() => getGreeting());

  const router = useRouter();
  function handleLogout() {
    post("auth/logout").then((res) => {
      localStorage.removeItem("user");
      router.push("/admin")
    });
  }

  return (
    <div className="h-14 py-3 w-full px-5 flex items-center justify-between border shadow-sm sticky top-0 z-50 bg-white">
      <span className="text-base font-medium">{greetings}</span>

      <span className="cursor-pointer" onClick={handleLogout}>
        <Power />
      </span>
    </div>
  );
};

export default AdminHeader;
