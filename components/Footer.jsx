"use client";
import React, { useRef, useState } from "react";
import MouseTrail from "./MouseTrail";
import Connect from "./Connect";
import Link from "next/link";
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useRouter } from "next/navigation";

const Footer = ({ show }) => {

  const [showButton, setShowButton] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    setShowButton(true);
    // Optional GSAP image zoom effect
    gsap.to(imgRef.current, {
      // scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setShowButton(false);
    // gsap.to(imgRef.current, {
    //   scale: 1,
    //   duration: 0.3,
    //   ease: 'power2.out',
    // });
  };

  const handleMouseMove = (e) => {
    let x = e.clientX
    let y = e.clientY
    if (x > 70 && y > 280) {
      // console.log(x, y, 'e')
    }
    setCoords({ x: x, y: y });
  };

  return (
    <>
      <div className="section-frame is-footer">
        {show ? <Connect /> : null}
        <footer className={`footer bg-black text-white ${!show && "border"}`}>
          <div className="cmpad w-full p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
              <div>
                <h4 className="text-lg font-semibold">About Us</h4>
                <ul className="mt-3 space-y-2  ">
                  <li className="hover:text-gray-500">
                    <Link href={"/about#our-story"}>Our Story</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href={"/services"}>Our Services</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href={"#"}>Portfolio</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href={"/careers"}>Careers</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href={"/contact"}>Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">What We Offer</h4>
                <ul className="mt-3 space-y-2 ">
                  <li className="hover:text-gray-500">
                    <Link href="/ai-solutions">Artificial Intelligence</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="/services">Digital Marketing</Link>
                  </li>

                  <li className="hover:text-gray-500">
                    <Link href="/services">Market Identity</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="/services">Design</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="/services">Code & Craft</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Resources</h4>
                <ul className="mt-3 space-y-2 ">
                  <li className="hover:text-gray-500">
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="/news">News & Events</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="/testimonials">Testimonials</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <Link href="">Our Clients</Link>
                  </li>
                  <li className="hover:text-gray-500">
                    <button onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/pdf/horatio.pdf';
                      link.download = 'Horatio-Brochure.pdf'; // desired file name
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>Brochure</button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Social Media</h4>
                <ul className="mt-3 space-y-2 ">
                  <li className="hover:text-gray-500"> <Link href="https://www.facebook.com/people/Horatio/61561898336805/" target="_blank"> Facebook</Link></li>
                  <li className="hover:text-gray-500"> <Link href="https://www.instagram.com/horatio.in?utm_source=qr&igsh=Y3ZkcjRrdTIyOHlh" target="_blank"> Instagram</Link></li>
                  <li className="hover:text-gray-500"> <Link href="https://x.com/HoratioDigital?t=ABBnGn4CDFGYtjyHGlmygw&s=08 " target="_blank"> Twitter</Link></li>
                  <li className="hover:text-gray-500"> <Link href="https://www.linkedin.com/company/horatio-digital-marketing-agency/" target="_blank"> Linkedin</Link></li>
                  <li className="hover:text-gray-500"><Link href="https://www.youtube.com/@Horatio-DigitalMarketingAgency" target="_blank"> Youtube</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-lg font-semibold">Get in Touch</h4>
                <ul className="mt-3 space-y-2 ">
                  <li className="hover:text-gray-500"><Link href="tel:+919562052148"> General: +91 9562052148</Link></li>
                  <li className="hover:text-gray-500"><Link href="tel:+919562052148"> Sales: +91 9562052148</Link></li>
                  <li className="hover:text-gray-500"><Link href="mailto:mail@millionones.in?subject=Millionones%20Inquiry"> Email: mail@millionones.in</Link></li>
                  <li className="hover:text-gray-500"><Link href="tel:+919562052148"> Support: +91 9562052148</Link></li>
                  <li className="hover:text-gray-500"><Link href="tel:+919562052148">WhatsApp (Sales): +91 9562052148</Link></li>
                </ul>
              </div>
            </div>
            <div className="cursor-pointer relative overflow-hidden inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <img ref={imgRef} src="/images/new-logo.svg" style={{ width: "100%" }} alt="" />
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'fixed',
                    zIndex: 99999,
                    top: coords.y,
                    left: coords.x,
                    pointerEvents: 'auto',
                  }}

                >
                  <Link
                    className="submit-btn"
                    style={{ position: "relative", left: "-120px", top: "-35px" }}
                    // onClick={() => router.push("/contact")}
                    href="/contact"
                  >
                    Submit Enquiry
                  </Link>
                </motion.button>
              )}
            </div>
            <div className="footer-line mt-5"></div>
            <div className="footer-end flex flex-col md:flex-row justify-between items-center py-10 ">
              <p className=" text-sm">MILLIONONES © 2025 All rights reserved</p>
              <div className='text-center  text-gray text-sm'>
                <Link href='#' className='hover:text-gray-500'>
                  Privacy Policy
                </Link>{' '}
                |{' '}
                <Link href='#' className='hover:text-gray-500'>
                  Terms & Conditions
                </Link>
              </div>
              {/* <div className="flex space-x-4 mt-3 md:mt-0">
                <a href="#" className="hover:text-gray-300">
                  <img src="/icons/call.svg" alt="Call" className="w-5" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <img src="/icons/mail.svg" alt="Mail" className="w-5" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <img src="/icons/linkedIn.svg" alt="LinkedIn" className="w-5" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <img src="/icons/instagram.svg" alt="Instagram" className="w-5" />
                </a>
              </div> */}
            </div>
          </div>
        </footer>
      </div>
      {!showButton && <MouseTrail />}
    </>
  );
};

export default Footer;
