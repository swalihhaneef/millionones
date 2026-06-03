"use client"
import React, { useEffect, useState } from 'react';
import { Brain, Cpu, Database, LineChart, MessageSquare, Shield } from 'lucide-react';
import Link from 'next/link';
import { get } from '@/helpers/api';
import { API_URL } from '@/config';


function AIService() {
  const [data,setData] = useState([])
  const Icons = [Brain,Cpu,LineChart,MessageSquare,Database,Shield]

  useEffect(()=>{
    getAiServices()
  },[])

  const getAiServices = async ()=>{
    let response = await get(`${API_URL}service/web?page=${1}&limit=${100}&type=2`)
    if ( response.success ){
      setData(response.data)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="min-h-screen py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                AI Services
              </h1>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Transforming businesses with cutting-edge artificial intelligence solutions
              </p>
            </div>
            <ul className="ai-ul">
              {data?.length > 0 && data?.map((service, index) => {
                let Icon = Icons[index]
                return (
                  <li
                    key={index}
                    className="bg-white relative rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-center mb-4">
                        {Icon && <Icon className="w-8 h-8 text-indigo-600" />}
                      </div>
                      <h3 className="text-2xl text-center font-semibold text-gray-900 mb-4">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-center flex-grow">
                        {service.description}
                      </p>
                    </div>
                    <Link href={`/ai-solutions/${service.slug}`} className='absolute inset-0 z-10' />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="cmpad py-10">
        <div className="prose" style={{ minWidth: "100%" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<h2>Kochi’s Digital Leap: Transforming Kerala into a Modern Business Hub</h2><p>The world is rapidly evolving into a digital-first economy, and Kerala, with Kochi at its heart, is not far behind. Known for its rich culture and entrepreneurial spirit, Kochi has emerged as a rising hub for technology, digital marketing, and innovation.<p>At <strong>HORATIO</strong>, we have witnessed this transformation first-hand, delivering cutting-edge digital marketing, branding, design, development, and AI solutions to businesses that are shaping the future of Kerala's economy.<h3>Kochi: From Historic Port City to Digital Powerhouse</h3><p>Traditionally known as a bustling port city and commercial capital of Kerala, Kochi has seamlessly blended its heritage with modern aspirations. Today, it is home to:<ul><li>Thriving IT Parks (Infopark, SmartCity)<li>Emerging Startups & Tech Ventures<li>Creative Agencies & Digital Innovators<li>Global business connections through ports & infrastructure</ul><p>This ecosystem has paved the way for a digital revolution, where businesses of all sizes are adopting technology, digital marketing, and AI-driven strategies to stay competitive.<h3>Factors Driving the Digital Revolution in Kochi</h3><ol><li><strong>Rapid Digital Adoption</strong><br>Post-pandemic, businesses realized the importance of a strong digital presence. From local retailers to global exporters, everyone is embracing websites, mobile apps, and e-commerce platforms.<li><strong>Growing Demand for Digital Marketing & Branding</strong><br>With rising competition, businesses are investing in SEO, social media marketing, content creation, and creative branding to build visibility and trust.<li><strong>Innovation in Technology & AI Solutions</strong><br>Companies are leveraging AI for automation, personalization, and data-driven decisions. HORATIO’s AI-driven solutions are helping brands streamline operations and enhance customer experiences.<li><strong>Supportive Infrastructure & Startup Ecosystem</strong><br>Initiatives like Kerala Startup Mission (KSUM) and government policies are encouraging innovation, giving a boost to entrepreneurs and digital service providers.</ol><h3>How HORATIO is Powering Kerala’s Digital Growth</h3><p>At HORATIO, we specialize in empowering businesses through:<ul><li>Digital Marketing Strategies that deliver real results<li>Innovative Branding & Identity Creation<li>UI/UX & Creative Design Services<li>Website, App & Custom Software Development<li>AI Solutions for Marketing & Business Automation</ul><p>Our team in Kochi understands the unique needs of Kerala’s business community, blending global trends with local insights to craft strategies that drive growth.<h3>The Road Ahead: Kochi’s Digital Future</h3><p>The digital era in Kochi is just beginning. With global trade opportunities (Vizhinjam Port), improved infrastructure, and rising digital literacy, the city is poised to become South India’s next big digital and tech hub.<p>As businesses strive to keep up with this fast-paced evolution, the role of expert digital agencies like HORATIO becomes crucial in navigating challenges and leveraging opportunities.<h3>Conclusion: Leading Kerala into the Digital Future</h3><p>The revolution of the digital era in Kochi is more than a trend—it's a movement towards a smarter, more connected, and innovative future.<p>At HORATIO, we are proud to be part of this journey, offering comprehensive digital solutions that help businesses grow, innovate, and thrive in this exciting new era.`,
            }}></div>
        </div>
      </div>
    </>
  );
}

export default AIService;