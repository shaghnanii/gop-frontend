<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue'
import {useAuth} from '~/composables/useAuth'
import {useRuntimeConfig} from '#app'
import { PARTS } from '~/utils/constants/parts'
import { TAGS } from '~/utils/constants/tags'

// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})

const flatParts = computed(() =>
  PARTS.flatMap(group =>
    group.options.map(option => ({
      group: group.label,
      value: option.value,
      label: option.label
    }))
  )
)

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const {getAccessToken} = useAuth()

interface Notice {
  id?: string
  title?: string
  content?: string
  gazettePart?: string
  ministry?: string
  sroNumber?: string
  publishedDate?: string
  tags?: string
  publishedDateTime?: string

  [key: string]: any
}

interface SearchResponse {
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

// Search state
const searchQuery = ref('')
const selectedYear = ref('all')
const selectedGazettePart = ref('all')
const selectedSortBy = ref('Latest')
const selectedTags = ref<string[]>([])

// Results state
const notices = ref<Notice[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// Format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Parse tags string to array
const parseTags = (tagsString: string | undefined): string[] => {
  if (!tagsString) return []
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

// Search notices
const searchNotices = async (page: number = 1) => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Build query parameters
    const params: any = {
      PageNumber: page - 1, // API uses 0-based indexing
      PageSize: pageSize.value
    }

    // Add search query
    if (searchQuery.value.trim()) {
      params.Query = searchQuery.value.trim()
    }

    // Add year (skip if "all")
    if (selectedYear.value && selectedYear.value !== 'all') {
      params.Year = selectedYear.value
    }

    // Add gazette part (skip if "all")
    if (selectedGazettePart.value && selectedGazettePart.value !== 'all') {
      params.GazettePart = selectedGazettePart.value
    }

    // Add sort by
    if (selectedSortBy.value) {
      // Map UI sort options to API enum values
      const sortMap: Record<string, string> = {
        'Latest First': 'Latest',
        'Oldest First': 'Oldest',
        'Title (A-Z)': 'Title',
        'Ministry': 'Ministry'
      }
      params.SortBy = sortMap[selectedSortBy.value] || 'Latest'
    }

    // Add tags (only if tags are selected)
    if (selectedTags.value.length > 0) {
      params.Tags = selectedTags.value
    }

    const response = await $fetch<SearchResponse>(
      `${API_BASE_URL}/api/publisher-notices/search`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params
      }
    )

    if (response.data) {
      notices.value = response.data.items || []
      totalCount.value = response.data.totalCount || 0
      currentPage.value = response.data.currentPage || page
      totalPages.value = response.data.totalPages || 1
      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
    }
  } catch (err: any) {
    console.error('Error searching notices:', err)
    error.value = err.data?.message || err.message || 'Failed to search notices'
  } finally {
    isLoading.value = false
  }
}

// Handle search input (debounced)
let searchTimeout: NodeJS.Timeout | null = null
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    searchNotices(1)
  }, 500) // 500ms debounce
}

// Handle filter changes
const handleFilterChange = () => {
  currentPage.value = 1
  searchNotices(1)
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedYear.value = 'all'
  selectedGazettePart.value = 'all'
  selectedSortBy.value = 'Latest'
  selectedTags.value = []
  currentPage.value = 1
  searchNotices(1)
}

// Toggle tag selection
const toggleTag = (tagValue: string) => {
  const index = selectedTags.value.indexOf(tagValue)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tagValue)
  }
  handleFilterChange()
}

// Check if tag is selected
const isTagSelected = (tagValue: string) => {
  return selectedTags.value.includes(tagValue)
}

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    searchNotices(page)
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

const currentYear = new Date().getFullYear()

