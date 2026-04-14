import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import toast from 'react-hot-toast'
import { initialFoodItems } from '../assets/mockData'
import { ADMIN_EMAIL, ADMIN_PASSWORD, DELIVERY_FEE } from '../utils/constants'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import type { CartItem, CheckoutFormData, FoodItem, Order, OrderStatus } from '../types'

interface AppContextValue {
  foodItems: FoodItem[]
  cart: CartItem[]
  orders: Order[]
  isAdminAuthenticated: boolean
  isBootstrapping: boolean
  theme: 'dark' | 'light'
  cartCount: number
  subtotal: number
  addToCart: (item: FoodItem) => void
  updateCartQuantity: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  placeOrder: (formData: CheckoutFormData) => string
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void
  updateFoodItem: (itemId: string, updates: Omit<FoodItem, 'id'>) => void
  deleteFoodItem: (itemId: string) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  loginAdmin: (email: string, password: string) => boolean
  logoutAdmin: () => void
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const FOOD_STORAGE_KEY = 'restaurant-food-items'
const CART_STORAGE_KEY = 'restaurant-cart'
const ORDER_STORAGE_KEY = 'restaurant-orders'
const AUTH_STORAGE_KEY = 'restaurant-admin-auth'
const THEME_STORAGE_KEY = 'restaurant-theme'

export function AppProvider({ children }: PropsWithChildren) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() =>
    loadFromStorage(FOOD_STORAGE_KEY, initialFoodItems),
  )
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage(CART_STORAGE_KEY, []))
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage(ORDER_STORAGE_KEY, []))
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() =>
    loadFromStorage(AUTH_STORAGE_KEY, false),
  )
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    loadFromStorage(THEME_STORAGE_KEY, 'dark'),
  )
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBootstrapping(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => saveToStorage(FOOD_STORAGE_KEY, foodItems), [foodItems])
  useEffect(() => saveToStorage(CART_STORAGE_KEY, cart), [cart])
  useEffect(() => saveToStorage(ORDER_STORAGE_KEY, orders), [orders])
  useEffect(() => saveToStorage(AUTH_STORAGE_KEY, isAdminAuthenticated), [isAdminAuthenticated])
  useEffect(() => saveToStorage(THEME_STORAGE_KEY, theme), [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

  const addToCart = (item: FoodItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }

      return [...currentCart, { ...item, quantity: 1 }]
    })

    toast.success(`${item.name} added to cart`)
  }

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    )
  }

  const removeFromCart = (itemId: string) => {
    const removedItem = cart.find((item) => item.id === itemId)
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))

    if (removedItem) {
      toast.success(`${removedItem.name} removed from cart`)
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const placeOrder = (formData: CheckoutFormData) => {
    const orderId = `ORD-${Date.now()}`
    const nextOrder: Order = {
      id: orderId,
      items: cart,
      customerName: formData.customerName,
      address: formData.address,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
      status: 'pending',
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      createdAt: new Date().toISOString(),
    }

    // Orders are stored locally so the admin dashboard and summary page stay in sync.
    setOrders((currentOrders) => [nextOrder, ...currentOrders])
    clearCart()
    toast.success('Order placed successfully')

    return orderId
  }

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    setFoodItems((currentItems) => [{ ...item, id: `food-${Date.now()}` }, ...currentItems])
    toast.success('Food item created')
  }

  const updateFoodItem = (itemId: string, updates: Omit<FoodItem, 'id'>) => {
    setFoodItems((currentItems) =>
      currentItems.map((item) => (item.id === itemId ? { ...updates, id: itemId } : item)),
    )
    toast.success('Food item updated')
  }

  const deleteFoodItem = (itemId: string) => {
    const item = foodItems.find((food) => food.id === itemId)
    setFoodItems((currentItems) => currentItems.filter((food) => food.id !== itemId))
    setCart((currentCart) => currentCart.filter((cartItem) => cartItem.id !== itemId))

    if (item) {
      toast.success(`${item.name} deleted`)
    }
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    )
    toast.success(`Order marked as ${status}`)
  }

  const loginAdmin = (email: string, password: string) => {
    const isValid = email === ADMIN_EMAIL && password === ADMIN_PASSWORD

    if (isValid) {
      setIsAdminAuthenticated(true)
      toast.success('Admin login successful')
      return true
    }

    toast.error('Invalid admin credentials')
    return false
  }

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false)
    toast.success('Logged out')
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const value = {
    foodItems,
    cart,
    orders,
    isAdminAuthenticated,
    isBootstrapping,
    theme,
    cartCount,
    subtotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem,
    updateOrderStatus,
    loginAdmin,
    logoutAdmin,
    toggleTheme,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext }
