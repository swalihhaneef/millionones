"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const OurStory = () => {
  const pathRef = useRef(null);
  let scrollTimeout;

  useEffect(() => {
    const applySqueeze = (squish = 5) => {
      const newPath = `M0,0 Q50,${squish} 100,0 L100,100 Q50,${100 - squish} 0,100 Z`;
      gsap.to(pathRef.current, {
        duration: 0.3,
        attr: { d: newPath },
        ease: "power2.out",
      });
    };

    const resetSqueeze = () => {
      const originalPath = "M0,0 Q50,0 100,0 L100,100 Q50,100 0,100 Z";
      gsap.to(pathRef.current, {
        duration: 0.6,
        attr: { d: originalPath },
        ease: "power2.out",
      });
    };

    const handleScroll = () => {
      applySqueeze(4);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        resetSqueeze();
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="our-story" className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center gap-10">
      <div className="md:w-1/2 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our story</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Founded in 2019 by visionary entrepreneur Sarath C in the heart of Kochi, Millionones has grown from a small, passionate team into one of
          Kerala’s most trusted digital marketing and web design agencies. With six years of experience, we blend creativity, strategy, and technology
          to deliver impactful, data-driven solutions. From startups to established brands, we help businesses tell their unique stories and achieve
          measurable digital success.
        </p>
      </div>

      <div className="md:w-1/2 mb-8 md:mb-0">
        <div className="w-full aspect-square relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full block rounded-xl overflow-hidden">
            <defs>
              <clipPath id="breadClip2">
                <path ref={pathRef} id="breadPath2" d="M0,0 Q50,0 100,0 L100,100 Q50,100 0,100 Z" />
              </clipPath>
            </defs>
            <image href="/images/about/our-story.png" clipPath="url(#breadClip2)" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
