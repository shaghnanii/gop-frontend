<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRuntimeConfig } from '#app'

// Protect admin routes - only admin users can access
definePageMeta({
  middleware: 'admin'
})


const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const { getAccessToken } = useAuth()

interface SummaryData {
  totalUsers?: number
  totalUsersGrowthPercent?: number
  publishedLast30Days?: number
  publishedGrowthPercent?: number
}

interface SummaryResponse {
  status?: number
  message?: string
  data?: SummaryData
}

// Summary state
const summaryData = ref<SummaryData>({
  totalUsers: 0,
  totalUsersGrowthPercent: 0,
  publishedLast30Days: 0,
  publishedGrowthPercent: 0
})
const isLoadingSummary = ref(false)
const summaryError = ref<string | null>(null)

// Format number with commas
const formatNumber = (num: number | undefined) => {
  if (num === undefined || num === null) return '0'
  return num.toLocaleString('en-US')
}

// Format growth percentage
const formatGrowth = (percent: number | undefined) => {
  if (percent === undefined || percent === null) return '+0%'
  const sign = percent >= 0 ? '+' : ''
  return `${sign}${percent.toFixed(0)}%`
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

    const response = await $fetch<SummaryResponse>(
      `${API_BASE_URL}/api/admin/summary`,
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
        totalUsers: response.data.totalUsers || 0,
        totalUsersGrowthPercent: response.data.totalUsersGrowthPercent || 0,
        publishedLast30Days: response.data.publishedLast30Days || 0,
        publishedGrowthPercent: response.data.publishedGrowthPercent || 0
      }
    }
  } catch (err: any) {
    console.error('Error fetching summary:', err)
    summaryError.value = err.data?.message || err.message || 'Failed to load summary'
    // Set default values on error
    summaryData.value = {
      totalUsers: 0,
      totalUsersGrowthPercent: 0,
      publishedLast30Days: 0,
      publishedGrowthPercent: 0
    }
  } finally {
    isLoadingSummary.value = false
  }
}

// Fetch summary on mount
onMounted(() => {
  fetchSummary()
})

// Tab definitions
const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'activity'
  },
  {
    id: 'users',
    label: 'Users & Roles',
    icon: 'users'
  },
  {
    id: 'sro',
    label: 'SRO Rules',
    icon: 'file-text'
  },
  {
    id: 'audit',
    label: 'Audit & Logs',
    icon: 'shield'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'trending-up'
  }
]

// Active tab state
const activeTab = ref('overview')

// Lazy load tab components
const tabComponents = {
  overview: defineAsyncComponent(() => import('~/components/admin/OverviewTab.vue')),
  users: defineAsyncComponent(() => import('~/components/admin/UsersRolesTab.vue')),
  sro: defineAsyncComponent(() => import('~/components/admin/SRORulesTab.vue')),
  audit: defineAsyncComponent(() => import('~/components/admin/AuditLogsTab.vue')),
  analytics: defineAsyncComponent(() => import('~/components/admin/AnalyticsTab.vue'))
}

// Get current tab component
const currentTabComponent = computed(() => {
  return tabComponents[activeTab.value as keyof typeof tabComponents]
})

// Tab click handler
const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8"><h1 class="text-[#0b2545] mb-2">Super Admin Dashboard</h1>
        <p class="text-gray-600">System Administration &amp; Configuration</p></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-users w-5 h-5" aria-hidden="true" style="color: rgb(11, 37, 69);">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <span v-if="isLoadingSummary" class="text-2xl text-gray-300 animate-pulse" style="color: rgb(11, 37, 69);">---</span>
            <span v-else class="text-2xl" style="color: rgb(11, 37, 69);">{{ formatNumber(summaryData.totalUsers) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Total Users</div>
            <div class="text-xs" :class="summaryData.totalUsersGrowthPercent >= 0 ? 'text-[#0b6b3a]' : 'text-red-600'">
              {{ formatGrowth(summaryData.totalUsersGrowthPercent) }}
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-file-text w-5 h-5" aria-hidden="true" style="color: rgb(11, 107, 58);">
              <path
                d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <span v-if="isLoadingSummary" class="text-2xl text-gray-300 animate-pulse" style="color: rgb(11, 107, 58);">---</span>
            <span v-else class="text-2xl" style="color: rgb(11, 107, 58);">{{ formatNumber(summaryData.publishedLast30Days) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Published (30d)</div>
            <div class="text-xs" :class="summaryData.publishedGrowthPercent >= 0 ? 'text-[#0b6b3a]' : 'text-red-600'">
              {{ formatGrowth(summaryData.publishedGrowthPercent) }}
            </div>
          </div>
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
      <!-- Tabs Navigation -->
      <div class="rounded-lg mb-6">
        <div class="flex bg-white rounded-lg flex-wrap border-b border-gray-200 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            :class="[
              'px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'border-[#0b2545] text-[#0b2545] font-medium'
                : 'border-transparent text-gray-600 hover:text-[#0b2545] hover:border-gray-300'
            ]"
            :aria-selected="activeTab === tab.id"
            role="tab"
          >
            <svg
              v-if="tab.icon === 'activity'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            </svg>
            <svg
              v-else-if="tab.icon === 'users'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <svg
              v-else-if="tab.icon === 'file-text'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <svg
              v-else-if="tab.icon === 'shield'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
            <svg
              v-else-if="tab.icon === 'trending-up'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content with Lazy Loading -->
        <div class="pt-6" role="tabpanel">
          <Suspense>
            <template #default>
              <component :is="currentTabComponent" />
            </template>
            <template #fallback>
              <div class="flex items-center justify-center py-12">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b2545] mb-4"></div>
                  <p class="text-sm text-gray-600">Loading...</p>
                </div>
              </div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
