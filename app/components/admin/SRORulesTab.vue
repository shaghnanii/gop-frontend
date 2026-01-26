<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const API_BASE_URL = 'http://localhost:8080'
const { getAccessToken } = useAuth()

interface SRORulesData {
  sroPatternFormat?: string
  currentCounter?: number
  nextAvailable?: number
}

interface SRORulesResponse {
  status?: number
  message?: string
  data?: SRORulesData
}

const sroRules = ref<SRORulesData>({
  sroPatternFormat: '',
  currentCounter: 0,
  nextAvailable: 0
})
const isLoading = ref(false)
const error = ref<string | null>(null)

// Get current year for display
const currentYear = new Date().getFullYear()

// Fetch SRO rules from API
const fetchSRORules = async () => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<SRORulesResponse>(
      `${API_BASE_URL}/api/admin-sro-numbering`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      sroRules.value = {
        sroPatternFormat: response.data.sroPatternFormat || '',
        currentCounter: response.data.currentCounter || 0,
        nextAvailable: response.data.nextAvailable || 0
      }
    }
  } catch (err: any) {
    console.error('Error fetching SRO rules:', err)
    error.value = err.data?.message || err.message || 'Failed to load SRO rules'
  } finally {
    isLoading.value = false
  }
}

// Fetch on mount
onMounted(() => {
  fetchSRORules()
})
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-[#0b2545]">SRO Numbering Rules</h2>
        <button
          @click="fetchSRORules"
          class="p-1.5 text-gray-500 hover:text-[#0b2545] transition-colors"
          title="Refresh"
          :disabled="isLoading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{ 'animate-spin': isLoading }"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div>
          <div class="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600 mb-2">{{ error }}</p>
        <button
          @click="fetchSRORules"
          class="text-xs text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>

      <!-- SRO Rules Content -->
      <div v-else class="space-y-6">
        <div>
          <label class="block text-sm text-gray-700 mb-2 font-medium">SRO Pattern Format</label>
          <input
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
            readonly
            :value="sroRules.sroPatternFormat || 'S.R.O. {XXXX}({PART})/{YYYY}'"
          />
          <p class="text-xs text-gray-500 mt-1">
            {XXXX} = Auto-increment counter, {PART} = Part identifier (I/II/III), {YYYY} = Year
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-700 mb-2 font-medium">Current Counter ({{ currentYear }})</label>
            <input
              type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
              readonly
              :value="sroRules.currentCounter || 0"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-700 mb-2 font-medium">Next Available</label>
            <input
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
              readonly
              :value="sroRules.nextAvailable || 0"
            />
          </div>
        </div>
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="text-sm text-gray-900 mb-2 font-medium">Conflict Resolution</h3>
          <p class="text-xs text-gray-600">
            System automatically detects SRO conflicts and suggests alternatives. Manual override available for authorized users.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

