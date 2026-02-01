<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useRuntimeConfig} from '#app'

// Use auth layout (no header/footer)
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL

const token = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const passwordErrors = ref({
  minLength: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpecial: false,
  match: false
})

// Get token from URL query parameter
onMounted(() => {
  const tokenParam = route.query.token as string
  if (!tokenParam) {
    errorMessage.value = 'Invalid invitation link. Token is missing.'
    return
  }
  token.value = tokenParam
})

// Password validation
const validatePassword = () => {
  passwordErrors.value = {
    minLength: newPassword.value.length >= 8,
    hasUpper: /[A-Z]/.test(newPassword.value),
    hasLower: /[a-z]/.test(newPassword.value),
    hasNumber: /[0-9]/.test(newPassword.value),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value),
    match: newPassword.value === confirmPassword.value && confirmPassword.value.length > 0
  }
}

// Watch password fields
watch([newPassword, confirmPassword], () => {
  validatePassword()
})

// Check if form is valid
const isFormValid = computed(() => {
  return passwordErrors.value.minLength &&
    passwordErrors.value.hasUpper &&
    passwordErrors.value.hasLower &&
    passwordErrors.value.hasNumber &&
    passwordErrors.value.hasSpecial &&
    passwordErrors.value.match
})

// Handle form submission
const handleSubmit = async () => {
  errorMessage.value = ''
  
  if (!isFormValid.value) {
    errorMessage.value = 'Please ensure all password requirements are met'
    return
  }
  
  if (!token.value) {
    errorMessage.value = 'Invalid invitation token'
    return
  }
  
  isLoading.value = true
  
  try {
    const response = await $fetch(`${API_BASE_URL}/api/auth/accept-invitation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token: token.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
      }
    })
    
    // Success - redirect to login
    await router.push('/auth/sign-in?message=Password set successfully. Please login.')
  } catch (error: any) {
    console.error('Error accepting invitation:', error)
    errorMessage.value = error.data?.message || error.message || 'Failed to accept invitation. Please try again.'
  } finally {
    isLoading.value = false
  }
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
        <p class="text-gray-600">Create your profile password</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 class="text-[#0b2545] mb-6">Accept Invitation</h2>

        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <div class="space-y-4 mb-6">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
              New Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#377E7F] focus:border-[#377E7F] outline-none transition-colors"
              placeholder="Enter your new password"
              required
              @input="validatePassword"
            />
            
            <!-- Password Requirements -->
            <div v-if="newPassword" class="mt-2 space-y-1 text-xs">
              <div class="flex items-center gap-2" :class="passwordErrors.minLength ? 'text-green-600' : 'text-gray-500'">
                <svg v-if="passwordErrors.minLength" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                At least 8 characters
              </div>
              <div class="flex items-center gap-2" :class="passwordErrors.hasUpper ? 'text-green-600' : 'text-gray-500'">
                <svg v-if="passwordErrors.hasUpper" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                One uppercase letter
              </div>
              <div class="flex items-center gap-2" :class="passwordErrors.hasLower ? 'text-green-600' : 'text-gray-500'">
                <svg v-if="passwordErrors.hasLower" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                One lowercase letter
              </div>
              <div class="flex items-center gap-2" :class="passwordErrors.hasNumber ? 'text-green-600' : 'text-gray-500'">
                <svg v-if="passwordErrors.hasNumber" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                One number
              </div>
              <div class="flex items-center gap-2" :class="passwordErrors.hasSpecial ? 'text-green-600' : 'text-gray-500'">
                <svg v-if="passwordErrors.hasSpecial" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                One special character
              </div>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#377E7F] focus:border-[#377E7F] outline-none transition-colors"
              :class="confirmPassword && !passwordErrors.match ? 'border-red-300' : 'border-gray-300'"
              placeholder="Confirm your new password"
              required
              @input="validatePassword"
            />
            <p v-if="confirmPassword && !passwordErrors.match" class="mt-1 text-xs text-red-600">
              Passwords do not match
            </p>
            <p v-else-if="confirmPassword && passwordErrors.match" class="mt-1 text-xs text-green-600">
              Passwords match
            </p>
          </div>
        </div>

        <button
          @click="handleSubmit"
          :disabled="isLoading || !isFormValid"
          class="w-full px-6 py-3 bg-[#377E7F] text-white rounded-lg hover:bg-[#2d6668] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Creating Profile...</span>
          <span v-else>Create Profile</span>
        </button>
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
