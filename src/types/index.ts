// Types
export interface Customer {
  id: string
  companyName: string
  contactName: string
  contactTitle: string
  address: string
  city: string
  region: string
  postalCode: string
  country: string
  phone: string
  fax: string
}

export interface Order {
  id: number
  customerId: string
  employeeId: number
  orderDate: string
  requiredDate: string
  shippedDate: string
  shipVia: number
  freight: number
  shipName: string
  shipAddress: string
  shipCity: string
  shipRegion: string
  shipPostalCode: string
  shipCountry: string
}

export interface OrderDetail {
  orderId: number
  productId: number
  unitPrice: number
  quantity: number
  discount: number
}

export interface CustomerOrder {
  order: Order
  orderDetails: OrderDetail[]
}

export interface CustomerDetails {
  customer: Customer
  orders: CustomerOrder[]
  responseStatus?: unknown
}

export interface QueryResponse<T> {
  offset: number
  total: number
  results: T[]
  meta?: Record<string, string>
  responseStatus?: unknown
}

export interface QueryParams {
  skip?: number
  take?: number
  orderBy?: string
  orderByDesc?: string
  include?: string
  fields?: string
}

export interface QueryCustomersParams extends QueryParams {
  ids?: string[]
  countryStartsWith?: string
}

export interface QueryOrdersParams extends QueryParams {
  freight?: number
}