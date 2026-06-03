"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => { 
    // Delay helps override the browser's default restore behavior
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" }); // use "instant" on refresh for reliability
    }, 10); // small timeout to run *after* browser scroll restore

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
