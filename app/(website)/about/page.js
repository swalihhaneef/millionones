import AnimatedText from "@/components/AnimatedText";
import Banner from "@/components/Services/Banner";
import React from "react";
import ClSection from "./_components/ClSection";
import Footer from "@/components/Footer";
import { ArrowRight, Award, Brain, Compass, Cpu, HeartHandshake, Lightbulb, Palette, Rocket, Target, Users } from "lucide-react";
import ChooseUs from "./_components/ChooseUs";
import Clients from "@/components/Clients";
import OurStory from "./_components/OurStory";
import WhoWeAre from "./_components/WhoWeAre";
import { setMetaTitleAndDesc } from "@/helpers/functions";

export const metadata = setMetaTitleAndDesc(
  "About Millionones | AI, Digital Marketing & Web Design Experts Kerala",
  "Learn about Millionones, a Kerala-based agency specializing in AI, digital marketing, branding, web design, and web development. Creativity meets technology."
);

const aboutDetails = [
  {
    id: 1,
    name: "2019 – The Beginning",
    desc: "Started with a passionate team and a few clients.",
  },
  {
    id: 2,
    name: "2020 – Laying the Foundation",
    desc: "Launched our first major campaigns & expanded expertise in web design, SEO, and social media.",
  },
  {
    id: 3,
    name: "2021 – Expanding Digital Presence",
    desc: "6+ Years of Industry Experience & set up an in-house creative studio.",
  },
  {
    id: 4,
    name: "2022 – Recognition & Growth",
    desc: "Became one of Kerala’s top emerging digital agencies, 99% Client Retention Rate",
  },
  {
    id: 5,
    name: " 2023 – Innovation & Diversification",
    desc: "Introduced automation, influencer marketing & digital consulting. 27+ Satisfied clients.",
  },
  {
    id: 6,
    name: "2024 – Scaling New Heights",
    desc: "Expanded across South India, launched training programs & integrated AI-powered analytics.",
  },
  {
    id: 7,
    name: " 2025 – Leading the Digital Future",
    desc: "Now a full-service agency with innovation-first strategies, AI-driven solutions, and a vision to redefine digital excellence.",
  },
];

