/**
 * Authentication middleware
 * Redirects authenticated users away from login page
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (import.meta.server) return

  const { isAuthenticated, getUserRole, getDashboardPath } = useAuth()

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (to.path === '/auth/sign-in' && isAuthenticated()) {
    const role = getUserRole()
    const dashboardPath = getDashboardPath(role)
    return navigateTo(dashboardPath)
  }
})

