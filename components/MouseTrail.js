"use client";
import Script from "next/script";
import { useLayoutEffect } from "react";

const MouseTrail = () => {
  // useLayoutEffect(() => {
  //   const TAIL_LENGTH = 5;
  //   const cursor = document.getElementById("cursor");

  //   let mouseX = 0,
  //     mouseY = 0;
  //   let smoothX = 0,
  //     smoothY = 0;
  //   let cursorCircles;
  //   let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

  //   function lerp(start, end, factor) {
  //     return start + (end - start) * factor;
  //   }

  //   function onMouseMove(event) {
  //     mouseX = event.clientX;
  //     mouseY = event.clientY;
  //   }

  //   function initCursor() {
  //     for (let i = 0; i < TAIL_LENGTH; i++) {
  //       let div = document.createElement("div");
  //       div.classList.add("cursor-follow");
  //       cursor.append(div);
  //     }
  //     cursorCircles = Array.from(document.querySelectorAll(".cursor-follow"));
  //   }

  //   function updateCursor() {
  //     smoothX = lerp(smoothX, mouseX, 0.1);
  //     smoothY = lerp(smoothY, mouseY, 0.1);

  //     cursorHistory.shift();
  //     cursorHistory.push({ x: smoothX, y: smoothY });

  //     for (let i = 0; i < TAIL_LENGTH; i++) {
  //       let current = cursorHistory[i];
  //       let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

  //       current.x = lerp(current.x, next.x, 0.2);
  //       current.y = lerp(current.y, next.y, 0.2);

  //       cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${1 - i / TAIL_LENGTH})`;
  //     }

  //     requestAnimationFrame(updateCursor);
  //   }

  //   document.addEventListener("mousemove", onMouseMove, false);
  //   initCursor();
  //   updateCursor();
  // }, []);

  return (
    <>
      <div id="cursor"></div>
      <Script src="js/mouse.js" />
    </>
  );
};

export default MouseTrail;
