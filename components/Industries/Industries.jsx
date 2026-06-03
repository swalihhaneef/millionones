"use client"
import React, { useEffect, useState } from 'react';
import { Code2, Brain, Shield, Target, Building2, BarChart as ChartBar, Globe2, Rocket, Users2, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';
import IndustryDrawer from './IndustryDrawer';
import Link from 'next/link';
import { API_URL } from '@/config';
import { get } from '@/helpers/api';

function IndustryCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all group">
      <Icon className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
const Industries = () => {

  const [industries,setIndustries] = useState([])

  useEffect(()=>{
    getIndustries()
  },[])

  const getIndustries = async() => {
    let response = await get(`${API_URL}industries/web?page=${1}&limit=${100}`)

    if ( response.success ) {

      let data = response.data
      setIndustries(data)
    }
  }

  const icons = [Brain,Code2,Shield,Building2,ChartBar,Globe2]
  // const industries = [
  //   {
  //     icon: Brain,
  //     title: "Artificial Intelligence",
  //     slug: 'artificial-intelligence',
  //     description: "Leveraging cutting-edge AI and machine learning technologies to automate processes, enhance decision-making, and drive innovation across industries."
  //   },
  //   {
  //     icon: Code2,
  //     title: "Software Development",
  //     slug: 'software-development',
  //     description: "Creating robust, scalable applications using modern technologies and best practices. From web apps to enterprise solutions, we deliver quality software."
  //   },
  //   {
  //     icon: Shield,
  //     title: "Cybersecurity",
  //     slug: 'cybersecurity',
  //     description: "Implementing comprehensive security solutions to protect your digital assets. Including threat detection, prevention, and incident response."
  //   },
  //   {
  //     icon: Building2,
  //     title: "Enterprise Solutions",
  //     slug: 'enterprise-solutions',
  //     description: "Tailored enterprise-grade solutions that streamline operations, improve efficiency, and drive digital transformation."
  //   },
  //   {
  //     icon: ChartBar,
  //     title: "Data Analytics",
  //     slug: 'data-analytics',
  //     description: "Transform raw data into actionable insights. Our analytics solutions help businesses make data-driven decisions."
  //   },
  //   {
  //     icon: Globe2,
  //     title: "Digital Transformation",
  //     slug: 'digital-transformation',
  //     description: "Guide organizations through digital evolution with strategic planning, implementation, and change management."
  //   }
  // ];

  const achievements = [
    { number: "500+", label: "Successful Projects" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Countries Served" },
    { number: "15+", label: "Years Experience" }
  ];

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedIndustry(null), 300);
  };

  
  return (
    <>
      <div className="w-full h-[120px]"></div>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-cover bg-center" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")'
        }}>
          <div className="absolute inset-0 bg-black/80">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl text-white">
                <h1 className="text-3xl md:text-6xl font-bold mb-6">Transforming Industries Through Technology</h1>
                <p className="text-xl mb-8 leading-relaxed">
                  We deliver innovative solutions that drive digital transformation across diverse industry sectors.
                  Our expertise spans from AI and cybersecurity to enterprise software development.
                </p>
                {/* <div className="flex space-x-4">
                <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                  Get Started <ArrowRight className="ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {achievements.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Industries Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Industry Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We specialize in delivering cutting-edge solutions across multiple industries,
              helping businesses stay ahead in the digital age.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              let Icon = icons[index]
              return (
                // <IndustryCard key={index} {...industry} />
                // <Link href='/'>
                  <Link href={`/industries/${industry.slug}`} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all group" key={index}>
                    <Icon className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3">{industry.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{industry.desc}</p>
                  </Link>
                // </Link>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Our Process</h2>
              <div className="space-y-12">
                <ProcessStep
                  number="1"
                  title="Discovery & Planning"
                  description="We begin by understanding your business needs, challenges, and objectives through detailed consultation and analysis."
                />
                <ProcessStep
                  number="2"
                  title="Solution Design"
                  description="Our experts design a comprehensive solution tailored to your specific requirements, incorporating best practices and innovative technologies."
                />
                <ProcessStep
                  number="3"
                  title="Development & Implementation"
                  description="We develop and implement the solution using agile methodologies, ensuring regular updates and feedback integration."
                />
                <ProcessStep
                  number="4"
                  title="Testing & Deployment"
                  description="Rigorous testing and quality assurance processes ensure your solution meets the highest standards before deployment."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Partner with us for unparalleled expertise and commitment to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Trophy className="w-12 h-12 text-black mb-4" />
              <h3 className="text-xl font-bold mb-3">Industry Leadership</h3>
              <p className="text-gray-600">Recognized expertise in delivering innovative technology solutions across sectors.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users2 className="w-12 h-12 text-black mb-4" />
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-gray-600">Highly skilled professionals with deep industry knowledge and technical expertise.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <CheckCircle2 className="w-12 h-12 text-black mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-gray-600">Successful delivery of complex projects across multiple industries globally.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Let's discuss how our industry-specific solutions can help you achieve your business goals
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Schedule a Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
      <IndustryDrawer
        industry={selectedIndustry}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default Industries;
