<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface Draft {
  id?: string
  title?: string
  status?: string
  sroNumber?: string
  publishedDateTime?: string
  [key: string]: any
}

interface DraftsResponse {
  status?: number
  message?: string
  data?: {
    items: Draft[]
    totalCount: number
    pageNumber: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
    totalPages: number
    currentPage: number
  }
}

// Drafts state
const drafts = ref<Draft[]>([])
const isLoadingDrafts = ref(false)
const draftsError = ref<string | null>(null)
const draftsCurrentPage = ref(1)
const draftsPageSize = ref(10)
const draftsTotalPages = ref(1)
const draftsTotalCount = ref(0)
const draftsHasNext = ref(false)
const draftsHasPrevious = ref(false)

// Delete confirmation state
const showDeleteModal = ref(false)
const draftToDelete = ref<Draft | null>(null)
const isDeleting = ref(false)

// Toast state
const toastMessage = ref<string | null>(null)
const toastType = ref<'success' | 'error'>('success')
const showToast = ref(false)

// Fetch drafts
const fetchDrafts = async (page: number = 1) => {
  isLoadingDrafts.value = true
  draftsError.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<DraftsResponse>(
      `${API_BASE_URL}/api/publisher-notices/drafts`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: {
          PageNumber: page - 1, // API uses 0-based indexing
          PageSize: draftsPageSize.value
        }
      }
    )

    if (response.data) {
      drafts.value = response.data.items || []
      draftsTotalCount.value = response.data.totalCount || 0
      draftsCurrentPage.value = response.data.currentPage || page
      draftsTotalPages.value = response.data.totalPages || 1
      draftsHasNext.value = response.data.hasNext || false
      draftsHasPrevious.value = response.data.hasPrevious || false
    }
  } catch (err: any) {
    console.error('Error fetching drafts:', err)
    draftsError.value = err.data?.message || err.message || 'Failed to load drafts'
  } finally {
    isLoadingDrafts.value = false
  }
}

// Get status badge color
const getStatusColor = (status: string | undefined) => {
  if (!status) return 'bg-gray-100 text-gray-700'

  const statusLower = status.toLowerCase()
  if (statusLower === 'draft') {
    return 'bg-blue-100 text-blue-700'
  } else if (statusLower.includes('progress') || statusLower.includes('in progress')) {
    return 'bg-blue-100 text-blue-700'
  } else if (statusLower.includes('pending') || statusLower.includes('validation')) {
    return 'bg-yellow-100 text-yellow-700'
  } else if (statusLower.includes('published')) {
    return 'bg-green-100 text-green-700'
  } else if (statusLower.includes('rejected')) {
    return 'bg-red-100 text-red-700'
  }
  return 'bg-gray-100 text-gray-700'
}

// Pagination handlers
const goToDraftsPage = (page: number) => {
  if (page >= 1 && page <= draftsTotalPages.value && page !== draftsCurrentPage.value) {
    fetchDrafts(page)
  }
}

const nextDraftsPage = () => {
  if (draftsHasNext.value) {
    goToDraftsPage(draftsCurrentPage.value + 1)
  }
}

const previousDraftsPage = () => {
  if (draftsHasPrevious.value) {
    goToDraftsPage(draftsCurrentPage.value - 1)
  }
}

// Show delete confirmation
const confirmDelete = (draft: Draft) => {
  draftToDelete.value = draft
  showDeleteModal.value = true
}

// Cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false
  draftToDelete.value = null
}

