<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

// Apply auth middleware to redirect if already logged in
definePageMeta({
  middleware: 'auth'
})

const step = ref<'select-role' | 'login'>('login')
const selectedRole = ref<'publisher' | 'admin' | ''>('publisher')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const locationStatus = ref<'idle' | 'requesting' | 'granted' | 'denied'>('idle')

// Backend API base URL


const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL

// Decode JWT token to extract role
const decodeJWT = (token: string) => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

// Get device information
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const language = navigator.language

  // Detect browser
  let browser = 'Unknown'
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome'
  else if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'
  else if (userAgent.includes('Edg')) browser = 'Edge'
  else if (userAgent.includes('Opera') || userAgent.includes('OPR')) browser = 'Opera'

  // Detect OS
  let os = 'Unknown'
  if (userAgent.includes('Windows')) os = 'Windows'
  else if (userAgent.includes('Mac')) os = 'macOS'
  else if (userAgent.includes('Linux')) os = 'Linux'
  else if (userAgent.includes('Android')) os = 'Android'
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS'

  // Detect device type
  let deviceType = 'Desktop'
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    deviceType = 'Mobile'
  } else if (/Tablet|iPad/i.test(userAgent)) {
    deviceType = 'Tablet'
  }

  return {
    browser,
    browserVersion: userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/)?.[2] || 'Unknown',
    os,
    platform,
    language,
    deviceType,
    userAgent: userAgent.substring(0, 200), // Limit length
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

// Get user location with permission
const getUserLocation = (): Promise<{ latitude: number | null; longitude: number | null }> => {
  return new Promise((resolve) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser')
      resolve({ latitude: null, longitude: null })
      return
    }

    console.log('Requesting geolocation permission...')
    locationStatus.value = 'requesting'

    // Options for geolocation request
    const options: PositionOptions = {
      enableHighAccuracy: false, // Use less accurate but faster method
      timeout: 15000, // 15 second timeout
      maximumAge: 0 // Don't use cached position, always get fresh
    }

    // Request location - browser will show permission prompt on first use
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationStatus.value = 'granted'
        console.log('Location permission granted. Coordinates:', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error: GeolocationPositionError) => {
        locationStatus.value = 'denied'

        // Handle different error types
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.warn('User denied the request for Geolocation')
            break
          case error.POSITION_UNAVAILABLE:
            console.warn('Location information is unavailable')
            break
          case error.TIMEOUT:
            console.warn('The request to get user location timed out')
            break
          default:
            console.warn('An unknown error occurred:', error.message)
            break
        }

        // Permission denied or error occurred - return null
        resolve({ latitude: null, longitude: null })
      },
      options
    )
  })
}

const handleNext = () => {
  if (!selectedRole.value) {
    errorMessage.value = 'Please select an account type'
    return
  }
  errorMessage.value = ''
  step.value = 'login'
}

