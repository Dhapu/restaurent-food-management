import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

interface ProtectedAdminRouteProps {
  children: ReactNode
}

function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdminAuthenticated } = useAppContext()
  const location = useLocation()

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}

export default ProtectedAdminRoute
