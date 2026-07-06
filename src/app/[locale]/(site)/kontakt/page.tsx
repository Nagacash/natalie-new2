'use client'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Icon } from '@iconify/react'
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_E164, WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from '@/app/data/contact'
import { bebasNeue } from '@/app/fonts'

const KontaktPage = () => {
  const t = useTranslations('kontakt')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = useMemo(
    () => [
      {
        icon: 'mdi:email-outline',
        label: t('labels.email'),
        value: 'info@nataliezimmermann.de',
        href: 'mailto:info@nataliezimmermann.de',
      },
      {
        icon: 'mdi:phone-outline',
        label: t('labels.phone'),
        value: STUDIO_PHONE_DISPLAY,
        href: `tel:${STUDIO_PHONE_E164}`,
      },
      {
        icon: 'mdi:whatsapp',
        label: t('labels.whatsapp'),
        value: WHATSAPP_NUMBER_DISPLAY,
        href: WHATSAPP_URL,
      },
      {
        icon: 'mdi:map-marker-outline',
        label: t('labels.address'),
        value: 'Rothenbaumchaussee 156, 20149 Hamburg',
        href: 'https://maps.google.com/?q=Rothenbaumchaussee+156,+20149+Hamburg',
      },
    ],
    [t],
  )

  const socialLinks = useMemo(
    () => [
      {
        icon: 'mdi:facebook',
        href: 'https://www.facebook.com/natalie.zimmermann.94',
        label: t('social.0'),
      },
      {
        icon: 'mdi:instagram',
        href: 'https://www.instagram.com/nataliezimmermann_ger/',
        label: t('social.1'),
      },
      {
        icon: 'mdi:tiktok',
        href: 'https://tiktok.com/@nataliezimmermann',
        label: t('social.2'),
      },
    ],
    [t],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(`${t('emailSubjectPrefix')} ${formData.name}`)
    const body = encodeURIComponent(
      `${t('fields.name')}: ${formData.name}\n${t('fields.email')}: ${formData.email}\n${t('fields.phone')}: ${formData.phone}\n\n${t('fields.message')}:\n${formData.message}`,
    )

    window.location.href = `mailto:info@nataliezimmermann.de?subject=${subject}&body=${body}`

    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-light">
      <section className="relative bg-gradient-to-br from-accent-cyan/10 via-light to-accent-cyan-light/10 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-accent-cyan text-sm md:text-base font-bold mb-4 uppercase tracking-wider"
            >
              {t('eyebrow')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 ${bebasNeue.className}`}
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className={`text-3xl md:text-4xl font-bold text-text-primary mb-6 ${bebasNeue.className}`}>
                  {t('infoHeading')}
                </h2>
                <p className="text-text-secondary mb-8 text-lg">
                  {t('infoDescription')}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-grey rounded-2xl hover:bg-accent-cyan/10 transition duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-cyan rounded-xl flex items-center justify-center group-hover:bg-accent-cyan/80 transition-colors duration-300">
                      <Icon icon={info.icon} className="text-white text-2xl" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-text-secondary mb-1 uppercase tracking-wide">
                        {info.label}
                      </p>
                      <p className='text-base sm:text-lg font-medium text-text-primary group-hover:text-accent-cyan transition-colors duration-300 break-words'>
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-8 border-t border-border"
              >
                <h3 className={`text-2xl font-bold text-text-primary mb-4 ${bebasNeue.className}`}>
                  {t('followUs')}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-icon-filled"
                      aria-label={social.label}
                    >
                      <Icon icon={social.icon} className="text-white text-xl" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-8"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/hero/lind3.webp"
                    alt={t('locationImageAlt')}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">{t('locationStudio')}</p>
                      <p className="text-white/90">{t('locationArea')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-grey rounded-3xl p-8 md:p-10 shadow-xl">
                <h2 className={`text-3xl md:text-4xl font-bold text-text-primary mb-2 ${bebasNeue.className}`}>
                  {t('formHeading')}
                </h2>
                <p className="text-text-secondary mb-8">
                  {t('formDescription')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                      {t('fields.name')} <span className="text-accent-cyan">{t('fields.required')}</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t('placeholders.name')}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                      {t('fields.email')} <span className="text-accent-cyan">{t('fields.required')}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t('placeholders.email')}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-2">
                      {t('fields.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder={t('placeholders.phone')}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                      {t('fields.message')} <span className="text-accent-cyan">{t('fields.required')}</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="input-field resize-none"
                      placeholder={t('placeholders.message')}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Icon icon="mdi:loading" className="animate-spin text-xl" />
                          {t('submitting')}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {t('submit')}
                          <Icon icon="mdi:send" className="text-xl" />
                        </span>
                      )}
                    </button>
                  </motion.div>

                  <p className="text-sm text-text-muted text-center">
                    {t('requiredFieldsNote')}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-black py-10 md:py-14 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-5xl"
          >
            <Image
              src="/images/new/sponsor.jpg"
              alt={t('sponsorImageAlt')}
              width={1169}
              height={708}
              className="h-auto w-full rounded-sm"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default KontaktPage
