import { useMemo, useState } from 'react'
import FoodCard from '../components/FoodCard'
import { useAppContext } from '../context/useAppContext'
import type { FoodCategory } from '../types'

const categories: Array<FoodCategory | 'All'> = [
  'All',
  'Pizza',
  'Burger',
  'Pasta',
  'Salad',
  'Dessert',
  'Beverage',
  'Starter',
]

function MenuPage() {
  const { foodItems, isBootstrapping } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All')
  const [maxPrice, setMaxPrice] = useState(500)

  const filteredItems = useMemo(
    () =>
      foodItems.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        const matchesPrice = item.price <= maxPrice

        return matchesSearch && matchesCategory && matchesPrice
      }),
    [foodItems, maxPrice, searchTerm, selectedCategory],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Browse Menu</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Find your next favorite dish</h1>
        <p className="mt-4 max-w-2xl text-stone-300">
          Search by dish name, narrow by category, and control your spend with the price filter.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr_0.8fr]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for pizza, pasta, dessert..."
            className="rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as FoodCategory | 'All')}
            className="rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-stone-300">
              <span>Max Price</span>
              <span>Rs. {maxPrice}</span>
            </div>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-3 w-full accent-amber-400"
            />
          </div>
        </div>
      </section>

      {isBootstrapping ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-[2rem] bg-white/10" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">No dishes match your filters</h2>
          <p className="mt-3 text-stone-400">Try a different category, search term, or higher price range.</p>
        </div>
      )}
    </div>
  )
}

export default MenuPage
