import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '경조사 관리',
  description: '경조사 내역을 쉽게 관리하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
