'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const PLAN_PRICES = [
  { monthly: 19, yearly: 190 },
  { monthly: 29, yearly: 290 },
  { monthly: 59, yearly: 590 },
] as const

const Manage = () => {
  const t = useTranslations('manage')
  const [showBuchungen, setShowBuchungen] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'yearly' | 'monthly'>('yearly')

  const features = Object.values(t.raw('features') as Record<string, string>)
  const plansRaw = Object.values(
    t.raw('plans') as Record<
      string,
      { heading: string; user: string; features: Record<string, string> }
    >
  )

  const plans = plansRaw.map((plan, i) => ({
    heading: plan.heading,
    user: plan.user,
    features: Object.values(plan.features),
    price: PLAN_PRICES[i][selectedCategory],
  }))

  const toggleEnabled = () => {
    setEnabled((prevEnabled) => !prevEnabled)
    setSelectedCategory((prevCategory) =>
      prevCategory === 'yearly' ? 'monthly' : 'yearly'
    )
  }

  return (
    <>
      {showBuchungen && (
        <section id='services-section' className='py-16'>
          <div className='container mx-auto max-w-7xl px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center'
            >
              {t('title')}
            </motion.h2>
            <div className='flex sm:block'>
              <div className='flex flex-col sm:flex-row gap-5 md:justify-evenly mt-20 items-start mx-auto'>
                {features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                    className='flex gap-5 items-center justify-center md:justify-start'
                  >
                    <Image
                      src='/images/manage/right.svg'
                      alt=''
                      width={21}
                      height={14}
                    />
                    <p className='text-lg font-semibold'>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className='mt-6 relative'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='dance-text xl:-ml-80 lg:-ml-80 md:-ml-80 -ml-52 text-center -rotate-[10deg] mb-5'
              >
                {t('trialBanner')}
              </motion.div>
              <Image
                src='/images/manage/toggle.svg'
                alt=''
                width={24}
                height={24}
                className='absolute left-[37%] top-8'
              />
              <div className='flex items-center justify-center'>
                <p className='text-sm font-medium mr-5'>{t('billingYearly')}</p>
                <Switch
                  checked={enabled}
                  onChange={toggleEnabled}
                  className='relative inline-flex h-6 w-11 items-center rounded-full bg-black'
                >
                  <span className='sr-only'>{t('toggleBilling')}</span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Switch>
                <p className='text-sm font-medium ml-5'>{t('billingMonthly')}</p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-14 manage'>
              {plans.map((items, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className='shadow-manage-shadow border border-border text-center p-10 rounded-3xl'
                  key={items.heading}
                >
                  <h5 className='mb-3'>{items.heading}</h5>
                  <p className='text-6xl font-extrabold mb-3'>${items.price}</p>
                  <p className='text-sm font-medium mb-6'>{items.user}</p>
                  <Link href='mailto:info@example.com' className='btn-outline-primary mb-6'>
                    {t('ctaTrial')}
                  </Link>
                  {items.features.map((feature) => (
                    <p className='text-sm font-medium text-darkgrey mb-3' key={feature}>
                      {feature}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Manage
