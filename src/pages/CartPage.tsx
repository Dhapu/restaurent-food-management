import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { useAppContext } from '../context/useAppContext'

function CartPage() {
  const { cart, subtotal } = useAppContext()

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Your Cart</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Review your selected dishes</h1>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">Your cart is empty</h2>
          <p className="mt-3 text-stone-400">Add some delicious items from the menu to get started.</p>
          <Link
            to="/menu"
            className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-4">
            <OrderSummary items={cart} subtotal={subtotal} />
            <Link
              to="/checkout"
              className="inline-flex w-full justify-center rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
