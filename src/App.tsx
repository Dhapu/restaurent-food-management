import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSummaryPage from './pages/OrderSummaryPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import { useAppContext } from './context/useAppContext'

function AppShell() {
  const location = useLocation()
  const { theme } = useAppContext()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-stone-950 text-stone-100'
          : 'bg-stone-100 text-stone-900'
      }`}
    >
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? 'pt-24' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-summary/:orderId" element={<OrderSummaryPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c1917',
            color: '#f5f5f4',
            border: '1px solid rgba(251, 191, 36, 0.2)',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
