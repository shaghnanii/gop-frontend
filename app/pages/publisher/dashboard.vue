<script setup lang="ts">
// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
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
                 class="lucide lucide-pen-tool w-5 h-5 text-[#0b2545]" aria-hidden="true">
              <path
                d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
              <path
                d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
              <path d="m2.3 2.3 7.286 7.286"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
            <span class="text-2xl text-[#0b2545]">24</span></div>
          <div class="text-sm text-gray-600">Total Publishers</div>
        </div>
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
            <span class="text-2xl text-[#0b6b3a]">42</span></div>
          <div class="text-sm text-gray-600">Notices Published (Last 30 Days)</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-bell w-5 h-5 text-[#377E7F]" aria-hidden="true">
              <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
              <path
                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
            </svg>
            <span class="text-2xl text-[#377E7F]">5</span></div>
          <div class="text-sm text-gray-600">Recent Activity (Last 5 Audit Logs)</div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4"><h2 class="text-[#0b2545]">My Drafts</h2>
              <button class="text-sm text-gray-600 hover:text-[#0b2545]">View All</button>
            </div>
            <div class="space-y-3">
              <div class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div class="flex items-start justify-between gap-4 mb-2">
                  <button class="text-[#0b2545] hover:underline text-left flex-1">Amendment to Telecom Licensing Rules
                  </button>
                  <span class="px-2 py-1 rounded text-xs whitespace-nowrap bg-blue-100 text-blue-700">In Progress</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Updated 2 hours ago</div>
                  <div class="flex gap-2">
                    <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">Edit</button>
                    <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">Delete</button>
                  </div>
                </div>
              </div>
              <div class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div class="flex items-start justify-between gap-4 mb-2">
                  <button class="text-[#0b2545] hover:underline text-left flex-1">S.R.O. for Spectrum Allocation
                  </button>
                  <span class="px-2 py-1 rounded text-xs whitespace-nowrap bg-yellow-100 text-yellow-700">Pending Validation</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">Updated 1 day ago</div>
                  <div class="flex gap-2">
                    <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">Edit</button>
                    <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="mt-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-plus w-4 h-4" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              New Draft
            </button>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4"><h2 class="text-[#0b2545]">Recently Published</h2>
              <button class="text-sm text-gray-600 hover:text-[#0b2545]">View All</button>
            </div>
            <div class="space-y-3">
              <div class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <button class="text-[#0b2545] hover:underline text-left mb-2 block">IT Policy Framework 2024</button>
                <div class="flex items-center gap-2 text-xs text-gray-600"><span
                  class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded">S.R.O. 1234(I)/2024</span><span>Published 2024-11-20</span>
                </div>
              </div>
              <div class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <button class="text-[#0b2545] hover:underline text-left mb-2 block">Cybersecurity Standards Update
                </button>
                <div class="flex items-center gap-2 text-xs text-gray-600"><span
                  class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded">S.R.O. 1198(I)/2024</span><span>Published 2024-11-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-bell w-5 h-5 text-[#0b2545]" aria-hidden="true">
                <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                <path
                  d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
              </svg>
              <h3 class="text-[#0b2545]">Notifications</h3></div>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div class="text-sm text-gray-900 mb-1">Successfully Published</div>
                <div class="text-xs text-gray-600">Your gazette has been successfully published.</div>
                <div class="text-xs text-gray-500 mt-1">2 hours ago</div>
              </div>
              <div class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="text-sm text-gray-900 mb-1">Reviewer Comments Added</div>
                <div class="text-xs text-gray-600">New review comments have been added to your gazette submission.</div>
                <div class="text-xs text-gray-500 mt-1">5 hours ago</div>
              </div>
              <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="text-sm text-gray-900 mb-1">Draft Submission Confirmed</div>
                <div class="text-xs text-gray-600">Your gazette draft has been submitted for review.</div>
                <div class="text-xs text-gray-500 mt-1">1 day ago</div>
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
