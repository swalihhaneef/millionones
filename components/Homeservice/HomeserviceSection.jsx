"use client"
import React, { useRef } from 'react';
import { Code2, Palette, Globe2, Smartphone, Megaphone, BarChart3 } from 'lucide-react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const HomeserviceSection = () => {

  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0, 
        duration: 1,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: "play none none reverse"
        }
      }
    )
  })
  const services = [
    {
      icon: <Code2 className="w-12 h-12" />,
      title: "Web Development",
      description: "Custom web solutions built with cutting-edge technologies to deliver exceptional user experiences."
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Creative and intuitive designs that enhance user engagement and brand identity."
    },
    {
      icon: <Globe2 className="w-12 h-12" />,
      title: "Digital Solutions",
      description: "Comprehensive digital solutions that drive business growth and innovation."
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver seamless experiences."
    },
    {
      icon: <Megaphone className="w-12 h-12" />,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that increase visibility and drive results."
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Analytics & SEO",
      description: "Data-driven optimization and SEO strategies to improve online presence."
    }
  ];

  return (
    <div className='cmpad ' ref={sectionRef}>
      <div className="px-10 py-3 ">
        <div className="max-w-7xl mx-auto">
          {/* <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We offer comprehensive digital solutions to help your business grow and succeed in the digital landscape
          </p>
        </div> */}
          <h2 className='casestudy-h2 '>Our Services</h2>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card p-8 bg-white rounded-xl shadow-lg transition-all duration-500 
                hover:shadow-2xl border border-gray-100 slide-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="service-icon text-black mb-6 group-hover:text-black">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
          <button className='all-story-button'>View All Services</button>
        </div>

    </div>
  )
}

export default HomeserviceSection