// Initial search on mount
onMounted(() => {
  searchNotices(1)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <nav class="flex items-center gap-2 mb-2">
          <NuxtLink to="/publisher/dashboard">
            <button class="text-[#377E7F] hover:underline">Dashboard</button>
          </NuxtLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-chevron-right w-4 h-4 text-gray-400" aria-hidden="true">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          <span class="text-[#0b2545]">Published Notices</span></nav>
        <h1 class="text-[#0b2545] mb-2">Published Notices</h1>
        <p class="text-gray-600">View and manage all published gazette notifications</p></div>
      <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
               aria-hidden="true">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search by title, SRO number, or ministry..."
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]">
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-funnel w-5 h-5 text-[#0b2545]" aria-hidden="true">
                <path
                  d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>
              </svg>
              <h3 class="text-[#0b2545]">Filters</h3></div>
            <div class="mb-6"><label class="block text-sm text-gray-700 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-calendar w-4 h-4 inline mr-1" aria-hidden="true">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Year
            </label>
              <select v-model="selectedYear"
                      @change="handleFilterChange"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] text-sm">
                <option value="all">All Years</option>
                <template v-for="i in 7">
                  <option :value="currentYear - (i - 1)">{{ currentYear - (i - 1) }}</option>
                </template>
              </select>
            </div>
            <div class="mb-6"><label class="block text-sm text-gray-700 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-file-text w-4 h-4 inline mr-1" aria-hidden="true">
                <path
                  d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Gazette Type</label>
              <div class="space-y-2">
                <template v-for="(item, index) in flatParts">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="selectedGazettePart"
                      @change="handleFilterChange"
                      type="radio"
                      name="gazettePart"
                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                      :value="item.value"
                    >
                    <span class="text-sm text-gray-700">{{ item.label}}</span>
                  </label>
                </template>
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-sm text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag w-4 h-4 inline mr-1" aria-hidden="true">
                  <path
                    d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </svg>
                Tags
            </label>
               <div class="space-y-2 max-h-48 overflow-y-auto">
                 <template v-for="item in TAGS" :key="item.value">
                   <label class="flex items-center gap-2 cursor-pointer">
                     <input
                       type="checkbox"
                       :checked="isTagSelected(item.value)"
                       @change="toggleTag(item.value)"
                       class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"
                     >
                     <span class="text-sm text-gray-700">{{ item.label }}</span>
                   </label>
                 </template>
               </div>
            </div>
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 text-sm text-[#377E7F] border border-[#377E7F] rounded-lg hover:bg-[#377E7F] hover:text-white transition-colors">
              Clear All Filters
            </button>
          </div>
        </div>
        <div class="lg:col-span-3">
          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="border-b border-gray-200 px-6 py-4">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600">
                  Showing <span class="text-[#0b2545]">{{ notices.length }}</span> of <span
                  class="text-[#0b2545]">{{ totalCount }}</span> notices
                </p>
                <select
                  v-model="selectedSortBy"
                  @change="handleFilterChange"
                  class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                >
                  <option>Latest First</option>
                  <option>Oldest First</option>
                  <option>Title (A-Z)</option>
                  <option>Ministry</option>
                </select>
              </div>
            </div>
            <!-- Loading State -->
            <div v-if="isLoading && notices.length === 0" class="divide-y divide-gray-200">
              <div v-for="i in 5" :key="i" class="px-6 py-5">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div class="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div class="flex gap-2">
                      <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-6">
              <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-600 mb-2">{{ error }}</p>
                <button
                  @click="searchNotices(currentPage)"
                  class="text-xs text-red-700 hover:text-red-900 underline"
                >
                  Try again
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="notices.length === 0" class="p-12 text-center">
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
                <path
                  d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              <p class="text-sm text-gray-500">No notices found</p>
            </div>

            <!-- Results List -->
            <div v-else class="divide-y divide-gray-200">
              <NuxtLink
                v-for="notice in notices"
                :key="notice.id"
                :to="`/publisher/notice/${notice.id}`"
                class="block w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                      <span v-if="notice.sroNumber" class="text-sm text-[#377E7F]">
                        {{ notice.sroNumber }}
                      </span>
                      <span
                        v-if="notice.gazettePart"
                        class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded"
                      >
                        {{ notice.gazettePart }}
                      </span>
                      <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span>
                    </div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">
                      {{ notice.title || 'Untitled Notice' }}
                    </h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2 flex-wrap">
                      <span v-if="notice.ministry">{{ notice.ministry }}</span>
                      <span v-if="notice.ministry && notice.publishedDate">•</span>
                      <span v-if="notice.publishedDate">{{ formatDate(notice.publishedDate) }}</span>
                    </div>
                    <div v-if="notice.tags" class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in parseTags(notice.tags)"
                        :key="tag"
                        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </NuxtLink>
            </div>
            <div v-if="totalPages > 1" class="border-t border-gray-200 px-6 py-4">
              <div class="flex items-center justify-between">
                <button
                  @click="previousPage"
                  :disabled="!hasPrevious || isLoading"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div class="flex items-center gap-2">
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-1 rounded text-sm transition-colors',
                      currentPage === page
                        ? 'bg-[#0b2545] text-white'
                        : 'hover:bg-gray-100'
                    ]"
                    :disabled="isLoading"
                  >
                    {{ page }}
                  </button>
                </div>
                <button
                  @click="nextPage"
                  :disabled="!hasNext || isLoading"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
