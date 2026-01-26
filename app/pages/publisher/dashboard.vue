<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'
import MyDrafts from "~/components/publisher/MyDrafts.vue";
import RecentlyPublished from "~/components/publisher/RecentlyPublished.vue";
import Notifications from "~/components/publisher/Notifications.vue";

// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface PublisherSummaryData {
  totalPublishedCount?: number
  totalDraftCount?: number
}

interface PublisherSummaryResponse {
  status?: number
  message?: string
  data?: PublisherSummaryData
}

// Summary state
const summaryData = ref<PublisherSummaryData>({
  totalPublishedCount: 0,
  totalDraftCount: 0
})
const isLoadingSummary = ref(false)
const summaryError = ref<string | null>(null)

// Format number with commas
const formatNumber = (num: number | undefined) => {
  if (num === undefined || num === null) return '0'
  return num.toLocaleString('en-US')
}

// Fetch summary data
const fetchSummary = async () => {
  isLoadingSummary.value = true
  summaryError.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<PublisherSummaryResponse>(
      `${API_BASE_URL}/api/publisher-dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      summaryData.value = {
        totalPublishedCount: response.data.totalPublishedCount || 0,
        totalDraftCount: response.data.totalDraftCount || 0
      }
    }
  } catch (err: any) {
    console.error('Error fetching publisher summary:', err)
    summaryError.value = err.data?.message || err.message || 'Failed to load summary'
    // Set default values on error
    summaryData.value = {
      totalPublishedCount: 0,
      totalDraftCount: 0
    }
  } finally {
    isLoadingSummary.value = false
  }
}

// Fetch summary on mount
onMounted(() => {
  fetchSummary()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8"><h1 class="text-[#377E7F] mb-2">Publisher Dashboard</h1>
        <p class="text-gray-600">Ministry of IT &amp; Telecom</p></div>
      <div class="bg-gradient-to-br from-[#377E7F] to-[#3A715E] rounded-lg p-8 mb-6 text-white"><h2
        class="text-white mb-2">Create New Notice</h2>
        <p class="text-gray-100 mb-6">Start drafting a new gazette notification for publication</p>
        <button
          class="px-6 py-3 bg-white text-[#377E7F] rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-plus w-5 h-5" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Create Notice
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-file-text w-5 h-5 text-[#0b6b3a]" aria-hidden="true">
              <path
                d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <span v-if="isLoadingSummary" class="text-2xl text-gray-300 animate-pulse text-[#0b6b3a]">---</span>
            <span v-else class="text-2xl text-[#0b6b3a]">{{ formatNumber(summaryData.totalPublishedCount) }}</span>
          </div>
          <div class="text-sm text-gray-600">Published Notices</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-pen-tool w-5 h-5 text-[#0b2545]" aria-hidden="true">
              <path
                d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
              <path
                d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
              <path d="m2.3 2.3 7.286 7.286"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
            <span v-if="isLoadingSummary" class="text-2xl text-gray-300 animate-pulse text-[#0b2545]">---</span>
            <span v-else class="text-2xl text-[#0b2545]">{{ formatNumber(summaryData.totalDraftCount) }}</span>
          </div>
          <div class="text-sm text-gray-600">Draft Notices</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 opacity-75">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-clock w-5 h-5" aria-hidden="true" style="color: rgb(11, 37, 69);">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-2xl text-gray-400" style="color: rgb(11, 37, 69);">--</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">Coming Soon</div>
            <div class="text-xs text-gray-400">TBD</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <MyDrafts />
          <RecentlyPublished />
        </div>
        <div class="space-y-6">
          <Notifications />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
