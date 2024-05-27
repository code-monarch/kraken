import type { Metadata } from 'next'
import '../styles/globals.css'
import { raleway } from './fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/redux/provider'

export const metadata: Metadata = {
  title: 'Ummrah cash admin',
  description: 'Ummrah cash admin',
  applicationName: 'ummrah cash admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'relative bg-background box-border w-screen min-h-screen h-fit p-0 m-0',
          `${raleway.variable}`,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
