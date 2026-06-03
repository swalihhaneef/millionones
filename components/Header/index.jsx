"use client";
import React, { useRef, useState, useEffect } from "react";
import { Call, Saved, Search } from "../common/Icons";
import "./style.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useLenis, { destroyLenis, initLenis } from "@/hooks/useLenis";
import Link from "next/link";

import { motion } from "framer-motion";
import { useMouseTrail } from "@/components/MouseTrail";
import { MenuIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import VideoPlayer from "../common/VedioPlayer";

const menus = [
  {
    name: "AI Solutions",
    link: "/ai-solutions",
  },
  {
    name: "Works",
    link: "/works",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Industries",
    link: "/industries",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Insights",
    link: "/insights",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const vedioContainerRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [mainHead, setMainHead] = useState(false);
  const [scrollHead, setScrollHead] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useLenis(true);

   useEffect(() => {
    initLenis(); // create once
    return () => destroyLenis();
  }, []);


  useEffect(() => {
    if (showImage) {
      const tl = gsap.timeline();

      gsap.to(vedioContainerRef.current, {
        height: "120px",
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(logoRef.current, {
        ease: "power3.out",
        top: 0,
        left: 0,
        translateY: 0,
        translateX: 0,
        width: "140px",
        duration: 1.5,
        onComplete: () => {
          setMainHead(true)
          logoRef.current.style.width = "140px"
        },
      });
    }
  }, [showImage])

    useGSAP(() => {
      const timeout = setTimeout(() => {
        setShowImage(true);

      }, 5500); // 5-second delay

      // Clear timeout on cleanup
      return () => clearTimeout(timeout);
    }, []);

  useEffect(() => {
    if (mainHead) {
      gsap.from(menuRef.current.querySelectorAll("li"), {
        y: -20,
        delay: 0.5,
        duration: 0.2,
        stagger: 0.1,
        opacity: 0,
      });
    }
  }, [mainHead]);

  useEffect(() => {
    if (mainHead) {
      const handleScroll = () => {
        if (window.scrollY < lastScrollY) {
          setScrollHead(false); // Show header when scrolling up
        } else if (window.scrollY > 50) {
          setScrollHead(true); // Hide header when scrolling down
        }
        setLastScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [mainHead, lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={`${scrollHead ? "scrollHead" : ""} ${mainHead ? "" : "bg-black"} h-screen `} ref={vedioContainerRef}>
        <div className="head-container ">
          <div className={`inner-header ${mainHead ? "expanded" : "justify-center"}`}>
            <div className={`logo relative w-full ${mainHead ? "max-w-[200px]" : ""}`}>
              {!showImage ?
                <div className="vedio-wrapper bg-black">
                  <div className="vedio-container">
                    <VideoPlayer vedio="/vedios/horatio-lauch-vedio (online-video-cutter.com).mp4" onReady={true}/>
                  </div>
                </div>
                : 
                <Link href="/">
                  <img
                    ref={logoRef}
                    // src="/images/black-logo-copy.jpg"
                    src="/images/logo-black.svg"
                    className="w-[600px] h-[75px] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
                    alt="Logo"
                  />
                </Link>
              } 
            </div>
            {mainHead && (
              <div ref={menuRef} className=" menus">
                <ul className="main-menu">
                  {menus.map((item) => (
                    <motion.li
                      className="w-max"
                      whileHover={{
                        scale: 1.1,
                      }}
                      key={item.link}>
                      <Link className="text-xl" href={item.link}>{item.name}</Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            <button className="header-btn lg:hidden" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menus={menus}
      />
    </>
  );
};

export default Header;
