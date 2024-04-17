import "@/styles/globals.css"

import { MapStoreProvider } from "@/components/providers/map-store-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <section className="relative flex h-screen w-full flex-row">
      <MapStoreProvider>{children}</MapStoreProvider>
    </section>
  )
}
