'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, PlayCircle, X } from 'lucide-react';
import Banner from '@/components/Services/Banner';
import { get } from '@/helpers/api';
import { BASE_URL } from '@/config';

// Utility function to merge class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Video Modal Component
function VideoModal({ isOpen, onClose, videoId }) {
  if (!isOpen) return null;

  const getYouTubeId = (url) => {
    if (!url) return '';
    if (url.length === 11) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const finalVideoId = getYouTubeId(videoId);



  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-background rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${finalVideoId}`}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// Testimonials data
// const testimonialsData = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     position: "CEO",
//     company: "TechInnovate",
//     image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
//     videoId: "dQw4w9WgXcQ",
//     quote: "Working with this team transformed our business completely. Their attention to detail and dedication to excellence is unmatched in the industry.",
//     fullTestimonial: "Working with this team transformed our business completely. Their attention to detail and dedication to excellence is unmatched in the industry. We've seen a 200% increase in productivity and customer satisfaction since implementing their solutions. The team was always available to answer questions, provide support, and guide us through the entire process. I can't recommend them highly enough!",
//     companyDescription: "TechInnovate is a leading software development company specializing in AI-powered solutions for businesses of all sizes.",
//     projectDetails: [
//       "Complete digital transformation of legacy systems",
//       "Implementation of AI-driven customer service platform",
//       "Employee training and onboarding for new technologies",
//       "Ongoing maintenance and support"
//     ]
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     position: "Marketing Director",
//     company: "GlobalReach",
//     image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
//     videoId: "jNQXAC9IVRw",
//     quote: "The results we achieved with their marketing strategy exceeded our expectations. Our conversion rates increased by 45% in just three months.",
//     fullTestimonial: "The results we achieved with their marketing strategy exceeded our expectations. Our conversion rates increased by 45% in just three months. Their team took the time to understand our business goals and target audience, creating a tailored approach that resonated with our customers. The data-driven insights they provided helped us make informed decisions that significantly improved our ROI. It's been a pleasure working with such knowledgeable professionals.",
//     companyDescription: "GlobalReach is an international marketing agency helping brands expand their presence in emerging markets.",
//     projectDetails: [
//       "Comprehensive digital marketing strategy",
//       "Social media campaign management",
//       "SEO optimization and content creation",
//       "Performance tracking and analytics reporting"
//     ]
//   },
//   {
//     id: 3,
//     name: "Emma Rodriguez",
//     position: "Operations Manager",
//     company: "EcoSolutions",
//     image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
//     videoId: "C0DPdy98e4c",
//     quote: "Their sustainable approach to operations consulting helped us reduce waste by 60% while improving efficiency. Truly impressive work!",
//     fullTestimonial: "Their sustainable approach to operations consulting helped us reduce waste by 60% while improving efficiency. Truly impressive work! The team provided practical solutions that were easy to implement and made a significant impact on our bottom line. They worked closely with our staff, ensuring everyone was on board with the changes. The transparent communication throughout the project made the entire process smooth and stress-free.",
//     companyDescription: "EcoSolutions develops eco-friendly products and services for environmentally conscious consumers.",
//     projectDetails: [
//       "Supply chain optimization and waste reduction",
//       "Implementation of sustainable materials and processes",
//       "Staff training on environmental best practices",
//       "Development of recycling and resource recovery systems"
//     ]
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     position: "CTO",
//     company: "SecureTech",
//     image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
//     videoId: "LXb3EKWsInQ",
//     quote: "The cybersecurity framework they implemented has protected us from multiple threats. Their expertise in this field is second to none.",
//     fullTestimonial: "The cybersecurity framework they implemented has protected us from multiple threats. Their expertise in this field is second to none. After experiencing a major data breach, we needed a robust solution that would safeguard our sensitive information. Their team quickly assessed our vulnerabilities and designed a comprehensive security system tailored to our specific needs. Their ongoing monitoring and quick response to potential threats gives us peace of mind.",
//     companyDescription: "SecureTech provides advanced cybersecurity solutions to protect businesses from digital threats and data breaches.",
//     projectDetails: [
//       "Comprehensive security audit and vulnerability assessment",
//       "Implementation of multi-layer security protocols",
//       "Employee training on security best practices",
//       "24/7 monitoring and incident response"
//     ]
//   },
//   {
//     id: 5,
//     name: "Olivia Kim",
//     position: "Product Manager",
//     company: "InnovateLabs",
//     image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
//     videoId: "k1BneeJTDcU",
//     quote: "Their product development team helped us bring our concept to market in record time. The quality and attention to detail exceeded all expectations.",
//     fullTestimonial: "Their product development team helped us bring our concept to market in record time. The quality and attention to detail exceeded all expectations. From the initial design phase to the final launch, they were collaborative partners who truly cared about the success of our product. Their iterative approach, incorporating user feedback throughout the development process, resulted in a product that our customers love. Our app has maintained a 4.8-star rating since launch.",
//     companyDescription: "InnovateLabs specializes in developing cutting-edge products at the intersection of technology and everyday needs.",
//     projectDetails: [
//       "Concept refinement and market research",
//       "Iterative prototyping and user testing",
//       "Full-scale development and quality assurance",
//       "Launch strategy and post-release support"
//     ]
//   },
//   {
//     id: 6,
//     name: "James Thompson",
//     position: "HR Director",
//     company: "PeopleFocus",
//     image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
//     videoId: "QH2-TGUlwu4",
//     quote: "The employee engagement platform they created has revolutionized our workplace culture. Staff satisfaction is up 40% and turnover has decreased significantly.",
//     fullTestimonial: "The employee engagement platform they created has revolutionized our workplace culture. Staff satisfaction is up 40% and turnover has decreased significantly. Their team took the time to understand our unique workplace dynamics and challenges, creating a solution that addressed our specific needs. The platform is intuitive, user-friendly, and has fostered a sense of community among our remote workforce. Their ongoing support and regular updates have ensured the platform continues to meet our evolving needs.",
//     companyDescription: "PeopleFocus delivers human resources solutions that prioritize employee satisfaction and organizational success.",
//     projectDetails: [
//       "Workplace culture assessment and strategy development",
//       "Custom employee engagement platform implementation",
//       "Management training and development programs",
//       "Ongoing performance monitoring and optimization"
//     ]
//   }
// ];

const bannerContent = "Discover how we've helped businesses transform and grow through the experiences of our valued clients.";

export default function Testimonials() {
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: "" });
  const [testimonialsData, settestimonialsData] = useState([])
  const openVideoModal = (videoId, e) => {
    e.preventDefault();
    setVideoModal({ isOpen: true, videoId });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoId: "" });
  };

  useEffect(() => {
    fetchallTestimoanial()
  }, [])


  function fetchallTestimoanial() {
    get(`testimonial`).then((res) => {
      console.log("res", res)
      settestimonialsData(res.data)

    })
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 px-4 sm:px-6">
        <Banner content={bannerContent} />
      </section>

      {/* Testimonials Section */}
      <section style={{ backgroundColor: "#f6f6f6" }} className="py-5 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* <h2 className="text-3xl font-bold mb-12 text-center">Client Success Stories</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
          {testimonialsData?.map((testimonial) => (
            <div onClick={(e) => openVideoModal(testimonial.url, e)} key={testimonial._id} className="group mx-auto flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white w-full max-w-sm cursor-pointer">
              <div className="w-full overflow-hidden relative">
                <img
                  src={`${BASE_URL}/${testimonial.image}`}
                  alt={testimonial.name}
                  className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => openVideoModal(testimonial.url, e)}
                  className="absolute bottom-4 right-4 bg-white/80 hover:bg-white rounded-full p-2"
                  aria-label="Play video testimonial"
                >
                  <PlayCircle className="text-primary w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{testimonial.designation}</p>
                <p className="text-gray-700 mb-4 line-clamp-4">{testimonial.testimonial}</p>
                {/* <ul className="text-sm text-gray-600 list-disc pl-5 mb-4">
                  {testimonial.projectDetails.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul> */}
                {/* <Link href="#" className="mt-auto inline-flex items-center text-primary hover:underline text-sm font-medium">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={videoModal.isOpen} onClose={closeVideoModal} videoId={videoModal.videoId} />
    </div>
  );
}
