// "use client"; // Ensure it's a client component

// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// const useLenis = (stop = null) => {
//   useEffect(() => {
//     // const lenis = new Lenis({
//     //   smooth: true,
//     // });

//     const lenis = new Lenis({
//       duration: 2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       direction: "vertical",
//       gestureDirection: "vertical",
//       smooth: true,
//       mouseMultiplier: 1,
//       smoothTouch: false,
//       touchMultiplier: 2,
//       infinite: false,
//     });


//     if(stop){
//       console.log('stop')
//       lenis.stop()
//     }else{
//       console.log('working')
//       function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     }

//     return () => {
//       lenis.destroy();
//     };
//   }, []);
// };

// export default useLenis;


// lenisController.js
import Lenis from "@studio-freight/lenis";

let lenis = null;
let rafId = null;

function raf(time) {
  if (lenis) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
}

export function initLenis(options = {}) {
  if (lenis) return lenis; // already inited

  lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    ...options,
  });

  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function stopLenis() {
  if (lenis) lenis.stop();
}

export function startLenis() {
  if (lenis) lenis.start();
}

export function destroyLenis() {
  if (rafId) cancelAnimationFrame(rafId);
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  rafId = null;
}

export function getLenis() {
  return lenis;
}
