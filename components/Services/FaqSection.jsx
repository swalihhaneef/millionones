import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={false}
            animate={{
                backgroundColor: isOpen ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.02)",
                // scale: isOpen ? 1.02 : 1,
                // y: isOpen ? -5 : 0
            }}
            // whileHover={{ scale: isOpen ? 1.02 : 1.01 }}
            className={` backdrop-blur-sm border-b border-b-black/10  transition-all duration-300 ${index === 0 ? "" : "mt-6"}`}
        >
            <button
                className="flex w-full justify-between items-center text-left p-6"
                onClick={onClick}
            >
                <span className="text-base md:text-xl font-medium text-black/90 pr-8">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center justify-center w-8 h-8  rounded-full"
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

const FaqSection = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
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
                {data.map((faq, index) => (
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
    )
}

export default FaqSection