const About = () => {
  return (
    <>
      <section className=" bg-white">
        <Banner content={"Make Millions Notice"} key={"about"}>
          <p className="mt-20 text-xl/tight md:text-2xl/tight lg:text-3xl/tight">
            As the world evolves and AI takes the spotlight, we embrace its power, blend it with creativity, and walk hand in hand with our clients to
            turn every opportunity into impactful results.
          </p>
        </Banner>
      </section>
      {/* <section className="cmpad bg-black text-white w-full h-screen">
        <div className="pt-24 flex flex-col gap-[1em]">
          <h5 className="text-xl mb-2 font-extralight">Digital Design Partner</h5>
          <div className="max-w-[50rem] text-[5.75em] font-light">
            <AnimatedText text={"We are the partner to trust to impact the future today "} animation={"letters-skew"} className="leading-[120%]" />
          </div>
        </div>
      </section> */}

      {/* <section className=" z-0 h-screen pt-0 pb-0 relative overflow-clip">
        <div className="flex-col w-full h-[400vh] flex relative top-[-100vh]">
          <div className="z-0 w-full h-screen sticky top-0">
            <img className="object-cover object-[50%_50%] w-full h-full" src="images/employees-cr.jpg" />
          </div>
        </div>
      </section> */}

      <section className="bg-[#f6f6f6]">
        {/* Who We Are  */}
        <WhoWeAre />
        {/* Our Story */}
        <OurStory />
      </section>

      {/* Our Vision and Our Mission */}
      <section>
        <div className="py-24 bg-gradient-to-b from-gray-300 to-gray-100 text-gray-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Our Mission */}
              <div className="bg-white  p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-10 bg-gray-400 rounded-full" />
                  <h3 className="font-bold text-2xl">Our Mission</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  In Millionones, our mission is to strengthen businesses by offering innovative and customized digital marketing solutions that improve
                  online presence and produce real, measurable results. We are inspired by a passion for combining creativity with advanced technology
                  and helping brands continuously and safely in the digital world.
                </p>
              </div>
              {/* Our Vision */}
              <div className="bg-white  p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-10 bg-gray-400 rounded-full" />
                  <h3 className="font-bold text-2xl">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  We see Millionones as a global leader in digital marketing and web design who is recognized for creativity, innovation and a
                  customer-first attitude. Our goal is to create a digital place where each brand can unlock its full potential and grow with purpose,
                  impact and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-sm">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gray-200 rounded-full mb-4">
              <Lightbulb className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Our Philosophy</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-[1.15em]">
              In Millionones, we believe that real digital success is the combination of innovation, technology and creativity. We don&apos;t just follow
              the trends - we assume them. Our philosophy lies in going beyond simple and distributing custom strategies designed to meet the unique
              goals of each brand that we work with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovative Technology</h3>
              <p className="text-gray-600 text-[1.1em]">
                Use the power of state -art -art tools and platforms to maximize performance and efficiency.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Knowledge</h3>
              <p className="text-gray-600 text-[1.1em]">
                A passionate team of experienced professionals provides deep industry insights and strategic thinking for each project.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                <Rocket className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unmatched Creativity</h3>
              <p className="text-gray-600 text-[1.1em]">
                From bold ideas to beautiful execution, we make a campaign that bends head and runs the actual result.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-950 w-full">
        <div className="cmpad py-6 px-4 sm:px-6 md:px-10 lg:py-3 lg:px-0">
          <div>
            <h5 className="pt-6 pb-4 font-medium text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white text-center lg:text-left">
              Our Growth Journey
            </h5>
          </div>

          <div className="space-y-10">
            {aboutDetails.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col 2xl:flex-row py-6 gap-6 2xl:gap-5 xl justify-center 2xl:items-center 2xl:py-8 about-item px-2 2xl:pr-5"
                style={{ transformStyle: "preserve-3d" }}>
                {/* Number */}
                <span className="text-xl sm:text-2xl 2xl:text-3xl ml-0 2xl:ml-11 2xl:mr-24 text-white">0{item.id}</span>

                {/* Name + Desc */}
                <div className="flex flex-col 2xl:flex-row w-full justify-between items-start 2xl:items-center gap-4 2xl:gap-11">
                  <h2 className="about-name text-white text-xl sm:text-2xl 2xl:text-[2.6em] font-light min-w-fit transition">{item.name}</h2>

                  <p className="text-sm sm:text-base 2xl:text-[1.3em] text-white font-light w-full 2xl:max-w-[30rem]">{item.desc}</p>
                </div>

                <div className="about-bg white absolute inset-0 -z-10"></div>
              </div>
            ))}

            <p className="text-center 2xl:text-right text-sm sm:text-base 2xl:text-lg text-white font-light mt-6">The journey continues…</p>
          </div>
        </div>
      </section>

      <ChooseUs />

      {/* Founder section */}
      <section className="w-full bg-white mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div className="bg-gray-900 text-white flex flex-col justify-center px-10 py-12">
            <h2 className="text-2xl mb-6">Founder’s Message</h2>
            <p className="leading-tight mb-6 text-lg">
              At Millionones, we believe that true growth goes beyond just numbers. In an era led by AI and constant digital evolution, creativity is what
              sets brands apart—and that’s where we thrive.
              <br />
              <br />
              As the founder of Millionones, my vision has always been clear: make millions notice, not just financially. While revenue keeps a business
              running, creativity keeps it alive. We&apos;re here to build brands with purpose, passion, and powerful storytelling backed by the
              latest technology.
              <br />
              <br />
              From AI solutions to digital marketing, web design, development, and branding, our goal is simple—to craft intelligent, impactful
              strategies that elevate brands and drive real results. Whether you&apos;re just starting out or scaling up, we’re committed to
              delivering solutions that are as innovative as they are effective.
              <br />
              <br />
              <span className="font-semibold">Let’s grow with creativity. Let’s make millions notice.</span>
            </p>
            <div>
              <p className="font-normal text-lg">Sarath C</p>
              <p className="text-sm text-gray-300">Creator & Navigator</p>
            </div>
          </div>
          <div className="w-full h-full">
            <img
              src="/images/founder.jpeg"
              // src="https://d33vw3iu5hs0zi.cloudfront.net/media/about_quote_banner_new_26d102fe1d.jpg"
              alt="Petr Valov"
              className="object-cover w-full h-full rounded-r max-h-[600px]"
            />
          </div>
        </div>
      </section>

      <Clients title="We work with forward-thinking brands we believe in" sub={false} />

      <Footer show={true} />
    </>
  );
};

export default About;
