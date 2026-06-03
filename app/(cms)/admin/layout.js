"use client";
import { get } from "@/helpers/api";
import { Loader, Rotate3D } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const [loading, setloading] = useState(true);
  const [logged, setLogged] = useState(false);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    get("auth/me")
      .then((res) => {
        setLogged(true);
        setloading(false);
        localStorage.setItem("user", JSON.stringify({ email: res.email, name: res.name }));

        if (!localStorage.getItem("user") || pathname === "/admin") {
          router.push("/admin/dashboard");
        }
      })
      .catch((err) => {
        localStorage.removeItem("user");
        router.replace("/admin");
        setloading(false);
      });
  }, []);
  return (
    <>
      <Toaster position="top-right"/>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader size={32} />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
