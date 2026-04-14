import { Link, Navigate, useParams } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import OrderSummary from '../components/OrderSummary'
import { useAppContext } from '../context/useAppContext'
import { formatDateTime } from '../utils/format'

function OrderSummaryPage() {
  const { orderId } = useParams()
  const { orders } = useAppContext()
  const order = orders.find((currentOrder) => currentOrder.id === orderId)

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
        <FiCheckCircle className="mx-auto text-5xl text-emerald-300" />
        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-emerald-200">Order Confirmed</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Thanks, your meal is on the way.</h1>
        <p className="mt-4 text-stone-200">
          Order ID: <span className="font-semibold text-white">{order.id}</span> • Placed on{' '}
          {formatDateTime(order.createdAt)}
        </p>
      </section>

      <div className="mt-8">
        <OrderSummary
          items={order.items}
          subtotal={order.subtotal}
          order={order}
          showCustomerDetails
          title="Confirmed Order Details"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/menu"
          className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          Order More Food
        </Link>
        <Link
          to="/"
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-amber-300/40"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default OrderSummaryPage
