<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface NoticeCountByMinistry {
  ministry?: string
  noticeCount?: number
}

interface AveragePublishTimeByMinistry {
  ministry?: string
  averageDaysToPublish?: number
}

interface AnalyticsResponse {
  status?: number
  message?: string
  data?: {
    noticeCountsByMinistry?: NoticeCountByMinistry[]
    averagePublishTimesByMinistry?: AveragePublishTimeByMinistry[]
  }
}

// State
const noticeCounts = ref<NoticeCountByMinistry[]>([])
const averagePublishTimes = ref<AveragePublishTimeByMinistry[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Calculate max notice count for progress bar percentage
const maxNoticeCount = computed(() => {
  if (noticeCounts.value.length === 0) return 1
  return Math.max(...noticeCounts.value.map(item => item.noticeCount || 0), 1)
})

// Get progress bar color based on index
const getProgressBarColor = (index: number) => {
  const colors = [
    'bg-[#0b2545]',
    'bg-[#0b6b3a]',
    'bg-[#0b2545]',
    'bg-[#0b6b3a]',
    'bg-blue-600',
    'bg-purple-600'
  ]
  return colors[index % colors.length]
}

// Format days to publish
const formatDays = (days: number | undefined) => {
  if (days === undefined || days === null) return '0 days'
  if (days === 0) return '< 1 day'
  if (days === 1) return '1 day'
  return `${days.toFixed(1)} days`
}

// Fetch analytics data
const fetchAnalytics = async () => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<AnalyticsResponse>(
      `${API_BASE_URL}/api/admin/analytics`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      noticeCounts.value = response.data.noticeCountsByMinistry || []
      averagePublishTimes.value = response.data.averagePublishTimesByMinistry || []
    }
  } catch (err: any) {
    console.error('Error fetching analytics:', err)
    error.value = err.data?.message || err.message || 'Failed to load analytics'
  } finally {
    isLoading.value = false
  }
}

// Fetch on mount
onMounted(() => {
  fetchAnalytics()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Error State -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-sm text-red-600 mb-2">{{ error }}</p>
      <button
        @click="fetchAnalytics"
        class="text-xs text-red-700 hover:text-red-900 underline"
      >
        Try again
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publications by Ministry -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[#0b2545]">Publications by Ministry</h2>
          <button
            @click="fetchAnalytics"
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
        <div v-if="isLoading && noticeCounts.length === 0" class="space-y-3">
          <div v-for="i in 4" :key="i" class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="noticeCounts.length === 0" class="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-gray-400 mb-2"
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          <p class="text-sm text-gray-500">No data available</p>
        </div>

        <!-- Notice Counts List -->
        <div v-else class="space-y-3">
          <div
            v-for="(item, index) in noticeCounts"
            :key="item.ministry || index"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm text-gray-700">{{ item.ministry || 'Unknown Ministry' }}</span>
              <span class="text-sm text-gray-900 font-medium">{{ item.noticeCount || 0 }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                :class="['h-2 rounded-full transition-all', getProgressBarColor(index)]"
                :style="{
                  width: `${((item.noticeCount || 0) / maxNoticeCount) * 100}%`
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Average Time to Publish -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[#0b2545]">Average Time to Publish</h2>
          <button
            @click="fetchAnalytics"
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
        <div v-if="isLoading && averagePublishTimes.length === 0" class="space-y-4">
          <div v-for="i in 4" :key="i" class="flex items-center justify-between">
            <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="averagePublishTimes.length === 0" class="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mx-auto text-gray-400 mb-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <p class="text-sm text-gray-500">No data available</p>
        </div>

        <!-- Average Publish Times List -->
        <div v-else class="space-y-4">
          <div
            v-for="(item, index) in averagePublishTimes"
            :key="item.ministry || index"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-700">{{ item.ministry || 'Unknown Ministry' }}</span>
            <span class="text-sm text-gray-900 font-medium">
              {{ formatDays(item.averageDaysToPublish) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

