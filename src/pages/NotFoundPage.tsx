import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-amber-300">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-stone-400">
        The page you requested does not exist. Head back to the menu or home page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          Go Home
        </Link>
        <Link
          to="/menu"
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-amber-300/40"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
