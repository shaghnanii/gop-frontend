/**
 * Publisher route protection middleware
 * Only allows publisher users to access publisher routes
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (import.meta.server) return

  const { isAuthenticated, getUserRole } = useAuth()

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return navigateTo('/auth/sign-in')
  }

  // Check if user is publisher
  const role = getUserRole()
  if (role !== 'publisher') {
    // Redirect to their respective dashboard
    if (role === 'admin') {
      return navigateTo('/admin/dashboard')
    }
    // If role is unknown, redirect to login
    return navigateTo('/auth/sign-in')
  }
})

