import { NavLink } from 'react-router-dom'
import { FiMoon, FiShoppingBag, FiSun } from 'react-icons/fi'
import { useAppContext } from '../context/useAppContext'

function Navbar() {
  const { cartCount, theme, toggleTheme } = useAppContext()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition hover:text-amber-300 ${isActive ? 'text-amber-300' : 'text-stone-300'}`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 text-lg font-bold text-amber-300">
            FF
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Flame & Fork</p>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-400">Kitchen Studio</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
          <NavLink to="/admin/login" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-stone-200 transition hover:border-amber-300/50 hover:text-amber-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <NavLink
            to="/cart"
            className="relative rounded-full border border-white/10 bg-white/5 p-3 text-stone-100 transition hover:border-amber-300/50 hover:text-amber-300"
            aria-label="Go to cart"
          >
            <FiShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-stone-950">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
