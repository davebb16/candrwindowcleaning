import { createRootRouteWithContext } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Footer } from '@/components/Footer'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar is per-page (e.g. Hero's own nav on the homepage) */}
      <Outlet />
      <Footer />
    </div>
  ),
})
