'use client';
import React, { useState,useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '@/helpers/api';
import { API_URL ,BASE_URL} from '@/config';
import Link from 'next/link';

const Works = () => {
  const [activeTab, setActiveTab] = useState("67f69930a1acc8aa653de43d");
  const [category, setcategory] = useState([])

  const [worksData, setworksData] = useState([])

  const categories = ['All Categories','Digital Marketing', 'Development', 'Branding', 'Experience Design'];

  const projects = [
    {
      id: 1,
      client: "Dar Global",
      title: "E-Commerce Platform",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
      year: "2024"
    },
    {
      id: 2,
      client: "Dar Global",
      title: "Mobile Banking App",
      category: "Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1280",
      year: "2023"
    },
    {
      id: 3,
      client: "Dar Global",
      title: "AI Dashboard",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1280",
      year: "2023"
    },
    {
      id: 4,
      client: "Dar Global",
      title: "Healthcare Platform",
      category: "Experience Design",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1280",
      year: "2023"
    },
    {
      id: 5,
      client: "Dar Global",
      title: "Social Media Dashboard",
      category: "Experience Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1280",
      year: "2023"
    },
    {
      id: 6,
      client: "Dar Global",
      title: "Analytics Platform",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1280",
      year: "2024"
    }
  ];

  const filteredProjects = activeTab === 'All Categories'
    ? projects
    : projects.filter(project => project.category === activeTab);



  function getAllworks(){
    get(`works/web?category=${activeTab}`).then((res)=>{
      setworksData(res.data)
    }).catch((err)=>{
    })
  }

  useEffect(() => {
    getAllworks()
  }, [activeTab])

  useEffect(() => {
   fetchCategory()
  }, [])
  

   const fetchCategory = () => {
    get(`common/category?type=works`).then((res) => {
      setcategory(res.data)
    })
  }
  


  return (
    <div style={{ backgroundColor: '#f6f6f6' }} className="min-h-screen  text-black selection:bg-black selection:text-white py-20">

    
      <div className="flex flex-wrap justify-between gap-4 px-4 sm:px-8 md:px-32 py-12 w-full">
        {category.map((cat, index) => (
          <div key={cat.value} style={{ opacity: 1, filter: 'blur(0px)' }}>
            <button className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
               ${activeTab == cat.value ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} sm:h-12 px-4 py-2 rounded-full h-7`}
               onClick={()=>setActiveTab(cat.value)}>
              {cat.label}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 w-full px-4 sm:px-8 md:px-32">
        {worksData?.map((item, i) => (
          <div key={i} style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
            <div className="rounded-xl border bg-card text-card-foreground overflow-hidden border-none shadow-none -mt-8 md:-mb-16">
              <div className="p-0 flex flex-col justify-between">
                <hr className="border-t border-gray-300 my-8" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-[#000] font-bold thin-heading mb-2">CLIENT</p>
                    <p className="text-base font-light thin-heading">{item.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#000] font-bold thin-heading mb-2">CATEGORY</p>
                    <p className="text-base font-light thin-heading w-[150px] sm:w-[190px]">{item.category.name}</p>
                  </div>
                </div>
                <Link href={`/works/${item._id}`}>
                  <div className="image-container h-64 relative overflow-hidden mt-8" style={{ opacity: 1, filter: 'blur(0px)' }}>
                    <img
                      alt={item.title}
                      loading="eager"
                      width="600"
                      height="300"
                      decoding="async"
                      data-nimg="1"
                      className="w-full h-full object-cover mobile-animation"
                      srcSet={`${BASE_URL}/${item.img}, ${BASE_URL}/${item.img}`}
                      src={`${BASE_URL}/${item.img}`}
                      style={{ color: 'transparent' }}
                    />
                  </div>
                </Link>
                <div className="py-7 w-[80%]">
                  <Link href={item.caseLink ? item.caseLink : ''}>
                    <h3 className="text-2xl font-extralight opacity-80 thin-heading mb-4">{item.title}</h3>
                  </Link>
                  <Link href={`/works/${item._id}`}>
                    <div >
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground sm:h-12 p-0 font-semibold group hover:bg-white">
                        READ MORE
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;