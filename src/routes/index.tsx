import { createFileRoute, Link } from '@tanstack/react-router'
import { Building2, ShoppingCart, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components'

function RouteComponent() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Northwind Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your customers and orders with ease. Browse, filter, and sort through your business data.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
        <Link to="/customers" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Customers</CardTitle>
                  <CardDescription>View and manage customer information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Browse through all customers, search by name or country, and view detailed information including order history.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                View Customers
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/orders" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Orders</CardTitle>
                  <CardDescription>Track and review all orders</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access complete order information, filter by various criteria, and sort by date, freight, or destination.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                View Orders
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
})
