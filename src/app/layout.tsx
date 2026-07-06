import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#37BEF0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
