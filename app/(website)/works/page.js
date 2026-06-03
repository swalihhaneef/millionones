import React from "react";
import Works from "@/components/Works/Works";
import Banner from "@/components/Services/Banner";
import Footer from "@/components/Footer";
import InsightSection from "@/components/Home/Insight";
import { setMetaTitleAndDesc } from "@/helpers/functions";

export const metadata = setMetaTitleAndDesc(
  "Our Work | Horatio Digital Agency Kerala",
  "Explore Horatio’s portfolio of AI, digital marketing, branding, and web development projects. See how we deliver impactful results for businesses."
);

const page = () => {
  let bannerContent = " Over 180+ projects various industries since 2021. Helping visionaries fast-forward progress into the future, today.";
  return (
    <>
      <Banner content={bannerContent} />
      <Works />
      <InsightSection />
      <Footer show={true} />
    </>
  );
};

export default page;
