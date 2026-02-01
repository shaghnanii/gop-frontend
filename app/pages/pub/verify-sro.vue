<script setup lang="ts">
import {ref} from 'vue'
import {useRuntimeConfig} from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL

const sroNumber = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const isValid = ref<boolean | null>(null)
const verificationResult = ref<{
  status: number
  message: string
  data?: any
} | null>(null)

const verifySRO = async () => {
  if (!sroNumber.value.trim()) {
    errorMessage.value = 'Please enter an SRO number'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  isValid.value = null
  verificationResult.value = null

  try {
    const response = await $fetch<{
      status: number
      message: string
      data?: any
    }>(`${API_BASE_URL}/api/public/verify-sro-number`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        sroNumber: sroNumber.value.trim()
      }
    })

    verificationResult.value = response
    
    if (response.status === 200) {
      isValid.value = true
    } else {
      isValid.value = false
      errorMessage.value = response.message || 'SRO number is invalid'
    }
  } catch (error: any) {
    console.error('Error verifying SRO:', error)
    
    if (error.data?.status === 422) {
      isValid.value = false
      errorMessage.value = error.data?.message || 'The provided SRO number is invalid'
    } else {
      errorMessage.value = error.data?.message || error.message || 'Failed to verify SRO number'
      isValid.value = false
    }
  } finally {
    isLoading.value = false
  }
}

const tryAgain = () => {
  sroNumber.value = ''
  isValid.value = null
  errorMessage.value = ''
  verificationResult.value = null
}

const handleBackToHome = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        @click="handleBackToHome"
        class="flex items-center gap-2 text-gray-600 hover:text-[#0b2545] mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-arrow-left w-4 h-4" aria-hidden="true">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span class="text-sm">Back to Home</span>
      </button>
      
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-[#0b2545]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-shield-check w-10 h-10 text-[#0b2545]" aria-hidden="true">
            <path
              d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <h1 class="text-[#0b2545] mb-4">Verify SRO Authenticity</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Verify the authenticity of any SRO or Serial number against
          official Gazette of Pakistan records</p>
      </div>

      <!-- Verification Form -->
      <div v-if="isValid === null" class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-8">
        <label class="block text-sm text-gray-700 mb-3">Enter SRO / Serial Number</label>
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <div class="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                 aria-hidden="true">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              v-model="sroNumber"
              type="text"
              placeholder="e.g., S.R.O. 1543(I)/2024"
              class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
              @keyup.enter="verifySRO"
            />
          </div>
          <button
            @click="verifySRO"
            :disabled="isLoading || !sroNumber.trim()"
            class="px-8 py-4 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Verifying...</span>
            <span v-else>Verify Authenticity</span>
          </button>
        </div>
        
        <div v-if="errorMessage && !isLoading" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
        
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 class="text-sm text-gray-900 mb-2">How to use:</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Enter the complete SRO or Serial number as shown on the document</li>
            <li>• The system will check against official published records</li>
            <li>• Valid notifications will display verification details and signed PDF</li>
          </ul>
        </div>
      </div>

      <!-- Invalid Result -->
      <div v-if="isValid === false" class="bg-white border-2 border-[#dc2626] rounded-lg p-8 shadow-lg animate-fadeIn mb-8">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-[#dc2626]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-6 h-6 text-[#dc2626]" aria-hidden="true">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h2 class="text-[#dc2626]">SRO Not Found</h2>
              <span class="px-3 py-1 bg-[#dc2626]/10 text-[#dc2626] rounded-full text-sm">Not Verified</span>
            </div>
            <p class="text-gray-600">{{ errorMessage || 'This SRO could not be found in official Gazette records' }}</p>
          </div>
        </div>
        
        <div class="bg-[#dc2626]/5 border border-[#dc2626]/20 rounded-lg p-6 mb-6">
          <h3 class="text-gray-900 mb-3">Possible Reasons:</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-4 h-4 text-[#dc2626] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <span>The notification may be fake or fraudulent</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-4 h-4 text-[#dc2626] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <span>The SRO number may be incorrectly formatted</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-4 h-4 text-[#dc2626] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <span>The notification may not have been officially published yet</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-4 h-4 text-[#dc2626] flex-shrink-0 mt-0.5" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <span>There may be a typo in the entered SRO number</span>
            </li>
          </ul>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button class="px-6 py-3 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link w-5 h-5" aria-hidden="true">
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
            Report Fake Notification
          </button>
          <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Search Official Records</button>
          <button @click="tryAgain" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Try Again</button>
        </div>
        
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm text-gray-700">
            <strong>Warning:</strong> If you received this notification through unofficial channels, please exercise caution. Always verify official notifications through the Gazette of Pakistan portal.
          </p>
        </div>
      </div>

      <!-- Valid Result -->
      <div v-if="isValid === true" class="bg-white border-2 border-[#0b6b3a] rounded-lg p-8 shadow-lg animate-fadeIn mb-8">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-[#0b6b3a]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-6 h-6 text-[#0b6b3a]" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h2 class="text-[#0b6b3a]">SRO Verified</h2>
              <span class="px-3 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded-full text-sm">Verified</span>
            </div>
            <p class="text-gray-600">This SRO number has been verified against official Gazette of Pakistan records.</p>
          </div>
        </div>
        
        <div class="bg-[#0b6b3a]/5 border border-[#0b6b3a]/20 rounded-lg p-6 mb-6">
          <h3 class="text-gray-900 mb-3 font-semibold">Verification Details:</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">SRO Number:</span>
              <span class="text-gray-900 font-medium">{{ sroNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span class="text-[#0b6b3a] font-medium">Valid and Authentic</span>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button class="px-6 py-3 bg-[#0b6b3a] text-white rounded-lg hover:bg-[#0a5a2e] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5" aria-hidden="true">
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            View Official PDF
          </button>
          <button @click="tryAgain" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Verify Another SRO</button>
        </div>
      </div>

      <!-- Other Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-[#0b2545] mb-3">Why Verify?</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Protect against fake notifications</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Confirm legal validity</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Access official signed PDFs</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Ensure regulatory compliance</span>
            </li>
          </ul>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-[#0b2545] mb-3">Need Help?</h3>
          <p class="text-sm text-gray-600 mb-4">If you're having trouble verifying a notification or suspect a fake
            document, please contact our verification helpline.</p>
          <button class="text-sm text-[#0b2545] hover:underline">Contact Support →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
