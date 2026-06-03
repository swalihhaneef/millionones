'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Ourstorysection = () => {
  const foodItems = [
    {
      id: 1,
      name: 'Delicious Burger',
      description: 'A juicy and tasty burger with fresh ingredients.',
      image: '/images/story1.webp'
    },
    {
      id: 2,
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo sauce over freshly made pasta.',
      image: '/images/story1.webp'
    },
    {
      id: 3,
      name: 'Sushi Platter',
      description:
        'A variety of sushi rolls with fresh seafood. This description is longer and should be truncated...',
      image: '/images/story1.webp'
    },
    {
      id: 4,
      name: 'Delicious Burger',
      description: 'A juicy and tasty burger with fresh ingredients.',
      image: '/images/story1.webp'
    },
    {
      id: 5,
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo sauce over freshly made pasta.',
      image: '/images/story1.webp'
    },
    {
      id: 6,
      name: 'Sushi Platter',
      description: 'A variety of sushi rolls with fresh seafood.',
      image: '/images/story1.webp'
    }
  ]

  return (
    <motion.div
      className="cmpad"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      <div className="px-10 py-3">
        <h2 className="casestudy-h2">Case Studies</h2>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map(food => (
              <motion.div
                key={food.id}
                className="bg-white rounded-lg overflow-hidden h-96 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{food.name}</h2>
                  <p className="text-gray-600 line-clamp-2 overflow-hidden text-ellipsis h-12">
                    {food.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="all-story-button">View All Works</button>
        </div>
      </div>
    </motion.div>
  )
}

export default Ourstorysection
