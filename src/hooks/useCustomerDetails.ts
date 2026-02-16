import { useQuery } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { getCustomerDetails } from '@/api'
import { useOrderStore } from '@/store'
import type { Order } from '@/types'

export function useCustomerDetails(customerId: string) {
  const router = useRouter()
  const navigate = useNavigate()
  const { setOrder } = useOrderStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerDetails(customerId),
  })

  const handleOrderClick = (order: Order) => {
    setOrder(order)
    navigate({ to: '/order' })
  }

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

  const handleGoBack = () => {
    router.history.back()
  }

  return {
    // Query data
    data,
    isLoading,
    error,
    customer: data?.customer,
    orders: data?.orders || [],
    
    // Handlers
    handleOrderClick,
    handleGoBack,
    
    // Formatters
    formatDate,
    formatCurrency,
  }
}