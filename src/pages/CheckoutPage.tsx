import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary'
import { useAppContext } from '../context/useAppContext'
import type { CheckoutFormData } from '../types'

const initialFormData: CheckoutFormData = {
  customerName: '',
  address: '',
  phone: '',
  paymentMethod: 'Cash on Delivery',
}

function CheckoutPage() {
  const { cart, subtotal, placeOrder } = useAppContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.customerName.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setError('Please fill in all checkout details.')
      return
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    setError('')
    const orderId = placeOrder(formData)
    navigate(`/order-summary/${orderId}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Complete your order</h1>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white">Delivery Details</h2>
          <div className="mt-6 grid gap-4">
            <label className="space-y-2">
              <span className="text-sm text-stone-300">Full Name</span>
              <input
                value={formData.customerName}
                onChange={(event) => setFormData({ ...formData, customerName: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                placeholder="Your full name"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-stone-300">Address</span>
              <textarea
                rows={4}
                value={formData.address}
                onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                placeholder="Street, area, city, pincode"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-stone-300">Phone Number</span>
              <input
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                placeholder="10-digit mobile number"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-stone-300">Payment Method</span>
              <select
                value={formData.paymentMethod}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    paymentMethod: event.target.value as CheckoutFormData['paymentMethod'],
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </label>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-amber-400 px-6 py-4 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            Place Order
          </button>
        </form>

        <OrderSummary items={cart} subtotal={subtotal} />
      </div>
    </div>
  )
}

export default CheckoutPage
