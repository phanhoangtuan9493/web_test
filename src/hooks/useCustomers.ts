import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { queryCustomers } from '@/api'

export const useCustomers = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortBy, setSortBy] = useState<string>('')
  const [sortDesc, setSortDesc] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')

  const { data, isLoading, error } = useQuery({
    queryKey: ['customers', page, pageSize, sortBy, sortDesc, countryFilter],
    queryFn: () =>
      queryCustomers({
        skip: page * pageSize,
        take: pageSize,
        orderBy: sortDesc ? undefined : sortBy || undefined,
        orderByDesc: sortDesc ? sortBy || undefined : undefined,
        countryStartsWith: countryFilter !== 'all' ? countryFilter : undefined,
      }),
  })

  // Client-side search filter for company and contact names
  const filteredCustomers = useMemo(() => {
    if (!data?.results) return []
    if (!searchTerm) return data.results

    const term = searchTerm.toLowerCase()
    return data.results.filter(
      (customer) =>
        customer.companyName.toLowerCase().includes(term) ||
        customer.contactName.toLowerCase().includes(term) ||
        customer.city.toLowerCase().includes(term) ||
        customer.country.toLowerCase().includes(term)
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

  // Get unique countries for filter
  const countries = useMemo(() => {
    if (!data?.results) return []
    const uniqueCountries = Array.from(
      new Set(data.results.map((c) => c.country).filter(Boolean))
    )
    return uniqueCountries.sort()
  }, [data])

  return {
    // State
    page,
    pageSize,
    sortBy,
    sortDesc,
    searchTerm,
    countryFilter,
    
    // State setters
    setPage,
    setPageSize,
    setSortBy,
    setSortDesc,
    setSearchTerm,
    setCountryFilter,
    
    // Query data
    data,
    isLoading,
    error,
    
    // Computed values
    filteredCustomers,
    countries,
    
    // Handlers
    handleSort,
  }
}