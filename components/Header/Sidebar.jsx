"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const Sidebar = ({ isOpen, onClose, menus }) => {
  const sidebarRef = useRef(null);
  const menuItemsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      
      // Animate in the sidebar
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      
      // Animate in the menu items
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.children,
          { 
            opacity: 0, 
            y: 20 
          },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            delay: 0.3, 
            duration: 0.4 
          }
        );
      }
    } else {
      // Re-enable body scroll when sidebar is closed
      document.body.style.overflow = "auto";
      document.body.style.position = "relative";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Calculate the variants for the sidebar animation
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: "100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999] lg:hidden"
          onClick={handleBackdropClick}
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="sidebar h-full w-[280px] bg-background border-l border-border shadow-lg"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-semibold"></h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Sidebar content */}
            <div className="p-4">
              <ul ref={menuItemsRef} className="">
                {menus.map((item) => (
                  <li key={item.link} className="w-full">
                    <Link 
                      href={item.link}
                      className="block w-full py-2 text-lg hover:text-primary transition-colors duration-200"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;