// Delete draft
const deleteDraft = async () => {
  if (!draftToDelete.value?.id) return

  isDeleting.value = true

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<{
      status?: number
      message?: string
    }>(
      `${API_BASE_URL}/api/publisher-notices/${draftToDelete.value.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.status === 200) {
      // Show success toast
      toastMessage.value = response.message || 'Notice deleted successfully!'
      toastType.value = 'success'
      showToast.value = true
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        showToast.value = false
      }, 3000)

      // Close modal
      showDeleteModal.value = false
      draftToDelete.value = null

      // Refresh drafts list
      await fetchDrafts(draftsCurrentPage.value)
    }
  } catch (err: any) {
    console.error('Error deleting draft:', err)
    toastMessage.value = err.data?.message || err.message || 'Failed to delete notice'
    toastType.value = 'error'
    showToast.value = true
    
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  } finally {
    isDeleting.value = false
  }
}

// Fetch drafts on mount
onMounted(() => {
  fetchDrafts(1)
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0b2545]">My Drafts</h2>
      <button
        @click="fetchDrafts(draftsCurrentPage)"
        class="p-1.5 text-gray-500 hover:text-[#0b2545] transition-colors"
        title="Refresh"
        :disabled="isLoadingDrafts"
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
          :class="{ 'animate-spin': isLoadingDrafts }"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
        </svg>
      </button>
    </div>

    <!-- New Draft Button -->
    <NuxtLink to="/publisher/notice/create?draft=true">
      <button class="mb-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center gap-2 hover:cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-plus w-4 h-4" aria-hidden="true">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New Draft
      </button>
    </NuxtLink>

    <!-- Loading State -->
    <div v-if="isLoadingDrafts && drafts.length === 0" class="space-y-3">
      <div v-for="i in 3" :key="i" class="p-4 border border-gray-200 rounded-lg">
        <div class="flex items-start justify-between gap-4 mb-2">
          <div class="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div class="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div class="flex gap-2">
            <div class="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div class="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="draftsError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600 mb-2">{{ draftsError }}</p>
      <button
        @click="fetchDrafts(draftsCurrentPage)"
        class="text-xs text-red-700 hover:text-red-900 underline"
      >
        Try again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="drafts.length === 0" class="text-center py-8">
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
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
        <path d="m2.3 2.3 7.286 7.286"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
      <p class="text-sm text-gray-500 mb-4">No drafts found</p>
    </div>

    <!-- Drafts List -->
    <div v-else class="space-y-3">
      <div
        v-for="draft in drafts"
        :key="draft.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
      >
        <div class="flex items-start justify-between gap-4 mb-2">
          <div class="flex-1">
            <button class="text-[#0b2545] hover:underline text-left w-full">
              {{ draft.title || 'Untitled Draft' }}
            </button>
            <div v-if="draft.sroNumber" class="text-xs text-gray-600 mt-1">
              {{ draft.sroNumber }}
            </div>
          </div>
          <span
            v-if="draft.status"
            :class="[
              'px-2 py-1 rounded text-xs whitespace-nowrap',
              getStatusColor(draft.status)
            ]"
          >
            {{ draft.status }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-500">
            {{ draft.publishedDateTime || 'No update time' }}
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button>
            <button
              @click="confirmDelete(draft)"
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="draftsTotalPages > 1"
      class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"
    >
      <div class="text-sm text-gray-600">
        Page {{ draftsCurrentPage }} of {{ draftsTotalPages }} ({{ draftsTotalCount }} total)
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="previousDraftsPage"
          :disabled="!draftsHasPrevious || isLoadingDrafts"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div class="flex items-center gap-1">
          <button
            v-for="page in draftsTotalPages"
            :key="page"
            @click="goToDraftsPage(page)"
            :class="[
              'px-3 py-2 rounded-lg text-sm transition-colors',
              draftsCurrentPage === page
                ? 'bg-[#0b2545] text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            ]"
            :disabled="isLoadingDrafts"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextDraftsPage"
          :disabled="!draftsHasNext || isLoadingDrafts"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="cancelDelete"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-red-600"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Delete Notice</h3>
            </div>
            <p class="text-sm text-gray-600 mb-2">
              Are you sure you want to delete this notice?
            </p>
            <p class="text-sm font-medium text-gray-900 mb-6">
              "{{ draftToDelete?.title || 'Untitled Draft' }}"
            </p>
            <p class="text-xs text-gray-500 mb-6">
              This action cannot be undone. The notice will be permanently deleted.
            </p>
            <div class="flex items-center gap-3">
              <button
                @click="cancelDelete"
                :disabled="isDeleting"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                @click="deleteDraft"
                :disabled="isDeleting"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isDeleting"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="animate-spin"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
                </svg>
                {{ isDeleting ? 'Deleting...' : 'Yes, Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="showToast"
          :class="[
            'fixed bottom-4 right-4 z-[9999] max-w-md w-full p-4 rounded-lg shadow-lg flex items-center gap-3',
            toastType === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          ]"
        >
          <svg
            v-if="toastType === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-green-600 flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-red-600 flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p
            :class="[
              'text-sm flex-1',
              toastType === 'success' ? 'text-green-800' : 'text-red-800'
            ]"
          >
            {{ toastMessage }}
          </p>
          <button
            @click="showToast = false"
            class="text-gray-400 hover:text-gray-600 transition-colors"
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
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

