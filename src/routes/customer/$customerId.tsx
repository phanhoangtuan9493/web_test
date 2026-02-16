import { createFileRoute, Link } from '@tanstack/react-router'
import { useCustomerDetails } from '@/hooks/useCustomerDetails'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Separator,
  Spinner,
} from '@/components'
import { ArrowLeft, Building2, Mail, Phone, MapPin, Package, Eye } from 'lucide-react'

function CustomerPage() {
  const { customerId } = Route.useParams()
  const {
    data,
    isLoading,
    error,
    customer,
    orders,
    handleOrderClick,
    handleGoBack,
    formatDate,
    formatCurrency,
  } = useCustomerDetails(customerId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent>
            <Spinner className="h-12 w-full animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <Link to="/customers">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>
        </Link>
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-destructive">
              Error loading customer details. Please try again.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!customer) {
    return null
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to previous page
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{customer.companyName}</h1>
        <p className="text-muted-foreground">Customer ID: {customer.id}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Contact Person</div>
              <div className="text-base">{customer.contactName}</div>
              <div className="text-sm text-muted-foreground">{customer.contactTitle}</div>
            </div>

            <Separator />

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div className="text-base">{customer.address}</div>
                <div className="text-sm">
                  {customer.city}
                  {customer.region && `, ${customer.region}`} {customer.postalCode}
                </div>
                <div className="text-sm font-medium">{customer.country}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Phone</div>
                  <div className="text-base">{customer.phone}</div>
                </div>
              </div>
              {customer.fax && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Fax</div>
                    <div className="text-base">{customer.fax}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{orders.length}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold">
                    {orders.reduce((sum, o) => sum + o.orderDetails.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Items</div>
                </div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.order.freight, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Freight</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            {orders.length === 0
              ? 'No orders found for this customer'
              : `${orders.length} order${orders.length !== 1 ? 's' : ''} on record`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Ship Name</TableHead>
                    <TableHead>Ship City</TableHead>
                    <TableHead>Freight</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(({ order, orderDetails }) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>{order.shipName}</TableCell>
                      <TableCell>{order.shipCity}</TableCell>
                      <TableCell>{formatCurrency(order.freight)}</TableCell>
                      <TableCell>{orderDetails.length}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOrderClick(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/customer/$customerId')({
  component: CustomerPage,
})
