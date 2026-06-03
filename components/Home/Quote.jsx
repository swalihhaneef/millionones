// 'use client'
// import React, { useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'
// gsap.registerPlugin(ScrollTrigger)

// const Quote = () => {
//   const sectionRef = useRef(null)
//   const textRef = useRef(null)

//   // useGSAP(() => {
//   //   const words = textRef.current.querySelectorAll('span')

//   //   gsap.to(words, {
//   //     color: '#eaeaea',
//   //     stagger: 0.1,
//   //     scrollTrigger: {
//   //       trigger: sectionRef.current,
//   //       start: 'top center',
//   //       end: 'bottom+=100 bottom',
//   //       scrub: true
//   //     }
//   //   })
//   // }, [])
//   useGSAP(() => {
//     const words = textRef.current.querySelectorAll('span');

//     // Initial state
//     gsap.set(words, {
//       color: 'rgba(255, 255, 255, 0.1)',
//       y: 20,
//       opacity: 0,
//     });

//     // Animate words on scroll
//     gsap.to(words, {
//       color: '#ffffff',
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.1,
//       ease: 'power2.out',
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: 'top center',
//         end: 'bottom center',
//         scrub: false,
//         toggleActions: 'play none none reverse',
//       },
//     });

//     // Parallax effect for background
//     gsap.to(sectionRef.current, {
//       backgroundPosition: '50% 100%',
//       ease: 'none',
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: true,
//       },
//     });
//   }, []);

//   const text = `Transforming Ideas into Digital Excellence. Unleashing Innovation with Scalable IT Solutions. Driven by Passion, Committed to Your Success.`

//   const wordsArray = text.split(' ').map((word, index) => (
//     <span key={index} className='inline-block mr-1'>
//       {word}
//     </span>
//   ))

//   return (
//     <>
//       <div className='slider qoute-bg' ref={sectionRef}>
//         <div className='cmpad h-full'>
//           <div className='h-full flex justify-center items-center'>
//             <p className='hero-text' ref={textRef}>
//                 {wordsArray}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Quote


"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform,useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollZoom({ children, className = "" }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null); // Ref for H1 shadow animation
  const [showHello, setShowHello] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.6, 0.7, 0.8, 1]);
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });


  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then((module) => {
        const ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribeProgress = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.5 && !showHello) {
        setShowHello(true);
        setTimeout(() => {
          setShowContent(true);
        }, 700);
      }
    });

    return () => {
      unsubscribeProgress();
    };
  }, [scrollYProgress, showHello]);

  // GSAP Animation for Text and Shadow Effect
  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll("span");

      // Initial state
      gsap.set(words, {
        opacity: 0,
        y: 20,
        color: "rgba(255, 255, 255, 0.1)",
      });

      // Scroll animation
      gsap.to(words, {
        opacity: 1,
        y: 0,
        color: "#ffffff",
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
    
      });
    }
  }, [showContent]);

  const text = `Transforming Ideas into Digital Excellence. Unleashing Innovation with Scalable IT Solutions. Driven by Passion, Committed to Your Success.`;

  const wordsArray = text.split(" ").map((word, index) => (
    <span key={index} className="inline-block mr-1">
      {word}
    </span>
  ));

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-[80vh] w-full flex items-center justify-center"
      >
        <motion.div
          style={{ scale :smoothScale}}
          className={`slider qoute-bg relative w-full ${className}`}
        >
          <div className="cmpad h-full">
            <div className="h-full flex justify-center items-center flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showHello ? 1 : 0, y: showHello ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6 text-center"
              >
                {/* Apply the shadow animation on this H1 */}
                <p ref={headingRef} className="text-7xl  text-white">
                  Thrive Creatively
                </p>
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              > */}
                <p className="hero-text text-white" style={{opacity:showContent ? 1 :0}}  ref={textRef}>
                  {wordsArray}
                </p>
              {/* </motion.div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
