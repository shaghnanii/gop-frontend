/**
 * Authentication utility functions
 */

export interface DecodedToken {
  Role?: string
  role?: string
  sub?: string
  email?: string
  Id?: string
  [key: string]: any
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: This doesn't verify the signature, it just extracts the payload
 */
export function decodeJWT(token: string): DecodedToken | null {
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

/**
 * Get access token from storage
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  
  // Check localStorage first (rememberMe)
  const localToken = localStorage.getItem('accessToken')
  if (localToken) return localToken
  
  // Check sessionStorage
  const sessionToken = sessionStorage.getItem('accessToken')
  if (sessionToken) return sessionToken
  
  return null
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAccessToken()
  if (!token) return false
  
  // Check if token is expired
  const decoded = decodeJWT(token)
  if (!decoded) return false
  
  // Check expiration (if exp exists)
  if (decoded.exp) {
    const expirationTime = decoded.exp * 1000 // Convert to milliseconds
    if (Date.now() >= expirationTime) {
      // Token expired, clear it
      clearAuth()
      return false
    }
  }
  
  return true
}

/**
 * Get user role from token
 */
export function getUserRole(): 'admin' | 'publisher' | null {
  const token = getAccessToken()
  if (!token) return null
  
  const decoded = decodeJWT(token)
  if (!decoded) return null
  
  // Check for role in token (case-insensitive)
  const role = decoded.Role || decoded.role || decoded.Role || null
  
  if (!role) return null
  
  // Normalize role to lowercase
  const normalizedRole = role.toLowerCase()
  
  if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
    return 'admin'
  } else if (normalizedRole === 'publisher' || normalizedRole === 'publishers') {
    return 'publisher'
  }
  
  return null
}

/**
 * Store user role in localStorage (for quick access)
 */
export function storeUserRole(role: 'admin' | 'publisher'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', role)
  }
}

/**
 * Get stored user role
 */
export function getStoredUserRole(): 'admin' | 'publisher' | null {
  if (typeof window === 'undefined') return null
  const role = localStorage.getItem('userRole')
  return (role === 'admin' || role === 'publisher') ? role : null
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('tokenExpiration')
  localStorage.removeItem('rememberMe')
  localStorage.removeItem('userRole')
  sessionStorage.removeItem('accessToken')
}

/**
 * Get dashboard path based on role
 */
export function getDashboardPath(role: 'admin' | 'publisher' | null): string {
  if (role === 'admin') {
    return '/admin/dashboard'
  } else if (role === 'publisher') {
    return '/publisher/dashboard'
  }
  return '/auth/sign-in'
}

