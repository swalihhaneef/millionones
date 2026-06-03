"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, Phone, Bookmark } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: "Next.js",
    icon: "https://raw.githubusercontent.com/github/explore/28b02bbc9ad9f7a503c43775aebeb515dc2da5fc/topics/nextjs/nextjs.png",
    color: "border-black/10 bg-black/5",
  },
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
    color: "border-blue-400/20 bg-blue-50",
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
    color: "border-blue-600/20 bg-blue-50",
  },
  {
    name: "Tailwind CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    color: "border-teal-400/20 bg-teal-50",
  },
  {
    name: "Node.js",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png",
    color: "border-green-500/20 bg-green-50",
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png",
    color: "border-blue-700/20 bg-blue-50",
  },
  {
    name: "GraphQL",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/graphql/graphql.png",
    color: "border-pink-500/20 bg-pink-50",
  },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png",
    color: "border-blue-500/20 bg-blue-50",
  },
  {
    name: "Redis",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/redis/redis.png",
    color: "border-red-500/20 bg-red-50",
  },
  {
    name: "MongoDB",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png",
    color: "border-green-600/20 bg-green-50",
  },
];

function TechnologyCard({ tech, index }) {
  const cardRef = useRef(null);

  // useEffect(() => {
  //     const card = cardRef.current;
  //     if (!card) return;

  //     const tl = gsap.timeline({
  //         scrollTrigger: {
  //             trigger: card,
  //             start: "top bottom-=100",
  //             toggleActions: "play none none reverse"
  //         }
  //     });

  //     tl.fromTo(card,
  //         {
  //             opacity: 0,
  //             y: 30,
  //             scale: 0.8,
  //             rotateX: -15,
  //         },
  //         {
  //             opacity: 1,
  //             y: 0,
  //             scale: 1,
  //             rotateX: 0,
  //             duration: 0.6,
  //             ease: "back.out(1.7)",
  //             delay: index * 0.1
  //         }
  //     );

  //     const iconEl = card.querySelector('.tech-icon');
  //     gsap.set(iconEl, { clearProps: "all" });

  //     card.addEventListener('mouseenter', () => {
  //         gsap.to(iconEl, {
  //             y: -10,
  //             scale: 1.1,
  //             duration: 0.4,
  //             ease: "power2.out"
  //         });
  //         gsap.to(card, {
  //             y: -5,
  //             duration: 0.4,
  //             ease: "power2.out"
  //         });
  //     });

  //     card.addEventListener('mouseleave', () => {
  //         gsap.to(iconEl, {
  //             y: 0,
  //             scale: 1,
  //             duration: 0.3,
  //             ease: "power2.inOut"
  //         });
  //         gsap.to(card, {
  //             y: 0,
  //             duration: 0.3,
  //             ease: "power2.inOut"
  //         });
  //     });
  // }, [index]);

  return (
    <motion.div
      whileInView={{
        transition: {
          delay: 0.3,
          ease: "easeIn",
        },
      }}
      whileHover={{ scale: 1.04 }}
      ref={cardRef}
      className="bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.15)] p-5 transform transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
      <div className={`flex flex-col items-center justify-center  `}>
        <img src={tech.icon} alt={tech.name} className="w-16 h-16 object-contain rounded-lg p-2 tech-icon mb-3 bg-white" />
        <h3 className="text-gray-700 font-medium text-center mt-2">{tech.name}</h3>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <div className="mb-6 py-10 pb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Our Tech Stack</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">Powering the next generation of web applications</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <TechnologyCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