const handleBack = () => {
  step.value = 'select-role'
  errorMessage.value = ''
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  try {
    // IMPORTANT: Request location permission FIRST, before any other async operations
    // This ensures browser recognizes it as a direct user action
    const locationPromise = getUserLocation()

    // Get device information (synchronous, doesn't block)
    const deviceInfo = getDeviceInfo()

    // Wait for location (browser will show permission prompt if needed)
    const location = await locationPromise

    // Build payload
    const payload: any = {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
      deviceInfo: deviceInfo.userAgent,
      // Include latitude and longitude - use actual coordinates if permission granted, otherwise 0
      latitude: location.latitude !== null ? location.latitude : 0,
      longitude: location.longitude !== null ? location.longitude : 0
    }

    const response = await $fetch<{
      status: number
      message: string
      data: {
        id: string
        accessToken: string
        created: string
        expiration: string
        refreshToken: string
        expiresIn: number
      }
    }>(`${API_BASE_URL}/api/auth/authenticate`, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Check if response has the expected structure
    if (response && response.status === 200 && response.data) {
      // Decode token to get user role
      const decodedToken = decodeJWT(response.data.accessToken)
      let userRole: 'admin' | 'publisher' | null = null

      if (decodedToken) {
        const role = decodedToken.Role || decodedToken.role || null
        if (role) {
          const normalizedRole = role.toLowerCase()
          if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
            userRole = 'admin'
          } else if (normalizedRole === 'publisher' || normalizedRole === 'publishers') {
            userRole = 'publisher'
          }
        }
      }

      // Fallback to selectedRole if token doesn't have role
      if (!userRole) {
        userRole = selectedRole.value === 'admin' ? 'admin' : 'publisher'
      }

      // Store tokens
      localStorage.setItem('rememberMe', String(payload.rememberMe))
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('tokenExpiration', response.data.expiration)
      localStorage.setItem('userRole', userRole)

      if (payload.rememberMe === true) {
        localStorage.setItem('accessToken', response.data.accessToken)
      } else {
        sessionStorage.setItem('accessToken', response.data.accessToken)
      }

      // Redirect based on actual role from token
      const dashboardPath = userRole === 'admin' ? '/admin/dashboard' : '/publisher/dashboard'
      await navigateTo(dashboardPath)
    } else {
      errorMessage.value = 'Invalid response from server. Please try again.'
    }
  } catch (error: any) {
    // Handle error response - $fetch throws for non-2xx responses
    if (error.data) {
      // Error response from server
      errorMessage.value = error.data.message || error.data.Message || 'Login failed. Please try again.'
    } else if (error.message) {
      // Network or other errors
      if (error.message.includes('fetch')) {
        errorMessage.value = 'Unable to connect to server. Please check your connection.'
      } else {
        errorMessage.value = error.message
      }
    } else {
      errorMessage.value = 'Login failed. Please check your credentials and try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleBackToHome = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-[#377E7F] rounded-lg mb-4">
          <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-[#0b2545] mb-2">Gazette of Pakistan</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <!-- Step 1: Role Selection -->
        <div v-if="step === 'select-role'">
          <h2 class="text-[#0b2545] mb-6">Select Account Type</h2>
          <div class="space-y-3 mb-8">
            <label
              class="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all"
              :class="selectedRole === 'publisher' ? 'border-[#377E7F] bg-gray-50' : 'border-gray-200 hover:border-[#377E7F] hover:bg-gray-50'">
              <input
                type="radio"
                name="role"
                class="w-5 h-5 text-[#377E7F] focus:ring-[#377E7F] mt-0.5 flex-shrink-0"
                value="publisher"
                v-model="selectedRole"
              >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-building2 lucide-building-2 w-5 h-5 text-[#377E7F]" aria-hidden="true">
                    <path d="M10 12h4"></path>
                    <path d="M10 8h4"></path>
                    <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
                    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                  </svg>
                  <span class="text-gray-900">Publisher</span>
                </div>
                <p class="text-sm text-gray-500">Ministry or supplier account</p>
              </div>
            </label>
            <label
              class="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all"
              :class="selectedRole === 'admin' ? 'border-[#377E7F] bg-gray-50' : 'border-gray-200 hover:border-[#377E7F] hover:bg-gray-50'">
              <input
                type="radio"
                name="role"
                class="w-5 h-5 text-[#377E7F] focus:ring-[#377E7F] mt-0.5 flex-shrink-0"
                value="admin"
                v-model="selectedRole"
              >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-settings w-5 h-5 text-[#377E7F]" aria-hidden="true">
                    <path
                      d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span class="text-gray-900">Super Admin</span>
                </div>
                <p class="text-sm text-gray-500">System administration</p>
              </div>
            </label>
          </div>

          <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <button
            @click="handleNext"
            class="w-full px-6 py-3 bg-[#377E7F] text-white rounded-lg hover:bg-[#2d6668] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!selectedRole"
          >
            Next
          </button>
          <button
            @click="handleBackToHome"
            class="w-full mt-3 px-6 py-3 text-gray-600 hover:text-[#377E7F] text-sm"
          >
            Back to Home
          </button>
        </div>

        <!-- Step 2: Login Form -->
        <div v-else>
          <h2 class="text-[#0b2545] mb-6">Login</h2>

          <div class="space-y-4 mb-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                v-model="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#377E7F] focus:border-[#377E7F] outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                v-model="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#377E7F] focus:border-[#377E7F] outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <div class="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                v-model="rememberMe"
                class="w-4 h-4 text-[#377E7F] border-gray-300 rounded focus:ring-[#377E7F]"
              />
              <label for="rememberMe" class="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>

          <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <button
            @click="handleLogin"
            class="w-full px-6 py-3 bg-[#377E7F] text-white rounded-lg hover:bg-[#2d6668] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !email || !password"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
          <button
            @click="handleBack"
            class="w-full mt-3 px-6 py-3 text-gray-600 hover:text-[#377E7F] text-sm"
          >
            Back
          </button>
        </div>
      </div>

      <div class="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <p class="text-xs text-gray-600 text-center">
          <strong>Notice:</strong> This portal is for official government records. Figma Make is not intended for collecting PII or securing sensitive data.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
