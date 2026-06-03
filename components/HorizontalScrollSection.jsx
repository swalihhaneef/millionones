"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = ({ data }) => {
  const containerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;

    const totalScrollWidth = panel.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollLength = totalScrollWidth - viewportWidth;

    gsap.to(panel, {
      x: () => `-${scrollLength}`,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 20%",
        end: () => `+=${totalScrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.kill();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-white mt-5">
      <div
        ref={panelRef}
        className="flex gap-8 pr-4 py-12 w-max" // px-[50vw] centers first & last
      >
        {data?.map((item, i) => (
          <div
            key={i}
            className="min-w-[500px] max-w-[500px] flex-shrink-0 bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300"
          >
            <h6 className="text-xl font-semibold mb-4 text-gray-900">
              {item?.title}
            </h6>
            <p className="text-gray-600 mb-4">
              {item?.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
