import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { queryOrders } from '@/api'
import { useOrderStore } from '@/store'
import type { Order } from '@/types'
import { useNavigate } from '@tanstack/react-router'

export function useOrders() {
  const { setOrder } = useOrderStore()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortBy, setSortBy] = useState<string>('id')
  const [sortDesc, setSortDesc] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', page, pageSize, sortBy, sortDesc],
    queryFn: () =>
      queryOrders({
        skip: page * pageSize,
        take: pageSize,
        orderBy: sortDesc ? undefined : sortBy || undefined,
        orderByDesc: sortDesc ? sortBy || undefined : undefined,
      }),
  })

  // Client-side search filter
  const filteredOrders = useMemo(() => {
    if (!data?.results) return []
    if (!searchTerm) return data.results

    const term = searchTerm.toLowerCase()
    return data.results.filter(
      (order) =>
        order.id.toString().includes(term) ||
        order.customerId.toLowerCase().includes(term) ||
        order.shipName.toLowerCase().includes(term) ||
        order.shipCity.toLowerCase().includes(term) ||
        order.shipCountry.toLowerCase().includes(term)
    )
  }, [data, searchTerm])

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc)
    } else {
      setSortBy(field)
      setSortDesc(false)
    }
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

  const handleOrderClick = (order: Order) => {
    setOrder(order)
    navigate({ to: '/order' })
  }

  return {
    // State
    page,
    pageSize,
    sortBy,
    sortDesc,
    searchTerm,
    
    // State setters
    setPage,
    setPageSize,
    setSortBy,
    setSortDesc,
    setSearchTerm,
    
    // Query data
    data,
    isLoading,
    error,
    
    // Computed values
    filteredOrders,
    
    // Handlers
    handleSort,
    handleOrderClick,
  
    // Formatters
    formatDate,
    formatCurrency,
  }
}