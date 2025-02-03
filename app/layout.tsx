import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
<<<<<<< HEAD
=======
import { cn } from "@/lib/utils"
>>>>>>> temp

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mihovil Rak - GIS & Software Engineer",
  description: "Personal website and portfolio of Mihovil Rak, a GIS Specialist and Software Developer based in Zagreb, Croatia.",
}

<<<<<<< HEAD
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
=======
export default ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {children}
      </body>
>>>>>>> temp
    </html>
  )
}
