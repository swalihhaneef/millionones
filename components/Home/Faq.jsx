"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive suite of digital solutions including web development, mobile app development, UI/UX design, and digital marketing strategies tailored to your specific needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A typical website might take 4-8 weeks, while more complex applications could take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on your specific requirements. We offer transparent pricing with no hidden fees and can work with various budget ranges while maintaining high quality standards."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, we provide comprehensive post-launch support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support to ensure your solution continues to perform optimally."
  },
  {
    question: "What technologies do you use?",
    answer: "We stay current with the latest technologies including React, Next.js, Node.js, and various cloud services. Our tech stack is chosen based on project requirements to ensure the best possible performance and scalability."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.02)",
        scale: isOpen ? 1.02 : 1,
        y: isOpen ? -5 : 0
      }}
      whileHover={{ scale: isOpen ? 1.02 : 1.01 }}
      className={`rounded-2xl backdrop-blur-sm border border-black/10 shadow-lg transition-all duration-300 ${
        index === 0 ? "" : "mt-6"
      }`}
    >
      <button
        className="flex w-full justify-between items-center text-left p-6"
        onClick={onClick}
      >
        <span className="text-base md:text-xl font-medium text-black/90 pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center w-8 h-8 bg-black/5 rounded-full"
        >
          <ChevronDown className="w-5 h-5 text-black/70" />
        </motion.div>
      </button>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 pb-6"
            >
              <p className="text-black/70 leading-relaxed text-base md:text-lg">
                {answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: "url('/images/artisan_54301_Create_a_clean_white_and_metallic_silver-themed_dfb61f7a-dfd7-4487-bc39-9a6468cc9a41_2.png')",
        //   filter: "brightness(0.95) grayscale(100%)"
        // }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60" />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 2 ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.05)'} 0%, transparent 70%)`,
              left: `${30 + i * 20}%`,
              top: `${20 + i * 25}%`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:py-24 grid grid-cols-1 lg:grid-cols-2 sm:gap-16 items-center">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-2 ">
                  <MessageCircle className="w-12 h-12 text-black" />
                  <Sparkles className="w-8 h-8 text-black/70" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl  font-bold text-black mb-6 leading-tight">
                  Got Questions?
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-black to-black/70 mt-2">
                    We've Got Answers
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-black/70 leading-relaxed">
                  Explore our comprehensive FAQ section to find quick answers to common questions about our services, process, and expertise.
                </p>
              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-black/5 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/5 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Right Side - FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div
            //  className="relative z-10 backdrop-blur-xl bg-white/80 p-8 rounded-2xl border border-black/10 shadow-2xl"
             className="relative z-10 "
            >
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
            
            {/* Decorative Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-black/5 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}