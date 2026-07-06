'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { workdata } from '@/app/types/workdata'
import WorkSkeleton from '../../Skeleton/Work'
import { bebasNeue } from '@/app/fonts'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 0,
  cssEase: 'linear',
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
}

const Work = () => {
  const [work, setWork] = useState<workdata[]>([])
  const [loading, setLoding] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setWork(data.WorkData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoding(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section
      id='Team'
      className='relative py-16 md:py-20 lg:py-24 bg-cover bg-center overflow-hidden bg-grey'
    >
      {/* Decorative Background */}
      <div className='absolute inset-0 before:absolute before:w-full before:h-full before:bg-[url("/images/wework/elipse.svg")] before:bg-no-repeat before:bg-center before:opacity-10 after:absolute after:w-1/3 after:h-1/3 after:bg-[url("/images/wework/vector.svg")] after:bg-no-repeat after:top-28 after:-right-12 after:-z-10 after:opacity-10' />

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 md:mb-16'
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-accent-cyan text-sm md:text-base font-bold mb-4 uppercase tracking-wider'
          >
            Unser Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 ${bebasNeue.className}`}
          >
            Die Stärke des Teams
          </motion.h2>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-text-secondary text-lg md:text-xl italic max-w-3xl mx-auto'
          >
            "Die Stärke des Teams ist jedes einzelne Mitglied. Die Stärke eines jeden Mitglieds ist
            das Team."
            <footer className='mt-2 text-base not-italic text-text-primary font-semibold'>
              — Phil Jackson
            </footer>
          </motion.blockquote>
        </motion.div>

        {/* Team Slider */}
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <WorkSkeleton key={i} />)
            : work.map((items, i) => (
                <div key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className='bg-white m-3 py-8 md:py-14 my-10 shadow-xl rounded-3xl relative h-[600px] flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-300'
                  >
                    {/* Image Section */}
                    <div className='relative flex-grow flex items-center justify-center px-4'>
                      <div className='relative'>
                        <Image
                          src={items.imgSrc}
                          alt={items.name || 'Team member'}
                          width={items.width || 182}
                          height={items.height || 182}
                          className={items.className || 'inline-block m-auto group-hover:scale-105 transition-transform duration-300'}
                        />
                        {/* LinkedIn Badge */}
                        <div className='absolute -bottom-2 -right-2 bg-white shadow-lg p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <Icon icon='mdi:linkedin' className='text-accent-cyan text-xl' />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className='px-4 pb-4'>
                      <h6 className='text-xl md:text-2xl text-text-primary font-bold text-center mb-3'>
                        {items.name}
                      </h6>
                      <p className='text-sm md:text-base text-text-secondary font-normal text-center leading-relaxed line-clamp-4'>
                        {items.profession}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  )
}

export default Work
