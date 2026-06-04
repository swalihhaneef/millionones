"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WhoWeAre = () => {
  const pathRef = useRef(null);
  const scrollTimeoutRef = useRef(null); // to persist timeout

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
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        resetSqueeze();
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center gap-10">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <div className="w-full aspect-square relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full block rounded-xl overflow-hidden">
            <defs>
              <clipPath id="breadClip2">
                <path ref={pathRef} id="breadPath2" d="M0,0 Q50,0 100,0 L100,100 Q50,100 0,100 Z" />
              </clipPath>
            </defs>
            <image
              href="/images/about/who-we-are-2.png"
              clipPath="url(#breadClip2)"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>
        </div>
      </div>

      <div className="md:w-1/2 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Millionones, a leading digital marketing and web design company based in Kerala, has been driving digital success since 2019. With six years of
          industry experience, we are the creative force behind some of the most influential brand journeys, crafting innovative strategies and
          technology-driven solutions that fuel growth.
        </p>
        <p className="text-lg leading-relaxed">
          From eye-catching designs to AI-powered marketing, our mission is to strengthen brands with creativity, precision, and impactful results. In
          an ever-evolving digital world, we guide businesses with clarity, vision, and purpose
        </p>
        <p className="mt-6 italic font-semibold text-black">Let’s build success together..</p>
      </div>
    </div>
  );
};

export default WhoWeAre;
