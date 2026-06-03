"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        markers: false,
      },
    });

    tl.fromTo(leftRef.current, { yPercent: 50, opacity: 0.3 }, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 2 });

    tl.fromTo(rightRef.current, { yPercent: -50, opacity: 0.3 }, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 2 }, "<");
  }, []);

  return (
    <section ref={sectionRef} className="cmpad bg-white">
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* First Section - Moves from Bottom to Center */}
        <div ref={leftRef} className="flex flex-col gap-5 p-4">
          <div className="w-full h-[35rem] overflow-hidden rounded-lg">
            <img
              src="https://img.freepik.com/free-photo/handshake-close-up-executives_1098-1384.jpg"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 className="text-[2em] font-normal">Collaboration</h3>
          <p className="text-gray-700 font-light text-lg">
            We place a strong emphasis on open discussions in everything we do, engaging a supportive environment for collaborations.
          </p>
        </div>

        {/* Second Section - Moves from Top to Center */}
        <div ref={rightRef} className="flex flex-col gap-5 p-4 pt-24">
          <div className="w-full h-[35rem] overflow-hidden rounded-lg">
            <img
              src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241262.jpg"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 className="text-[2em] font-normal">Client-Focused</h3>
          <p className="text-gray-700 font-light text-lg">
            We take the time to truly understand our clients’ goals and visions, so we can help them hit their goals hard and their audience’s heart.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClSection;
