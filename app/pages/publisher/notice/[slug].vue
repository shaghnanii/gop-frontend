<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useAuth} from '~/composables/useAuth'
import {useRuntimeConfig} from '#app'

// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})

const route = useRoute()
const config = useRuntimeConfig()
const API_BASE_URL = config.public.baseURL
const {getAccessToken} = useAuth()

interface ActReference {
  id?: string
  title?: string
}

interface NoticeDetail {
  id?: string
  title?: string
  htmlContent?: string
  sroNumber?: string
  gazettePart?: string
  ministry?: string
  issuingAuthorityName?: string
  tags?: string
  previewUrl?: string
  pdfUrl?: string
  status?: string
  effectiveDate?: string
  publishedDateTime?: string
  actReference?: ActReference[]

  [key: string]: any
}

interface NoticeDetailResponse {
  status?: number
  message?: string
  data?: NoticeDetail
}

// Notice state
const notice = ref<NoticeDetail | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Format date short
const formatDateShort = (dateString: string | undefined) => {
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

// Copy URL to clipboard
const copyUrl = async () => {
  if (notice.value?.previewUrl) {
    try {
      await navigator.clipboard.writeText(notice.value.previewUrl)
      // You could show a toast here
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }
}

// Download PDF
const downloadPDF = async () => {
  if (!notice.value?.pdfUrl) return

  try {
    const response = await fetch(notice.value.pdfUrl)
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = notice.value.title
      ? `${notice.value.title}.pdf`
      : 'document.pdf'

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download PDF', error)
  }
}


// Fetch notice details
const fetchNoticeDetails = async () => {
  const noticeId = route.params.slug as string
  if (!noticeId) {
    error.value = 'Notice ID is required'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const token = getAccessToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await $fetch<NoticeDetailResponse>(
      `${API_BASE_URL}/api/publisher-notices/${noticeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data) {
      notice.value = response.data
    }
  } catch (err: any) {
    console.error('Error fetching notice details:', err)
    error.value = err.data?.message || err.message || 'Failed to load notice details'
  } finally {
    isLoading.value = false
  }
}

// Fetch on mount
onMounted(() => {
  fetchNoticeDetails()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <NuxtLink to="/publisher/dashboard" class="hover:text-[#0b2545]">Dashboard</NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-chevron-right w-4 h-4" aria-hidden="true">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <NuxtLink to="/publisher/search" class="hover:text-[#0b2545]">Published Notices</NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-chevron-right w-4 h-4" aria-hidden="true">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span class="text-[#0b2545]">{{ notice?.title || 'Loading...' }}</span>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-8">
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white border border-red-200 rounded-lg p-6">
        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600 mb-2">{{ error }}</p>
          <button
            @click="fetchNoticeDetails"
            class="text-xs text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>
      </div>

      <!-- Notice Content -->
      <div v-else-if="notice" class="grid grid-cols-1 gap-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <!-- Notice Header -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <div class="flex items-start justify-between gap-2 mb-3 flex-wrap">
              <span
                v-if="notice.gazettePart"
                class="px-3 py-1 bg-[#377E7F]/10 text-[#377E7F] text-sm rounded"
              >
                {{ notice.gazettePart }}
              </span>
                <span
                  v-if="notice.status === 'published'"
                  class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded"
                >
                Verified
              </span>
              </div>
              <h1 class="text-[#0b2545] mb-3">{{ notice.title || 'Untitled Notice' }}</h1>
              <p v-if="notice.sroNumber" class="text-gray-600 mb-4">
                {{ notice.sroNumber }}
              </p>
              <div class="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                <span v-if="notice.ministry">{{ notice.ministry }}</span>
                <span v-if="notice.ministry && notice.publishedDateTime">•</span>
                <span v-if="notice.publishedDateTime">
                Published: {{ formatDateShort(notice.publishedDateTime) }}
              </span>
                <span v-if="notice.effectiveDate && notice.publishedDateTime">•</span>
                <span v-if="notice.effectiveDate">
                Effective: {{ formatDateShort(notice.effectiveDate) }}
              </span>
              </div>
            </div>
            <!-- Notice Content -->
            <div class="bg-white border border-gray-200 rounded-lg p-8">
              <div
                v-if="notice.htmlContent"
                class="max-w-3xl mx-auto prose prose-sm max-w-none"
                v-html="notice.htmlContent"
              ></div>
              <div v-else class="text-center py-12 text-gray-500">
                <p>No content available</p>
              </div>
              <!--              if the document is digitally signed-->
              <div class="">
                <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           class="lucide lucide-check w-6 h-6 text-white" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-green-900 mb-1"><strong>Digitally Signed &amp; Verified</strong></p>
                      <p class="text-xs text-green-700 mb-2">This document has been digitally signed using PKI certificate and verified by the Gazette of Pakistan.</p>
                      <div class="text-xs text-green-700 space-y-1">
                        <p>Signature Date: 15 Dec 2024, 14:32 PKT</p>
                        <p>Verification Code: <span class="font-mono">GZT-PKI-2024-1544-A7F3</span></p>
                        <button class="text-green-800 hover:underline">View Certificate Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Download Options -->
            <div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-[#0b2545] mb-4">Download
              Options</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  @click="downloadPDF"
                  class="flex items-center justify-center gap-3 px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-download w-5 h-5" aria-hidden="true">
                    <path d="M12 15V3"></path>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <path d="m7 10 5 5 5-5"></path>
                  </svg>
                  <span>Download PDF</span></button>
                <button
                  class="flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-code w-5 h-5" aria-hidden="true">
                    <path d="m16 18 6-6-6-6"></path>
                    <path d="m8 6-6 6 6 6"></path>
                  </svg>
                  <span>Download XML</span></button>
                <button
                  class="flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-file-text w-5 h-5" aria-hidden="true">
                    <path
                      d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                    <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                  <span>Akoma Ntoso</span></button>
                <button
                  class="flex items-center justify-center gap-3 px-6 py-3 border border-[#377E7F] text-[#377E7F] rounded-lg hover:bg-[#377E7F] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-share2 lucide-share-2 w-5 h-5" aria-hidden="true">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                  </svg>
                  <span>Share</span></button>
              </div>
              <p class="text-xs text-gray-500 mt-4">All downloads are certified copies and include digital signature
                verification</p></div>
            <!-- Act References -->
            <div v-if="notice.actReference && notice.actReference.length > 0"
                 class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-[#0b2545] mb-4">References &amp; Related Acts</h3>
              <div class="space-y-3">
                <div
                  v-for="ref in notice.actReference"
                  :key="ref.id"
                  class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <p class="text-sm text-[#377E7F] mb-1">
                    {{ ref.title || 'Untitled Reference' }}
                  </p>
                  <p v-if="ref.id" class="text-xs text-gray-600">Reference ID: {{ ref.id }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-6"><h3 class="text-[#0b2545] mb-4">
              Metadata Details</h3>
              <div class="space-y-4 text-sm">
                <div v-if="notice.sroNumber">
                  <div class="text-xs text-gray-500 mb-1">SRO Number</div>
                  <div class="text-gray-900">{{ notice.sroNumber }}</div>
                </div>
                <div v-if="notice.gazettePart" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Gazette Part</div>
                  <div class="text-gray-900">{{ notice.gazettePart }}</div>
                </div>
                <div v-if="notice.ministry" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Issuing Ministry</div>
                  <div class="text-gray-900">{{ notice.ministry }}</div>
                </div>
                <div v-if="notice.issuingAuthorityName" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Issuing Authority</div>
                  <div class="text-gray-900">{{ notice.issuingAuthorityName }}</div>
                </div>
                <div v-if="notice.publishedDateTime" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Published Date</div>
                  <div class="text-gray-900">{{ formatDate(notice.publishedDateTime) }}</div>
                </div>
                <div v-if="notice.effectiveDate" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Effective Date</div>
                  <div class="text-gray-900">{{ formatDate(notice.effectiveDate) }}</div>
                </div>
                <div v-if="notice.tags && parseTags(notice.tags).length > 0" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-2">Tags</div>
                  <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in parseTags(notice.tags)"
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {{ tag }}
                  </span>
                  </div>
                </div>
                <div v-if="notice.previewUrl" class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Permanent URL</div>
                  <div class="text-xs text-gray-900 break-all">{{ notice.previewUrl }}</div>
                  <button
                    @click="copyUrl"
                    class="mt-2 text-xs text-[#377E7F] hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-copy w-3 h-3" aria-hidden="true">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    Copy URL
                  </button>
                </div>
                <div class="pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500 mb-1">Digital Signature</div>
                  <div class="flex items-center gap-1 text-green-700 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-check w-3 h-3" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prose styling for HTML content */
.prose {
  color: #374151;
  max-width: 65ch;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose :where(h1, h2, h3, h4, h5, h6):not(:where([class~="not-prose"] *)) {
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #0b2545;
}

.prose :where(strong):not(:where([class~="not-prose"] *)) {
  font-weight: 600;
  color: #0b2545;
}

.prose :where(table):not(:where([class~="not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}

.prose :where(thead):not(:where([class~="not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
}

.prose :where(thead th):not(:where([class~="not-prose"] *)) {
  color: #0b2545;
  font-weight: 600;
  vertical-align: bottom;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

.prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
}

.prose :where(tbody td):not(:where([class~="not-prose"] *)) {
  vertical-align: baseline;
  padding-top: 0.5714286em;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

.prose :where(ul, ol):not(:where([class~="not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose :where(li):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
