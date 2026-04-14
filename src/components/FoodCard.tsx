import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useAppContext } from '../context/useAppContext'
import { formatCurrency } from '../utils/format'
import type { FoodItem } from '../types'

interface FoodCardProps {
  item: FoodItem
}

function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useAppContext()

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-stone-950/75 px-3 py-1 text-xs font-medium text-amber-300">
            {item.category}
          </span>
          {item.featured && (
            <span className="flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-stone-950">
              <FiStar /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            <p className="mt-2 text-sm text-stone-300">{item.description}</p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold text-amber-300">
            {formatCurrency(item.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToCart(item)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default FoodCard
