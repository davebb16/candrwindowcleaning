import { createRootRouteWithContext } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar goes here */}
      <Outlet />
      {/* Footer goes here */}
    </div>
  ),
})
