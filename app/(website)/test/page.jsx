"use client"
import React, { useRef } from 'react';
import gsap from 'gsap';

const FlippingCards = () => {
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

  const data = [
    {
      img: "/images/Cuker_DynamicBrand_BrandingCTA_1.jpg",
      content: `Search Engine Optimization (SEO) is the
 process of improving the visibility of the
 site on search engines like Google, Bing,
 etc. This includes using the right keywords,
 creating high-quality materials, optimizing
 technical performance, and building
 reliable feedback to help your site rank
 higher. SEO aims to attract organic traffic
 (non-paid)   by ensuring your site when
 users search relevant terms. Effective SEO
 establishes branding authority, consistently
 drives traffic, and plays a crucial role in
 digital growth`,
      title: "SEO"

    },
    {
      title: "GEO",
      img: "/images/Cuker_DynamicBrand_BrandingCTA_2.jpg",
      content: `Generative Engine Optimization (GEO), is
 the new margin of digital visibility. Unlike
 traditional SEOs, which focus on the
 ranking of web pages in the results of the
 search engine. It is all about adapting the
 material to AI-powered search engines that
 generate direct, cyclical-like chat or SGE of
 Google. Instead of aiming for a place in the
 list of links, GEO ensures that the insight
 into your brand is involved in the
 synthesized reaction from AI. All of this is
 about reference, clarity and reliability to
 quote or refer to your content in AI's
 response. 
`
    }

  ]

  return (
    <>
      <div className='h-[100vh]'></div>
      <div className="">
        <ul className="flex flex-wrap justify-center h-screen">
          {data.map((item, index) => (
            <li
              key={index}
              className="list-none  w-1/2 relative [transform-style:preserve-3d] [perspective:1000px]"
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
                  <h1 className='text-9xl font-bold text-white'>{item.title}</h1>
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
