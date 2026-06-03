"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";


const Service = () => {
  const sectionsRef = useRef([]);

  const data = [
    {
      title: "Digital Marketing",
      content:
        "Our  AI-integrated digital marketing services help you reach the right people using the right strategies. We create a connection, enhance visibility and build engagement without feeling like an ad.",
      img: "/images/home-service2.jpg",
    },
    {
      title: "Market Identity",
      content:
        "Branding is not about developing a logo—it’s all about establishing a recognisable identity. We help build your brand story, which is subtle, clear, and has a lasting impression.",
      img: "/images/home-service5.jpg",
    },
    {
      title: "Design",
      content:
        "We create designs that make people feel. From that first click to the final scroll, we design with people in mind to deliver functionality and flow.",
      img: "/images/home-service7.jpg",
    },
    {
      title: "Code & Craft",
      content:
        "Behind every smooth performance is code doing quiet magic. Our development team builds fast, responsive sites and products that don’t just work—they work exceptionally well.",
      img: "/images/home-service6.jpg",
    },
  ];

  return (
    <>
      <div className="container py-6 md:py-12 relative" style={{ height: "100%" }}>
        <div className=" h-ful">
          <ul className="service-ul ">
            {data.map((item, index) => {
              const isOdd = (index + 1) % 2 !== 0;

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                  className="h-full flex justify-center"
                  ref={(el) => (sectionsRef.current[index] = el)}>
                  <div className={`card card${index + 1}`} style={{
                    // background: isOdd ? "#e7e7e7" : "white", 
                    // borderColor : isOdd ? "#e7e7e7" : "#45444442"
                  }}>
                    {!isOdd && (
                      <div className="img-wrapper justify-start">
                        <img src={item.img} className="img" />
                      </div>
                    )}
                    <div className="content">
                      <h1>{item.title}</h1>
                      <p>{item.content}</p>
                      <Link href="/services">View more</Link>
                    </div>
                    {isOdd && (
                      <div className="img-wrapper justify-end">
                        <img src={item.img} className="img" />
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Service;
