export type FoodCategory =
  | 'Pizza'
  | 'Burger'
  | 'Pasta'
  | 'Salad'
  | 'Dessert'
  | 'Beverage'
  | 'Starter'

export interface FoodItem {
  id: string
  name: string
  price: number
  image: string
  category: FoodCategory
  description: string
  featured?: boolean
}

export interface CartItem extends FoodItem {
  quantity: number
}

export type PaymentMethod = 'Cash on Delivery' | 'UPI' | 'Card'

export interface CheckoutFormData {
  customerName: string
  address: string
  phone: string
  paymentMethod: PaymentMethod
}

export type OrderStatus = 'pending' | 'preparing' | 'delivered'

export interface Order {
  id: string
  items: CartItem[]
  customerName: string
  address: string
  phone: string
  paymentMethod: PaymentMethod
  status: OrderStatus
  subtotal: number
  deliveryFee: number
  total: number
  createdAt: string
}
