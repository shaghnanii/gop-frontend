<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface PublishedNotice {
  id?: string
  title?: string
  status?: string
  sroNumber?: string
  publishedDateTime?: string
  [key: string]: any
}

interface PublishedNoticesResponse {
  status?: number
  message?: string
  data?: {
    items: PublishedNotice[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

// Published notices state
const publishedNotices = ref<PublishedNotice[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// Fetch published notices
const fetchPublishedNotices = async (page: number = 1) => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<PublishedNoticesResponse>(
      `${API_BASE_URL}/api/publisher-notices`,
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
      publishedNotices.value = response.data.items || []
      totalCount.value = response.data.totalCount || 0
      currentPage.value = response.data.currentPage || page
      totalPages.value = response.data.totalPages || 1
      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
    }
  } catch (err: any) {
    console.error('Error fetching published notices:', err)
    error.value = err.data?.message || err.message || 'Failed to load published notices'
  } finally {
    isLoading.value = false
  }
}

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchPublishedNotices(page)
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

// Fetch published notices on mount
onMounted(() => {
  fetchPublishedNotices(1)
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <div class="grid grid-cols-12 mb-4">
      <h2 class="text-[#0b2545] col-span-10">Recently Published</h2>

      <div class="col-span-2 flex items-center justify-end gap-2">
        <NuxtLink to="/publisher/search">
          <p class="text-sm hover:cursor-pointer">View All</p>
        </NuxtLink>
        <button
          @click="fetchPublishedNotices(currentPage)"
          class="p-1.5 text-gray-500 hover:text-[#0b2545] transition-colors hover:cursor-pointer"
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
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && publishedNotices.length === 0" class="space-y-3">
      <div v-for="i in 3" :key="i" class="p-4 border border-gray-200 rounded-lg">
        <div class="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div class="flex items-center gap-2">
          <div class="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600 mb-2">{{ error }}</p>
      <button
        @click="fetchPublishedNotices(currentPage)"
        class="text-xs text-red-700 hover:text-red-900 underline"
      >
        Try again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="publishedNotices.length === 0" class="text-center py-8">
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
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </svg>
      <p class="text-sm text-gray-500 mb-4">No published notices found</p>
    </div>

    <!-- Published Notices List -->
    <div v-else class="space-y-3">
      <div
        v-for="notice in publishedNotices"
        :key="notice.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
      >
        <nuxt-link :to="`/publisher/notice/${notice.id}`">
          <button class="text-[#0b2545] hover:underline text-left mb-2 block w-full">
            {{ notice.title || 'Untitled Notice' }}
          </button>
        </nuxt-link>
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <span
            v-if="notice.sroNumber"
            class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded"
          >
            {{ notice.sroNumber }}
          </span>
          <span v-if="notice.publishedDateTime">
            {{ notice.publishedDateTime }}
          </span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"
    >
      <div class="text-sm text-gray-600">
        Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="previousPage"
          :disabled="!hasPrevious || isLoading"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div class="flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 rounded-lg text-sm transition-colors',
              currentPage === page
                ? 'bg-[#0b2545] text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            ]"
            :disabled="isLoading"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="!hasNext || isLoading"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

