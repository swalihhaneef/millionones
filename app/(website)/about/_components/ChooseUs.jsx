"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const values = [
  {
    title: "Proven competence",
    description: "With six years of experience, we have helped companies in various industries to achieve remarkable digital changes.",
  },
  {
    title: "Custom- build strategies",
    description: "We create customized digital marketing plans that are fully in line with your unique goals.",
  },
  {
    title: "Creative talent",
    description: "From bold images to compelling content, our design and campaign are designed to capture and convert.",
  },
  {
    title: "Technology-first approach",
    description: "We use the latest digital tools and automation to distribute measurable results and stay in front of the basket.",
  },
  {
    title: "Customer-first mentality",
    description: "Your growth is our priority. Our dedicated team works with you and ensures transparency, stability and results at each stage..",
  },
];

export default function ChooseUs() {
  const [activeIndex, setActiveIndex] = useState(null > null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <h2 className="text-4xl text-center font-bold mb-10">Why Choose Us</h2>
      {/* <h3 className="text-3xl font-semibold mb-8">Values</h3> */}
      <p className="mb-8 max-w-6xl mx-auto text-lg font-medium">
        In Horatio, we not only offer services - we create stories of digital success. Here is the reason why brands choose us
      </p>

      <div className="space-y-4 max-w-6xl mx-auto">
        {values.map((item, index) => (
          <div key={index} className="border-b pb-4">
            <button onClick={() => toggle(index)} className="w-full flex items-center justify-between text-left focus:outline-none">
              <span className="text-xl font-medium">{item.title}</span>
              <span className="ml-2">{activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
