"use client"
import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const FlippingCards = ({content}) => {
  const cardsRef = useRef([]);

  const handleMouseEnter = (index) => {
    gsap.to(cardsRef.current[index], {
      rotateY: 180,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      rotateY: 0,
      duration: 0.,
      ease: 'power2.out',
    });
  };

  const [data,setData] = useState(content || [])

  return (
    <>
      <div className="">
        <ul className="flex flex-wrap justify-center h-screen flex-col">
          {data.map((item, index) => (
            <li
              key={index}
              className="list-none  w-full sm:w-1/2 h-1/2 sm:h-full relative [transform-style:preserve-3d] [perspective:1000px]"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="w-full h-full rounded-lg shadow-md relative transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full flex  items-center justify-center  backface-hidden "
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover "
                  }}
                >
                  {/* <img src={item.img} alt="" /> */}
                  <h1 className='text-6xl md:text-9xl font-bold text-white'>{item.title}</h1>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full flex items-center justify-center  bg-black text-white px-8"
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <p className='text-3xl'>
                    {item.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

export default FlippingCards;
