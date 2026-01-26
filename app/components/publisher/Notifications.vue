<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface Notification {
  id?: string
  title?: string
  message?: string
  isRead?: boolean
  initiatedTime?: string
  [key: string]: any
}

interface NotificationsResponse {
  status?: number
  message?: string
  data?: {
    items: Notification[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

// Notifications state
const notifications = ref<Notification[]>([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const hasNext = ref(false)
const hasPrevious = ref(false)
const notificationsContainer = ref<HTMLElement | null>(null)

// Get notification background color based on title/content
const getNotificationColor = (title: string | undefined) => {
  if (!title) return 'bg-blue-50 border-blue-200'

  const titleLower = title.toLowerCase()
  if (titleLower.includes('published') || titleLower.includes('success')) {
    return 'bg-green-50 border-green-200'
  } else if (titleLower.includes('comment') || titleLower.includes('review')) {
    return 'bg-yellow-50 border-yellow-200'
  } else if (titleLower.includes('draft') || titleLower.includes('saved')) {
    return 'bg-blue-50 border-blue-200'
  } else if (titleLower.includes('error') || titleLower.includes('failed')) {
    return 'bg-red-50 border-red-200'
  }
  return 'bg-blue-50 border-blue-200'
}

// Fetch notifications
const fetchNotifications = async (page: number = 1, append: boolean = false) => {
  if (append) {
    isLoadingMore.value = true
  } else {
    isLoading.value = true
  }
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<NotificationsResponse>(
      `${API_BASE_URL}/api/publisher-notifications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: {
          PageNumber: page - 1, // API uses 0-based indexing
          PageSize: pageSize.value
        }
      }
    )

    if (response.data) {
      const newNotifications = response.data.items || []

      if (append) {
        // Append new notifications to existing ones
        notifications.value = [...notifications.value, ...newNotifications]
      } else {
        // Replace notifications
        notifications.value = newNotifications
      }

      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
      currentPage.value = response.data.currentPage || page
    }
  } catch (err: any) {
    console.error('Error fetching notifications:', err)
    error.value = err.data?.message || err.message || 'Failed to load notifications'
  } finally {
    isLoading.value = false
    isLoadingMore.value = false
  }
}

// Handle scroll for infinite scroll
const handleScroll = () => {
  if (!notificationsContainer.value || isLoadingMore.value || !hasNext.value) return

  const container = notificationsContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  // Load more when user scrolls within 100px of bottom
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchNotifications(currentPage.value + 1, true)
  }
}

// Setup scroll listener
onMounted(() => {
  fetchNotifications(1, false)

  nextTick(() => {
    if (notificationsContainer.value) {
      notificationsContainer.value.addEventListener('scroll', handleScroll)
    }
  })
})

// Cleanup scroll listener
onUnmounted(() => {
  if (notificationsContainer.value) {
    notificationsContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-20 flex flex-col max-h-[600px]">
    <div class="flex items-center justify-between mb-4 flex-shrink-0">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-bell w-5 h-5 text-[#0b2545]" aria-hidden="true">
          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
          <path
            d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>
        <h3 class="text-[#0b2545]">Notifications</h3>
      </div>
      <button
        @click="fetchNotifications(1, false)"
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

    <!-- Scrollable Notifications Container -->
    <div
      ref="notificationsContainer"
      class="flex-1 overflow-y-auto space-y-3 pr-2"
      style="scrollbar-width: thin;"
    >
      <!-- Loading State -->
      <div v-if="isLoading && notifications.length === 0" class="space-y-3">
        <div v-for="i in 3" :key="i" class="p-3 bg-gray-100 rounded-lg animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-full mb-1"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600 mb-2">{{ error }}</p>
        <button
          @click="fetchNotifications(1, false)"
          class="text-xs text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>

      <!-- Notifications List -->
      <template v-else-if="notifications.length > 0">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'p-3 rounded-lg border',
            getNotificationColor(notification.title),
            !notification.isRead && ''
          ]"
        >
          <div class="text-sm text-gray-900 mb-1 font-medium">
            {{ notification.title || 'Notification' }}
          </div>
          <div class="text-xs text-gray-600">
            {{ notification.message || 'No message' }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ notification.initiatedTime || 'No time' }}
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
          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
          <path
            d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>
        <p class="text-sm text-gray-500">No notifications found</p>
      </div>
    </div>
  </div>
</template>

