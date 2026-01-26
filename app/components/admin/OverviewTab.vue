<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'

const API_BASE_URL = 'http://localhost:8080'
const { getAccessToken } = useAuth()

interface Activity {
  title?: string
  message?: string
  initiatedTime?: string
  [key: string]: any
}

interface Notice {
  id?: string
  ministry?: string
  title?: string
  sroNumber?: string
  publishedDate?: string
  status?: string
  [key: string]: any
}

interface NoticesResponse {
  status?: number
  message?: string
  data?: {
    items: Notice[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

interface ActivitiesResponse {
  status?: number
  message?: string
  data?: {
    items: Activity[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

const activities = ref<Activity[]>([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const error = ref<string | null>(null)
const activitiesPage = ref(1)
const activitiesPageSize = ref(10)
const activitiesHasNext = ref(false)
const activitiesContainer = ref<HTMLElement | null>(null)

// Notices pagination state
const notices = ref<Notice[]>([])
const isLoadingNotices = ref(false)
const errorNotices = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// Format time ago
const formatTimeAgo = (dateString: string | undefined): string => {
  if (!dateString) return 'Unknown time'

  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''} ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''} ago`

    return date.toLocaleDateString()
  } catch (e) {
    return dateString
  }
}

// Fetch activities from API with pagination
const fetchActivities = async (page: number = 1, append: boolean = false) => {
  if (append) {
    isLoadingMore.value = true
  } else {
    isLoading.value = true
    error.value = null
  }

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Convert to 0-indexed page number for API
    const pageNumber = page - 1

    const response = await $fetch<ActivitiesResponse>(
      `${API_BASE_URL}/api/admin-overview/activities?PageNumber=${pageNumber}&PageSize=${activitiesPageSize.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      const newActivities = response.data.items || []

      if (append) {
        // Append new activities to existing ones
        activities.value = [...activities.value, ...newActivities]
      } else {
        // Replace activities (initial load)
        activities.value = newActivities
      }

      activitiesHasNext.value = response.data.hasNext || false
      activitiesPage.value = response.data.currentPage || page
    } else {
      if (!append) {
        activities.value = []
      }
    }
  } catch (err: any) {
    console.error('Error fetching activities:', err)
    if (!append) {
      error.value = err.data?.message || err.message || 'Failed to load activities'
      activities.value = []
    }
  } finally {
    isLoading.value = false
    isLoadingMore.value = false
  }
}

// Load more activities on scroll
const handleScroll = () => {
  if (!activitiesContainer.value || isLoadingMore.value || !activitiesHasNext.value) return

  const container = activitiesContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  // Load more when user scrolls to within 100px of bottom
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchActivities(activitiesPage.value + 1, true)
  }
}

// Format date
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return dateString
  }
}

// Fetch notices from API with pagination
const fetchNotices = async (page: number = 1) => {
  isLoadingNotices.value = true
  errorNotices.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Convert to 0-indexed page number for API
    const pageNumber = page - 1

    const response = await $fetch<NoticesResponse>(
      `${API_BASE_URL}/api/admin-overview/notices?PageNumber=${pageNumber}&PageSize=${pageSize.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      notices.value = response.data.items || []
      totalCount.value = response.data.totalCount || 0
      currentPage.value = response.data.currentPage || page
      totalPages.value = response.data.totalPages || 1
      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
    } else {
      notices.value = []
    }
  } catch (err: any) {
    console.error('Error fetching notices:', err)
    errorNotices.value = err.data?.message || err.message || 'Failed to load notices'
    notices.value = []
  } finally {
    isLoadingNotices.value = false
  }
}

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchNotices(page)
  }
}

const nextPage = () => {
  if (hasNext.value) {
    goToPage(currentPage.value + 1)
  }
}

const previousPage = () => {
  if (hasPrevious.value) {
    goToPage(currentPage.value - 1)
  }
}

// Fetch activities and notices on component mount
onMounted(() => {
  fetchActivities(1, false)
  fetchNotices(1)

  // Setup scroll listener for infinite scroll
  nextTick(() => {
    if (activitiesContainer.value) {
      activitiesContainer.value.addEventListener('scroll', handleScroll)
    }
  })
})

// Cleanup scroll listener
onUnmounted(() => {
  if (activitiesContainer.value) {
    activitiesContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- Published Notices Activity -->
    <div class="bg-white col-span-8 border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-[#0b2545]">Published Notices Activity</h2>
        <button
          @click="fetchNotices(currentPage)"
          class="p-1.5 text-gray-500 hover:text-[#0b2545] transition-colors"
          title="Refresh"
          :disabled="isLoadingNotices"
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
            :class="{ 'animate-spin': isLoadingNotices }"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingNotices && notices.length === 0" class="space-y-4">
        <div v-for="i in 3" :key="i" class="p-4 border border-gray-200 rounded-lg">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div class="h-5 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorNotices" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600 mb-2">{{ errorNotices }}</p>
        <button
          @click="fetchNotices(currentPage)"
          class="text-xs text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>

      <!-- Notices List -->
      <div v-else-if="notices.length > 0" class="space-y-4">
        <div
          v-for="notice in notices"
          :key="notice.id"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between gap-4 mb-2">
            <div class="flex-1">
              <div class="text-sm text-gray-600 mb-1">{{ notice.ministry || 'N/A' }}</div>
              <h3 class="text-gray-900 mb-1 font-medium">{{ notice.title || 'Untitled Notice' }}</h3>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="font-mono">{{ notice.sroNumber || 'N/A' }}</span>
                <span>•</span>
                <span>{{ formatDate(notice.publishedDate) }}</span>
              </div>
            </div>
            <span
              class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap font-medium"
            >
              {{ notice.status || 'Unknown' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
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
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
        </svg>
        <p class="text-sm text-gray-500">No notices found</p>
      </div>

      <!-- Pagination Controls -->
      <div v-if="notices.length > 0 && totalPages > 1" class="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{ totalCount }} notices
        </div>
        <div class="flex items-center gap-2">
          <!-- Previous Button -->
          <button
            @click="previousPage"
            :disabled="!hasPrevious || isLoadingNotices"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="isLoadingNotices"
              :class="[
                'px-3 py-2 text-sm rounded-lg transition-colors min-w-[40px]',
                currentPage === page
                  ? 'bg-[#0b2545] text-white font-medium'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <!-- Next Button -->
          <button
            @click="nextPage"
            :disabled="!hasNext || isLoadingNotices"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Activity with Infinite Scroll -->
    <div class="bg-white col-span-4 border border-gray-200 rounded-lg p-6 flex flex-col max-h-[620px] sticky top-20">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-[#0b2545]">Recent Activity</h2>
        <button
          @click="fetchActivities(1, false)"
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

      <!-- Scrollable Activities Container -->
      <div
        ref="activitiesContainer"
        class="flex-1 overflow-y-auto space-y-3 max-h-[600px] pr-2"
        style="scrollbar-width: thin;"
      >
        <!-- Loading State -->
        <div v-if="isLoading && activities.length === 0" class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div class="w-2 h-2 rounded-full bg-gray-300 mt-1.5 flex-shrink-0 animate-pulse"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600 mb-2">{{ error }}</p>
          <button
            @click="fetchActivities(1, false)"
            class="text-xs text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>

        <!-- Activities List -->
        <template v-else-if="activities.length > 0">
          <div
            v-for="(activity, index) in activities"
            :key="`${activity.title}-${index}-${activity.initiatedTime || Math.random()}`"
            class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
          >
            <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
            <div class="flex-1">
              <div class="text-sm text-gray-900 font-medium">
                {{ activity.title || 'Activity' }}
              </div>
              <div class="text-xs text-gray-600">
                {{ activity.message || 'No description' }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {{ activity.initiatedTime }}
              </div>
            </div>
          </div>

          <!-- Loading More Indicator -->
          <div v-if="isLoadingMore" class="flex items-center justify-center py-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <div class="w-4 h-4 border-2 border-[#0b2545] border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more...</span>
            </div>
          </div>
        </template>

        <!-- Empty State -->
        <div v-else class="text-center py-8">
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
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
          </svg>
          <p class="text-sm text-gray-500">No activities found</p>
        </div>
      </div>
    </div>
  </div>
</template>

