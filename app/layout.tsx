import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '恋爱时光 - 记录我们的美好回忆',
  description: '记录恋爱过程中的关键时间点和美好事件，上传照片保存珍贵回忆',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
