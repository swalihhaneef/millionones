"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text = "", animation, className = "", children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const typeSplit = new SplitType(textRef.current, {
      types: "lines, words, chars", // Add 'lines' if you want line-based animation
      tagName: "span",
    });

    const tl = gsap.timeline({
      paused: !["scrub-each-word", "opacity-text"].includes(animation),
      scrollTrigger: ["scrub-each-word", "opacity-text"].includes(animation)
        ? {
            trigger: textRef.current,
            start: "top 90%",
            end: "bottom 50%",
            scrub: 0.2,
          }
        : undefined,
    });

    switch (animation) {
      case "letters-slide-up":
        tl.from(typeSplit.chars, {
          opacity: 0,
          yPercent: 120,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });
        break;

      case "letters-skew":
        tl.from(typeSplit.chars, {
          opacity: 0,
          yPercent: 100,
          skewY: 5,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        });
        break;

      case "scrub-each-word":
      case "opacity-text":
        tl.from(typeSplit.chars, {
          opacity: 0.2,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
        });
        break;

      default:
        break;
    }

    if (!["scrub-each-word", "opacity-text"].includes(animation)) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 90%",
        end: "top 20%",
        onEnter: () => tl.play(),
      });
    }
  }, [animation]);

  // Manually convert \n into <br />
  const renderedText = text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <div ref={textRef} className={className}>
      {renderedText}
      {children && children}
    </div>
  );
};

export default AnimatedText;
