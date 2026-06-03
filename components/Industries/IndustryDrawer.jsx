"use client"

import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { destroyLenis, getLenis, initLenis } from '@/hooks/useLenis';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { get } from '@/helpers/api';
import Link from 'next/link';
import { BASE_URL } from '@/config';

const IndustryDrawer = ({ industry, isOpen, onClose }) => {

    const [dragPosition, setDragPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const drawerRef = useRef(null);
    const [worksData, setworksData] = useState([])
    const containerRef = useRef(null);
    const [currentScroll,setCurrentScroll] = useState(0)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.6, 0.7, 0.9, 1]);
    const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });


    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const deltaY = e.clientY - startY;
        const newPosition = Math.max(0, Math.min(400, deltaY));
        setDragPosition(newPosition);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;

        setIsDragging(false);

        // If dragged down more than 150px, close the drawer
        if (dragPosition > 150) {
            onClose();
        }

        // Reset position
        setDragPosition(0);
    };

    useEffect(() => {
        // Prevent background scroll when drawer is open
        if (isOpen) {
            document.documentElement.classList.add('modal-open');
            document.body.classList.add('modal-open');
            const lenis = getLenis()
            setCurrentScroll(lenis.scroll);
            destroyLenis();
            getAllworks()
        } else {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
            initLenis();
            window.scrollTo(0, currentScroll);
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
            initLenis();
        };
    }, [isOpen]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, startY, dragPosition]);

    // Reset drag position when drawer opens/closes
    useEffect(() => {
        if (!isOpen) {
            setDragPosition(0);
        }
    }, [isOpen]);

    if (!industry) return null;

    function getAllworks() {
        get(`works/web?limit=3`).then((res) => {
            setworksData(res.data)
        }).catch((err) => {
        })
    }


    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                style={{ zIndex: 999 }}
            />
            <div
                ref={drawerRef}
                className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl transform transition-transform duration-300 ease-out  ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{
                    height: '95vh',
                    zIndex: 999,
                    transform: isOpen ? `translateY(${dragPosition}px)` : 'translateY(100%)',
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}>
                <div className="w-full py-4 cursor-grab active:cursor-grabbing flex justify-between px-6" onMouseDown={handleMouseDown}>
                    <div></div>
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto hover:bg-gray-400 transition-colors duration-200"></div>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="h-full flex flex-col pb-7">
                    <motion.div style={{ scale: smoothScale }} className="flex-1 overflow-y-auto sm:p-6">
                        <div className="container mx-auto py-4 sm:pt-14 sm:pb-10 flex-1 overflow-y-auto">
                            <div className='pb-4 text-center'>
                                <h1 className='text-4xl sm:text-5xl lg:text-7xl'>{industry.title}</h1>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }} className='py-6 '>
                                <img className='rounded-xl' src="/images/home-service2.jpg" alt="" />
                            </motion.div>
                            <div className='py-4 text-center'>
                                <p className='sm:text-2xl md:text-3xl lg:text-5xl font-light leading-snug'>{industry.description}</p>
                            </div>
                        </div>
                        <div className='pb-8 px-4'>
                            <h2 className="casestudy-h2">Case Studies</h2>
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {worksData?.map((project, index) => (
                                        <Link href={`/works/${project._id}`} key={project._id} passHref>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="group cursor-pointer"
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                                                    <img
                                                        src={`${BASE_URL}/${project?.img}`}
                                                        alt={project?.title}
                                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-2 text-black">{project.title}</h3>
                                                        <p className="text-black/60">{project?.category?.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-black/60">{project?.year}</span>
                                                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center transition-colors group-hover:bg-black group-hover:text-white">
                                                            <ArrowUpRight className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                </div >
            </div >
        </>
    );
};

export default IndustryDrawer;