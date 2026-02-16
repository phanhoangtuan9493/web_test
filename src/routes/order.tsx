import { createFileRoute, Link } from '@tanstack/react-router'
import { useOrderDetails } from '@/hooks'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Separator,
  Spinner,
} from '@/components'
import { ArrowLeft, Package, Truck, MapPin, Calendar, DollarSign, User } from 'lucide-react'

function OrderPage() {
  const {
    order,
    customerData,
    isLoading,
    orderDetails,
    formatDate,
    formatCurrency,
    calculateTotal,
    handleGoBack,
  } = useOrderDetails()

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

  if (!customerData) {
    return (
      <div className="space-y-6">
        <Link to="/orders">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-destructive">
              Error loading order details. Please try again.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to previous page
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order #{order?.id}</h1>
        <p className="text-muted-foreground">Order placed on {formatDate(order?.orderDate || '')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Order ID</div>
                <div className="text-base font-semibold">{order?.id}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Employee ID</div>
                <div className="text-base">{order?.employeeId}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground">Order Date</div>
                  <div className="text-base">{formatDate(order?.orderDate || '')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground">Required Date</div>
                  <div className="text-base">{formatDate(order?.requiredDate || '')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground">Shipped Date</div>
                  <div className="text-base">{formatDate(order?.shippedDate || '')}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-2">
              <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground">Freight Cost</div>
                <div className="text-xl font-bold text-primary">{formatCurrency(order?.freight || 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Ship Name</div>
              <div className="text-base font-semibold">{order?.shipName}</div>
            </div>

            <Separator />

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Shipping Address</div>
                <div className="text-base">{order?.shipAddress}</div>
                <div className="text-sm">
                  {order?.shipCity}
                  {order?.shipRegion && `, ${order?.shipRegion}`} {order?.shipPostalCode}
                </div>
                <div className="text-sm font-medium">{order?.shipCountry}</div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-medium text-muted-foreground">Ship Via</div>
              <div className="text-base">Shipper #{order?.shipVia || 'N/A'}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      {customerData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Customer ID</div>
                  <Link
                    to="/customer/$customerId"
                    params={{ customerId: customerData.customer.id }}
                    className="text-base font-semibold text-primary hover:underline"
                  >
                    {customerData.customer.id}
                  </Link>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Company Name</div>
                  <div className="text-base">{customerData.customer.companyName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Contact Person</div>
                  <div className="text-base">{customerData.customer.contactName}</div>
                  <div className="text-sm text-muted-foreground">{customerData.customer.contactTitle}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Phone</div>
                  <div className="text-base">{customerData.customer.phone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="text-base">
                    {customerData.customer.city}, {customerData.customer.country}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      {orderDetails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>{orderDetails.length} item(s) in this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex-1">
                    <div className="font-medium">Product ID: {detail.productId}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {detail.quantity} × {formatCurrency(detail.unitPrice)}
                      {detail.discount > 0 && (
                        <span className="ml-2 text-destructive">
                          ({(detail.discount * 100).toFixed(0)}% discount)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(detail.unitPrice * detail.quantity * (1 - detail.discount))}
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div className="font-semibold text-lg">Subtotal</div>
                <div className="font-bold text-xl text-primary">{formatCurrency(calculateTotal())}</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold text-lg">Freight</div>
                <div className="font-bold text-xl">{formatCurrency(order?.freight || 0)}</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="font-semibold text-xl">Total</div>
                <div className="font-bold text-2xl">
                  {formatCurrency(calculateTotal() + (order?.freight || 0))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export const Route = createFileRoute('/order')({
  component: OrderPage,
})
