import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Building2, ShoppingCart } from 'lucide-react'

const RootLayout = () => (
  <div className="min-h-screen bg-background">
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Northwind</span>
          </div>
          <div className="flex gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
            >
              Home
            </Link>
            <Link
              to="/customers"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Customers
            </Link>
            <Link
              to="/orders"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
)

export const Route = createRootRoute({ component: RootLayout })