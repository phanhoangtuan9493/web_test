import { useQuery } from '@tanstack/react-query'
import { useOrderStore } from '@/store'
import { getCustomerDetails } from '@/api'
import { useRouter } from '@tanstack/react-router'

export function useOrderDetails() {
  const { order } = useOrderStore()
  const router = useRouter()

  // Fetch customer details if we have the order
  const { data: customerData, isLoading: customerLoading } = useQuery({
    queryKey: ['customer', order?.customerId],
    queryFn: () => getCustomerDetails(order!.customerId),
    enabled: !!order?.customerId,
  })

  const isLoading = customerLoading

  const formatDate = (dateStr: string) => { 
    if (!dateStr) return 'N/A'
    try {
      // Handle ServiceStack date format: /Date(timestamp)/
      const match = dateStr.match(/\/Date\((\d+)/)
      if (match) {
        const timestamp = parseInt(match[1])
        return new Date(timestamp).toLocaleDateString()
      }
      return new Date(dateStr).toLocaleDateString()
    } catch {
      return dateStr
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const orderDetails = customerData?.orders.find((o) => o.order.id === order?.id)?.orderDetails || []

  const calculateTotal = () => {
    return orderDetails.reduce((sum, detail) => {
      return sum + detail.unitPrice * detail.quantity * (1 - detail.discount)
    }, 0)
  }

  const handleGoBack = () => {
    router.history.back()
  }

  return {
    // Store data
    order,
    
    // Query data
    customerData,
    isLoading,
    
    // Computed values
    orderDetails,

    // Handlers
    handleGoBack,
    
    // Functions
    formatDate,
    formatCurrency,
    calculateTotal,
  }
}