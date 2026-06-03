import AIService from "@/components/Aisection/AIService";
import AISlider from "@/components/Aisection/AISlider";
import Footer from "@/components/Footer";
import InsightSection from "@/components/Home/Insight";
import { setMetaTitleAndDesc } from "@/helpers/functions";
import React from "react";

export const metadata = setMetaTitleAndDesc(
  "Horatio AI Solutions | Smart Technology & Business Growth Kerala",
  "Unlock business potential with Horatio’s AI solutions. From intelligent automation to data-driven strategies, we help Kerala businesses innovate and excel."
);

const page = async () => {
  return (
    <>
      <AISlider />
      <AIService />
      <InsightSection />
      <Footer show={true} />
    </>
  );
};

export default page;
