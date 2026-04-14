import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiMapPin, FiTruck } from 'react-icons/fi'
import FoodCard from '../components/FoodCard'
import { useAppContext } from '../context/useAppContext'

function HomePage() {
  const { foodItems, isBootstrapping } = useAppContext()
  const featuredItems = foodItems.filter((item) => item.featured).slice(0, 3)

  if (isBootstrapping) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-72 rounded-[2.5rem] bg-white/10" />
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-80 rounded-[2rem] bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-16">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-amber-400/15 via-stone-900/95 to-stone-950 p-8 shadow-2xl shadow-black/30 sm:p-10">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Restaurant Food Management</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Smart dining flow for guests and restaurant teams.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-300">
            Explore chef-crafted dishes, place orders in minutes, and manage your kitchen operations
            from one clean dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Explore Menu
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-amber-300/50"
            >
              Open Admin Panel
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <FiTruck className="text-xl text-amber-300" />
              <p className="mt-3 font-semibold text-white">Fast Delivery</p>
              <p className="mt-2 text-sm text-stone-400">Hot meals delivered with live-ready order tracking.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <FiClock className="text-xl text-amber-300" />
              <p className="mt-3 font-semibold text-white">Kitchen Ready</p>
              <p className="mt-2 text-sm text-stone-400">Streamlined updates from pending to delivered.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <FiMapPin className="text-xl text-amber-300" />
              <p className="mt-3 font-semibold text-white">Citywide Reach</p>
              <p className="mt-2 text-sm text-stone-400">Built for mobile and desktop ordering experiences.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant dining setup"
            className="h-full min-h-[320px] rounded-[2.5rem] border border-white/10 object-cover shadow-2xl shadow-black/30"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Featured Dishes</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Today's kitchen highlights</h2>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-amber-300 transition hover:text-amber-200">
            View full menu
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
