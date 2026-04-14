import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants'
import { useAppContext } from '../context/useAppContext'

function AdminLoginPage() {
  const { loginAdmin, isAdminAuthenticated } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState(ADMIN_PASSWORD)
  const [error, setError] = useState('')

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isLoggedIn = loginAdmin(email, password)
    if (!isLoggedIn) {
      setError('Use the provided demo admin credentials to access the dashboard.')
      return
    }

    const redirectTo =
      typeof location.state === 'object' &&
      location.state &&
      'from' in location.state &&
      typeof location.state.from === 'string'
        ? location.state.from
        : '/admin/dashboard'

    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.15),transparent_28%),linear-gradient(180deg,#0c0a09_0%,#111827_100%)] px-4">
      <div className="grid max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-stone-950/90 shadow-2xl shadow-black/40 lg:grid-cols-2">
        <div className="bg-[linear-gradient(145deg,rgba(251,191,36,0.18),rgba(17,24,39,0.8))] p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Admin Access</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Welcome back, operator.</h1>
          <p className="mt-4 text-stone-200">
            Sign in to manage menu inventory, monitor orders, and update delivery status in real time.
          </p>
          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/20 p-5 text-sm text-stone-200">
            <p className="font-semibold text-white">Demo Credentials</p>
            <p className="mt-3">Email: {ADMIN_EMAIL}</p>
            <p>Password: {ADMIN_PASSWORD}</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-semibold text-white">Admin Login</h2>
          <p className="mt-3 text-stone-400">Enter your credentials to continue to the dashboard.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm text-stone-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError('')
                }}
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-stone-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError('')
                }}
                className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-amber-400 px-6 py-4 font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
