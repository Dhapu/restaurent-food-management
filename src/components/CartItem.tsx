import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useAppContext } from '../context/useAppContext'
import { formatCurrency } from '../utils/format'
import type { CartItem as CartItemType } from '../types'

interface CartItemProps {
  item: CartItemType
}

function CartItem({ item }: CartItemProps) {
  const { updateCartQuantity, removeFromCart } = useAppContext()

  return (
    <div className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-full rounded-2xl object-cover sm:w-28"
      />

      <div className="flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
            <p className="text-sm text-stone-400">{item.category}</p>
          </div>
          <p className="text-lg font-bold text-amber-300">{formatCurrency(item.price)}</p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
              className="rounded-full border border-white/10 bg-stone-900/80 p-2 text-stone-100 transition hover:border-amber-300/50"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <FiMinus />
            </button>
            <span className="min-w-10 text-center font-semibold text-white">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              className="rounded-full border border-white/10 bg-stone-900/80 p-2 text-stone-100 transition hover:border-amber-300/50"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <FiPlus />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-white">
              Total: {formatCurrency(item.price * item.quantity)}
            </p>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="rounded-full border border-red-400/30 bg-red-400/10 p-2 text-red-200 transition hover:bg-red-400/20"
              aria-label={`Remove ${item.name}`}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
