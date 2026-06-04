"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "@/components/common/VedioPlayer";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ScrollZoom({ className = "" }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [showVedio, setShowVedio] = useState(false)

  const { scrollYProgress,scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.6, 0.7, 0.9, 1]);
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const unsubscribeProgress = scrollYProgress.on("change", (v) => {
      if (v >= 0.5) {
        setShowVedio(true)
      } else {
        setShowVedio(false)
      }
    });

    const unsubscribeY = scrollY.on("change", (y) => {
      if (y > 1000) {
        setShowVedio(false);
      }
    });

    return () => {
      unsubscribeProgress();
      unsubscribeY();
    };
  }, [scrollYProgress,scrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then((module) => {
        const ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      });
    }
  }, []);


  const cursorRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        delay: 5,
        duration: 3, // Typing speed
        text: "Make Millions Notice",
        ease: "power1.out",
        onComplete: () => {
          if (cursorRef.current) {
            cursorRef.current.textContent = ".";

            // Stop blinking animation
            gsap.killTweensOf(cursorRef.current);
            gsap.to(cursorRef.current, { opacity: 1 }); // Ensure it's visible
          }
        }
      });
    }

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.7, // Blinking speed
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <div className="w-full h-[120px]"></div>
      <div className="min-h-screen bg-zinc-100">
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-4xl sm:text-8xl text-black">
            <span ref={textRef}></span>
            <span ref={cursorRef} className="text-4xl sm:text-8xl">
              |
            </span>
          </p>
        </div>
        <p className="text-xl text-center pb-1">Scroll Down</p>
        <div className="one-px-line show"></div>
        <div
          ref={containerRef}
          className="min-h-max sm:min-h-[80vh] pb-[100px] sm:pb-0 w-full flex items-center justify-center"
        >
          <motion.div
            style={{ scale: smoothScale }}
            className={`h-full sm:h-screen relative w-full ${className}`}
            onScroll={() => console.log('scrolling')}
          >
            <div className="max-h-max sm:max-h-screen h-full">
              <div className="h-full flex justify-center items-center flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className=""
                >
                  <div className="max-h-screen overflow-hidden">
                    <VideoPlayer vedio="/vedios/horatio_video-02.mp4" onReady={showVedio} />
                  </div>
                </motion.div>

                {/* </motion.div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
