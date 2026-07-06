export const SITE_URL = 'https://www.nataliezimmermann.de'

export const SOCIAL_SHARE_IMAGE = {
  path: '/images/og/social-share.jpg',
  width: 1200,
  height: 630,
  alt: 'Natalie Zimmermann – Box-Weltmeisterin, Speakerin & Mental Coach in Hamburg',
  type: 'image/jpeg' as const,
}

export const socialShareImageMetadata = {
  url: SOCIAL_SHARE_IMAGE.path,
  width: SOCIAL_SHARE_IMAGE.width,
  height: SOCIAL_SHARE_IMAGE.height,
  alt: SOCIAL_SHARE_IMAGE.alt,
  type: SOCIAL_SHARE_IMAGE.type,
}
