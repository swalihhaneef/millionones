import React from "react";
import { ChevronRight, Globe, Heart, Coffee, Laptop, Zap, Target, Star } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { API_URL } from "@/config";
import Card from "./_components/Card";
import { Pagination } from "@mui/material";
import { setMetaTitleAndDesc } from "@/helpers/functions";

export const metadata = setMetaTitleAndDesc(
  "Careers at Millionones | Join Our AI & Digital Marketing Team Kerala",
  "Join Millionones, Kerala’s leading AI, digital marketing, web design, and branding agency. Explore career opportunities and grow with a creative, tech-driven team."
);

const getCareers = async ({ page = 1, limit }) => {
  try {
    const response = await fetch(`${API_URL}job-post/web?page=${page}&limit=${limit}`).then((res) => res.json());

    return response.data;
  } catch (error) {
    console.log("Error fetching careers:", error.message);
  }
};

async function Page(props) {
  const { page } = await props.searchParams;

  const limit = 20;

  const benefits = [
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world. We believe great talent shouldn't be limited by location.",
    },
    {
      icon: Heart,
      title: "Comprehensive Healthcare",
      description: "Full medical, dental, and vision coverage for you and your family.",
    },
    {
      icon: Coffee,
      title: "Flexible Hours",
      description: "Work when you're most productive. We focus on results, not schedules.",
    },
    {
      icon: Laptop,
      title: "Latest Equipment",
      description: "Choose your own high-end equipment and software setup.",
    },
    {
      icon: Zap,
      title: "Learning Budget",
      description: "$5,000 annual budget for courses, conferences, and books.",
    },
    {
      icon: Target,
      title: "Career Growth",
      description: "Clear progression paths and regular promotion opportunities.",
    },
  ];

  const data = await getCareers({ page, limit });

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-black text-white min-h-screen flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3')] opacity-20 bg-cover bg-center" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-8">Build the Future</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Join a team of exceptional individuals who are reshaping the technology landscape. We&apos;re not just building products; we&apos;re
                crafting tomorrow&apos;s innovations.
              </p>
              <div className="flex justify-center gap-6">
                <Link
                  href={"#positions"}
                  className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 text-lg">
                  View Positions <ChevronRight size={20} />
                </Link>
                {/* <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 text-lg">
                Learn More
              </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="py-16 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

        {/* Values Section */}
        {/* <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Our Values</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              These principles guide everything we do and shape who we are as a team.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Innovation", desc: "Push boundaries daily" },
              { icon: Code2, title: "Excellence", desc: "Strive for perfection" },
              { icon: Brain, title: "Learning", desc: "Grow continuously" },
              { icon: Database, title: "Impact", desc: "Make a difference" }
            ].map((value, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border-2 border-black hover:bg-black hover:text-white transition-all group">
                <div className="w-16 h-16 rounded-full bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center mb-6 transition-all">
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

        {/* Open Positions */}
        <div id="positions" className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">Join our team of passionate individuals working on cutting-edge technology.</p>
            </div>
            <div className="grid gap-6">
              <Card jobs={data} />

              {/* <div className="!text-white">
                <Pagination count={10} variant="outlined" />
              </div> */}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-black">Why Join Us</h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                We offer more than just a job. Join us for a fulfilling career with great benefits.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group p-8 rounded-2xl transition-all hover:shadow-md">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6 transition-all">
                    <benefit.icon size={32} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer show={true} />
    </>
  );
}
export default Page;
