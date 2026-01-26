<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface AuditLog {
  id?: string
  createdAt?: string
  status?: string
  title?: string
  message?: string
  [key: string]: any
}

interface AuditLogsResponse {
  status?: number
  message?: string
  data?: {
    items: AuditLog[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

// State
const auditLogs = ref<AuditLog[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalCount = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// Fetch audit logs
const fetchAuditLogs = async (page: number = 1) => {
  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<AuditLogsResponse>(
      `${API_BASE_URL}/api/admin-audit-and-logs`,
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
      auditLogs.value = response.data.items || []
      totalCount.value = response.data.totalCount || 0
      currentPage.value = response.data.currentPage || page
      totalPages.value = response.data.totalPages || 1
      hasNext.value = response.data.hasNext || false
      hasPrevious.value = response.data.hasPrevious || false
    }
  } catch (err: any) {
    console.error('Error fetching audit logs:', err)
    error.value = err.data?.message || err.message || 'Failed to load audit logs'
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '')
  } catch {
    return dateString
  }
}

// Get status badge color
const getStatusColor = (status: string | undefined) => {
  if (!status) return 'bg-gray-100 text-gray-800'

  const statusLower = status.toLowerCase()
  if (statusLower.includes('published')) {
    return 'bg-green-100 text-green-800'
  } else if (statusLower.includes('submitted') || statusLower.includes('draft')) {
    return 'bg-blue-100 text-blue-800'
  } else if (statusLower.includes('reserved')) {
    return 'bg-yellow-100 text-yellow-800'
  } else if (statusLower.includes('error') || statusLower.includes('failed')) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-[#0b2545]/10 text-[#0b2545]'
}

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchAuditLogs(page)
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

// Fetch on mount
onMounted(() => {
  fetchAuditLogs(1)
})
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-[#0b2545]">Audit &amp; Logs</h2>
          <p class="text-sm text-gray-600 mt-1">
            Showing {{ auditLogs.length }} of {{ totalCount }} entries
          </p>
        </div>
        <button
          @click="fetchAuditLogs(currentPage)"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors flex items-center gap-2"
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
          Refresh
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && auditLogs.length === 0" class="space-y-2">
        <div v-for="i in 5" :key="i" class="p-3 border border-gray-200 rounded-lg">
          <div class="flex items-start gap-4">
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600 mb-2">{{ error }}</p>
        <button
          @click="fetchAuditLogs(currentPage)"
          class="text-xs text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      </div>

      <!-- Audit Logs List -->
      <div v-else-if="auditLogs.length > 0" class="space-y-2">
        <div
          v-for="log in auditLogs"
          :key="log.id"
          class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between gap-4 text-sm">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="font-mono text-xs text-gray-500">{{ formatDate(log.createdAt) }}</span>
                <span
                  v-if="log.status"
                  :class="[
                    'px-2 py-0.5 rounded text-xs font-medium',
                    getStatusColor(log.status)
                  ]"
                >
                  {{ log.status }}
                </span>
              </div>
              <div v-if="log.title" class="text-gray-900 mb-1 font-medium">
                {{ log.title }}
              </div>
              <div v-if="log.message" class="text-xs text-gray-500">
                {{ log.message }}
              </div>
            </div>
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
        <p class="text-sm text-gray-500">No audit logs found</p>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between mt-6 pt-6 border-t border-gray-200"
      >
        <div class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total entries)
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
  </div>
</template>

