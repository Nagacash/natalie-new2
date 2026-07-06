'use client'

import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { DisclosurePanel, DisclosureButton, Disclosure } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

interface FAQItem {
  id: number
  question: string
  answer: string
  category?: string
}

const FAQ = () => {
  const t = useTranslations('faq')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const faqData: FAQItem[] = useMemo(() => {
    const items = t.raw('items') as Record<
      string,
      { question: string; answer: string; category: string }
    >
    return Object.values(items).map((item, index) => ({
      id: index + 1,
      ...item,
    }))
  }, [t])

  const [desktopActiveId, setDesktopActiveId] = useState<number>(1)

  const playAudio = () => {
    const audio = new Audio('/sound/click.wav')
    audio.volume = 0.5
    audio.play()
  }

  const categories = useMemo(
    () =>
      Array.from(
        new Set(faqData.map((faq) => faq.category).filter((cat): cat is string => Boolean(cat)))
      ),
    [faqData]
  )

  const filteredFAQs = useMemo(
    () =>
      faqData.filter((faq) => {
        const matchesSearch =
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || faq.category === selectedCategory
        return matchesSearch && matchesCategory
      }),
    [faqData, searchQuery, selectedCategory]
  )

  useEffect(() => {
    if (filteredFAQs.length === 0) return
    setDesktopActiveId((id) =>
      filteredFAQs.some((f) => f.id === id) ? id : filteredFAQs[0].id
    )
  }, [filteredFAQs])

  const desktopActiveFaq =
    filteredFAQs.find((f) => f.id === desktopActiveId) ?? filteredFAQs[0]

  const linkClassName =
    'font-semibold text-accent-cyan transition-colors duration-300 hover:text-accent-cyan/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2'

  return (
    <section
      id='FAQ'
      className='relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-accent-cyan/10 via-light to-accent-cyan-light/10 overflow-hidden'
    >
      <div className='absolute inset-0 bg-[url("/images/faq/swirl.webp")] bg-no-repeat bg-right-bottom opacity-10 -z-0' />

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
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
            className='mb-4 text-sm font-semibold tracking-wide text-accent-cyan md:text-base'
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 ${bebasNeue.className}`}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-text-secondary text-base md:text-lg max-w-3xl mx-auto'
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mb-8 md:mb-12'
        >
          <div className='max-w-3xl mx-auto'>
            <div className='relative mb-6'>
              <Icon
                icon='mdi:magnify'
                className='absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-2xl'
              />
              <input
                type='text'
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='input-field rounded-2xl py-4 pl-12 pr-4 text-lg'
              />
            </div>

            {categories.length > 0 && (
              <div className='flex flex-wrap justify-center gap-3'>
                <button
                  type='button'
                  onClick={() => setSelectedCategory(null)}
                  className={`btn-chip ${selectedCategory === null ? 'btn-chip-active' : 'btn-chip-idle'}`}
                >
                  {t('filterAll')}
                </button>
                {categories.map((category) => (
                  <button
                    type='button'
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn-chip ${selectedCategory === category ? 'btn-chip-active' : 'btn-chip-idle'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className='mx-auto max-w-6xl'>
          {filteredFAQs.length > 0 ? (
            <>
              <div className='hidden gap-10 lg:grid lg:grid-cols-12 lg:items-start'>
                <div className='lg:col-span-5'>
                  <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted'>
                    {t('selectTopic')}
                  </p>
                  <ul
                    className='max-h-[min(70vh,560px)] space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]'
                    role='tablist'
                    aria-label={t('questionsAria')}
                  >
                    {filteredFAQs.map((faq, index) => {
                      const active = faq.id === desktopActiveId
                      return (
                        <li key={faq.id}>
                          <button
                            type='button'
                            role='tab'
                            aria-selected={active}
                            onClick={() => {
                              playAudio()
                              setDesktopActiveId(faq.id)
                            }}
                            className={`flex w-full cursor-pointer rounded-sm border-2 px-4 py-4 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
                              active
                                ? 'border-accent-cyan bg-white shadow-[var(--shadow-card-lift)]'
                                : 'border-border/80 bg-white/60 hover:border-accent-cyan/40 hover:bg-white'
                            }`}
                          >
                            <span className='mr-3 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10 text-sm font-bold text-accent-cyan'>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className='min-w-0 flex-1'>
                              <span className='block font-semibold text-text-primary'>
                                {faq.question}
                              </span>
                              {faq.category ? (
                                <span className='mt-1 inline-block rounded-full bg-grey px-2 py-0.5 text-xs font-medium text-text-secondary'>
                                  {faq.category}
                                </span>
                              ) : null}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className='lg:col-span-7'>
                  {desktopActiveFaq ? (
                    <motion.div
                      key={desktopActiveFaq.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className='rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-card-lift)] md:p-10'
                      role='tabpanel'
                    >
                      <h3 className={`mb-4 text-2xl font-bold text-text-primary md:text-3xl ${bebasNeue.className} text-pretty`}>
                        {desktopActiveFaq.question}
                      </h3>
                      <p className='copy-prose text-base leading-relaxed text-text-secondary md:text-lg'>
                        {desktopActiveFaq.answer}
                      </p>
                      {desktopActiveFaq.id === 1 && (
                        <Link href='/kontakt' className={`mt-6 inline-flex items-center gap-2 ${linkClassName}`}>
                          {t('toContactPage')}
                          <Icon icon='mdi:arrow-right' className='text-lg' aria-hidden />
                        </Link>
                      )}
                    </motion.div>
                  ) : null}
                </div>
              </div>

              <div className='max-w-4xl mx-auto space-y-4 lg:hidden'>
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className='overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl'
                  >
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <DisclosureButton
                            onClick={playAudio}
                            className='flex w-full cursor-pointer items-center justify-between rounded-sm p-6 text-left transition-colors duration-300 hover:bg-grey/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 md:p-8'
                          >
                            <div className='flex flex-grow items-start gap-4'>
                              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10'>
                                <Icon
                                  icon='mdi:help-circle-outline'
                                  className='text-xl text-accent-cyan'
                                  aria-hidden
                                />
                              </div>
                              <div className='min-w-0 flex-grow'>
                                <h3 className='mb-1 pr-6 text-lg font-bold text-text-primary md:text-xl'>
                                  {faq.question}
                                </h3>
                                {faq.category ? (
                                  <span className='inline-block rounded-full bg-grey px-3 py-1 text-xs font-semibold text-text-secondary'>
                                    {faq.category}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 transform items-center justify-center rounded-sm bg-accent-cyan transition-transform duration-300 ${
                                open ? 'rotate-180' : ''
                              }`}
                            >
                              <Icon icon='mdi:chevron-down' className='text-xl text-white' aria-hidden />
                            </div>
                          </DisclosureButton>
                          <DisclosurePanel className='px-6 pb-6 md:px-8 md:pb-8'>
                            <div className='border-t border-border pl-14 pt-4 md:pl-16'>
                              <p className='text-base leading-relaxed text-text-secondary md:text-lg'>
                                {faq.answer}
                              </p>
                              {faq.id === 1 && (
                                <Link
                                  href='/kontakt'
                                  className={`mt-4 inline-flex items-center gap-2 ${linkClassName}`}
                                >
                                  {t('toContactPage')}
                                  <Icon icon='mdi:arrow-right' className='text-lg' aria-hidden />
                                </Link>
                              )}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='rounded-2xl bg-white py-12 text-center shadow-lg'
            >
              <Icon
                icon='mdi:help-circle-outline'
                className='mx-auto mb-4 text-6xl text-text-secondary'
                aria-hidden
              />
              <p className='mb-2 text-lg font-semibold text-text-secondary'>
                {t('noResultsTitle')}
              </p>
              <p className='text-text-muted'>
                {t.rich('noResultsDescription', {
                  contact: (chunks) => (
                    <Link href='/kontakt' className='font-semibold text-accent-cyan hover:underline'>
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-12 md:mt-16 text-center'
        >
          <div className='bg-gradient-to-br from-accent-cyan to-accent-cyan-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
            <div className='relative z-10'>
              <Icon icon='mdi:message-question-outline' className='text-5xl mb-4 mx-auto' />
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${bebasNeue.className}`}>
                {t('ctaTitle')}
              </h3>
              <p className='text-white/90 text-lg mb-6 max-w-2xl mx-auto'>
                {t('ctaDescription')}
              </p>
              <Link href='/kontakt' className='btn-solid-light'>
                {t('ctaButton')}
                <Icon icon='mdi:arrow-right' className='text-xl' />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
