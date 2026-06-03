"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Banner = ({ content, typing = false, children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // // Reset any previous split text
    // textRef.current.innerHTML = content || "Hello there!";

    if (typing) {
      // Split text into individual letters for typing effect
      const splitText = new SplitType(textRef.current, { types: "chars", tagName: "span" });

      gsap.fromTo(
        splitText.chars,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          // y: 50,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(textRef.current, {
        delay: 0.5,
        opacity: 1,
        y: 50,
        duration: 2,
        ease: "back.out",
      });
    }
  }, [typing, content]);

  return (
    <div className="banner w-full relative">
      <div className="cmpad h-full flex  flex-col justify-center">
        <div className="w-full">
          <p ref={textRef} className="text-4xl/tight sm:text-5xl/tight md:text-6xl/tight lg:text-7xl/tight text-black">
            {content || "Hello there!"}
          </p>
        </div>
        {children && children}
      </div>
    </div>
  );
};

export default Banner;
