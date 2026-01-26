/**
 * Admin route protection middleware
 * Only allows admin users to access admin routes
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (import.meta.server) return

  const { isAuthenticated, getUserRole } = useAuth()

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return navigateTo('/auth/sign-in')
  }

  // Check if user is admin
  const role = getUserRole()
  if (role !== 'admin') {
    // Redirect to their respective dashboard
    if (role === 'publisher') {
      return navigateTo('/publisher/dashboard')
    }
    // If role is unknown, redirect to login
    return navigateTo('/auth/sign-in')
  }
})

