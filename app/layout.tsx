import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'

import './globals.css'

const _notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-noto-sans-sc' })

export const metadata: Metadata = {
  title: 'FutuTrade - Stock Trading Platform',
  description: 'Professional stock trading platform with real-time market data',
}

export const viewport = {
  themeColor: '#141a24',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${_notoSansSC.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
