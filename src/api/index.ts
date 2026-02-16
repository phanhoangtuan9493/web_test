import axios from 'axios'
import {
  type QueryCustomersParams,
  type QueryOrdersParams,
  type QueryResponse,
  type Customer,
  type Order,
  type CustomerDetails,
} from '@/types'

const API_BASE_URL = 'https://uitestapi.occupass.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API Functions
export const queryCustomers = async (
  params: QueryCustomersParams = {}
): Promise<QueryResponse<Customer>> => {
  const response = await apiClient.post<QueryResponse<Customer>>(
    '/query/customers',
    params
  )
  return response.data
}

export const queryOrders = async (
  params: QueryOrdersParams = {}
): Promise<QueryResponse<Order>> => {
  const response = await apiClient.post<QueryResponse<Order>>(
    '/query/orders',
    params
  )
  return response.data
}

export const getCustomerDetails = async (
  id: string
): Promise<CustomerDetails> => {
  const response = await apiClient.get<CustomerDetails>(
    `/customers/${id}`
  )
  return response.data
}
