'use client'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Rocket, Trophy, Building2 } from 'lucide-react'

const Story = () => {
  const sectionRef = useRef(null)

  return (
    <>
      <div className='dark-bg-cta' ref={sectionRef}>
        <div className='cmpad '>
          {/* Our Story Section */}
          <section className='py-5 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              {/* Left Column - Image */}
              <div className='relative'>
                <div className='aspect-[4/3] rounded-2xl overflow-hidden'>
                  <img
                    src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000&fit=crop&sat=-100'
                    alt='Team collaboration'
                    className='w-full h-full object-cover grayscale opacity-90'
                  />
                </div>
                <div className='absolute -bottom-6 -right-6 bg-zinc-900 text-white p-6 rounded-xl border border-zinc-700'>
                  <div className='text-4xl font-bold text-white'>6+</div>
                  <div className='text-sm text-zinc-400'>
                    Years of Excellence
                  </div>
                </div>
              </div>
    
              {/* Right Column - Content */}
              <motion.div
                className='space-y-8'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className='text-sm font-semibold text-white tracking-wide uppercase'>
                    Our Journey
                  </h2>
                  <h3 className='mt-2 text-3xl md:text-4xl font-bold text-white'>
                    Crafting Digital Excellence Since 2019
                  </h3>
                </div>

                <p className='text-lg text-zinc-400'>
                  We began with a vision to transform digital experiences.
                  Today, we're a team of passionate creators, innovators, and
                  problem solvers dedicated to crafting exceptional digital
                  solutions that drive real business results.
                </p>

                <div className='grid grid-cols-2 gap-6'>
                  {[{
                    Icon: Users,
                    title: 'Expert Team',
                    description: 'Talented professionals committed to excellence'
                  }, {
                    Icon: Rocket,
                    title: 'Innovation First',
                    description: 'Pushing boundaries in digital solutions'
                  }, {
                    Icon: Trophy,
                    title: 'Award Winning',
                    description: 'Recognized for our excellence'
                  }, {
                    Icon: Building2,
                    title: 'Global Presence',
                    description: 'Serving clients worldwide'
                  }].map(({ Icon, title, description }, index) => (
                    <motion.div
                      key={index}
                      className='flex items-start space-x-3'
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className='flex-shrink-0'>
                        <Icon className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h4 className='font-semibold text-white'>{title}</h4>
                        <p className='mt-1 text-sm text-zinc-400'>
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className='inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                </motion.button>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Story
