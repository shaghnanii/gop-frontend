<script setup lang="ts">
import { computed } from 'vue'

const { isAuthenticated, getUserRole, getDashboardPath, clearAuth } = useAuth()

const dashboardPath = computed(() => {
  if (!isAuthenticated()) return '/auth/sign-in'
  const role = getUserRole()
  return getDashboardPath(role)
})

const handleLogout = () => {
  clearAuth()
  navigateTo('/auth/sign-in')
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div class="w-10 h-10 bg-[#0b2545] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-shield w-6 h-6 text-white" aria-hidden="true">
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
            <div class="hidden sm:block">
              <div class="text-[#0b2545]">Pakistan Digital Gazette</div>
              <div class="text-xs text-gray-500">Official Public Record</div>
            </div>
          </div>
        </NuxtLink>
        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm hover:text-[#0b2545] transition-colors text-[#0b2545]">Home</NuxtLink>
          <NuxtLink to="/pub/browse" class="text-sm hover:text-[#0b2545] transition-colors text-gray-700">Advanced Search</NuxtLink>
          <NuxtLink to="/pub/verify-sro" class="text-sm hover:text-[#0b2545] transition-colors text-gray-700">Verify SRO</NuxtLink>
          <NuxtLink to="/pub/about-us" class="text-sm text-gray-700 hover:text-[#0b2545] transition-colors">About</NuxtLink>
          <NuxtLink to="/pub/documentation" class="text-sm text-gray-700 hover:text-[#0b2545] transition-colors">Documentation</NuxtLink>
        </nav>
        <div class="flex items-center gap-3">
          <!-- Show Dashboard and Logout if authenticated -->
          <template v-if="isAuthenticated()">
            <NuxtLink :to="dashboardPath" class="hidden sm:block px-4 py-2 text-[#0b2545] hover:text-[#0d2f59] transition-colors text-sm font-medium">
              Dashboard
            </NuxtLink>
            <span class="hidden sm:block text-gray-300">|</span>
            <button 
              @click="handleLogout" 
              class="hidden sm:block px-4 py-2 text-gray-700 hover:text-[#0b2545] transition-colors text-sm"
            >
              Logout
            </button>
          </template>
          <!-- Show Sign In if not authenticated -->
          <NuxtLink v-else to="/auth/sign-in" class="hidden sm:block px-4 py-2 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors text-sm">
            Sign In
          </NuxtLink>
          <button class="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-menu w-5 h-5" aria-hidden="true">
              <path d="M4 5h16"></path>
              <path d="M4 12h16"></path>
              <path d="M4 19h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
