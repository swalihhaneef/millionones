"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { get } from "@/helpers/api";
import { BASE_URL } from "@/config";

const RelatedWorks = ({ category }) => {
  const [worksData, setworksData] = useState([])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
      year: "2024",
      link: "/works/detail"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1280",
      year: "2023",
      link: "/works/detail"
    },
    {
      id: 3,
      title: "AI Dashboard",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1280",
      year: "2023",
      link: "/works/detail"
    },
    // {
    //   id: 4,
    //   title: "Healthcare Platform",
    //   category: "Web Development",
    //   image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1280",
    //   year: "2023",
    //   link: "/works/detail"
    // },
    // {
    //   id: 5,
    //   title: "Social Media Dashboard",
    //   category: "UI/UX Design",
    //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1280",
    //   year: "2023",
    //   link: "/works/detail"
    // },
    // {
    //   id: 6,
    //   title: "Analytics Platform",
    //   category: "Web Application",
    //   image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1280",
    //   year: "2024",
    //   link: "/works/detail"
    // }
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getAllworks() {
    get(`works/web?category=${category}&limit=3`).then((res) => {
      setworksData(res.data)
    }).catch((err) => {
    })
  }

  useEffect(() => {
    getAllworks()
  }, [category])


  const [activeTab, setActiveTab] = useState("All");
  const filteredProjects = activeTab === "All" ? projects : projects.filter(project => project.category === activeTab);

  return (
    <main className="container mx-auto px-6 pb-16">
      <h2 style={{ textAlign: "left", fontSize: "1.87rem" }} className="casestudy-h2">Related Works</h2>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {worksData?.map((project, index) => (
            <Link href={project._id} key={project.id} passHref>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                  <img
                    src={`${BASE_URL}/${project.img}`}
                    alt={project?.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">{project?.title}</h3>
                    <p className="text-black/60">{project?.category?.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* <span className="text-black/60">{project.year}</span> */}
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
    </main>
  );
};

export default RelatedWorks;
