/**
 * Authentication composable
 * Provides authentication utilities throughout the app
 */
export const useAuth = () => {
  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        return null
      }

      const payload = parts[1]
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
      return decoded
    } catch (error) {
      console.error('Error decoding JWT:', error)
      return null
    }
  }

  const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null
    
    const localToken = localStorage.getItem('accessToken')
    if (localToken) return localToken
    
    const sessionToken = sessionStorage.getItem('accessToken')
    if (sessionToken) return sessionToken
    
    return null
  }

  const isAuthenticated = (): boolean => {
    const token = getAccessToken()
    if (!token) return false
    
    const decoded = decodeJWT(token)
    if (!decoded) return false
    
    if (decoded.exp) {
      const expirationTime = decoded.exp * 1000
      if (Date.now() >= expirationTime) {
        clearAuth()
        return false
      }
    }
    
    return true
  }

  const getUserRole = (): 'admin' | 'publisher' | null => {
    const token = getAccessToken()
    if (!token) return null
    
    const decoded = decodeJWT(token)
    if (!decoded) return null
    
    const role = decoded.Role || decoded.role || decoded.Role || null
    
    if (!role) return null
    
    const normalizedRole = role.toLowerCase()
    
    if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
      return 'admin'
    } else if (normalizedRole === 'publisher' || normalizedRole === 'publishers') {
      return 'publisher'
    }
    
    return null
  }

  const getDashboardPath = (role: 'admin' | 'publisher' | null): string => {
    if (role === 'admin') {
      return '/admin/dashboard'
    } else if (role === 'publisher') {
      return '/publisher/dashboard'
    }
    return '/auth/sign-in'
  }

  const clearAuth = (): void => {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('rememberMe')
    localStorage.removeItem('userRole')
    sessionStorage.removeItem('accessToken')
  }

  return {
    isAuthenticated,
    getUserRole,
    getAccessToken,
    getDashboardPath,
    clearAuth
  }
}

