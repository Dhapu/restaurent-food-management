import { DELIVERY_FEE } from '../utils/constants'
import { formatCurrency } from '../utils/format'
import type { CartItem, Order } from '../types'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  title?: string
  showCustomerDetails?: boolean
  order?: Order
}

function OrderSummary({
  items,
  subtotal,
  title = 'Order Summary',
  showCustomerDetails = false,
  order,
}: OrderSummaryProps) {
  const total = subtotal + DELIVERY_FEE

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-medium text-amber-300">
          {items.length} items
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-medium text-white">
                {item.name} x {item.quantity}
              </p>
              <p className="text-sm text-stone-400">{item.category}</p>
            </div>
            <p className="font-semibold text-stone-200">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between text-stone-300">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-stone-300">
          <span>Delivery Fee</span>
          <span>{formatCurrency(DELIVERY_FEE)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-semibold text-white">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showCustomerDetails && order && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-stone-900/60 p-4 text-sm text-stone-300">
          <p className="font-semibold text-white">{order.customerName}</p>
          <p className="mt-1">{order.address}</p>
          <p className="mt-1">{order.phone}</p>
          <p className="mt-3 text-amber-300">Payment: {order.paymentMethod}</p>
        </div>
      )}
    </section>
  )
}

export default OrderSummary
