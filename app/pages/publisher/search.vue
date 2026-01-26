<script setup lang="ts">
// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <nav class="flex items-center gap-2 mb-2">
          <button class="text-[#377E7F] hover:underline">Dashboard</button>
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
          <input type="text" placeholder="Search by title, SRO number, or ministry..."
                 class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
                 value=""></div>
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
              Year</label><select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] text-sm">
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select></div>
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
              <div class="space-y-2"><label class="flex items-center gap-2 cursor-pointer"><input type="radio"
                                                                                                  name="gazettePart"
                                                                                                  class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                                                                                                  value="all"
                                                                                                  checked=""><span
                class="text-sm text-gray-700">All Parts</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="radio" name="gazettePart"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                                                                      value="Part I"><span
                class="text-sm text-gray-700">Part I — Acts &amp; Ordinances</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="radio" name="gazettePart"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                                                                      value="Part II"><span
                class="text-sm text-gray-700">Part II — S.R.O.</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="radio" name="gazettePart"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545]"
                                                                      value="Part III"><span
                class="text-sm text-gray-700">Part III — Administrative</span></label></div>
            </div>
            <div class="mb-6"><label class="block text-sm text-gray-700 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-tag w-4 h-4 inline mr-1" aria-hidden="true">
                <path
                  d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              Tags</label>
              <div class="space-y-2 max-h-48 overflow-y-auto"><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Service Rules</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Allowances</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Foreign Service</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Telecom</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Licensing</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Regulation</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Tax</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Finance</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Revenue</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Corporate Law</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Companies</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Amendment</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Appointments</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Administrative</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Personnel</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Criminal Law</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Legal Reform</span></label><label
                class="flex items-center gap-2 cursor-pointer"><input type="checkbox"
                                                                      class="w-4 h-4 text-[#0b2545] focus:ring-[#0b2545] rounded"><span
                class="text-sm text-gray-700">Justice</span></label></div>
            </div>
            <button
              class="w-full px-4 py-2 text-sm text-[#377E7F] border border-[#377E7F] rounded-lg hover:bg-[#377E7F] hover:text-white transition-colors">
              Clear All Filters
            </button>
          </div>
        </div>
        <div class="lg:col-span-3">
          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="border-b border-gray-200 px-6 py-4">
              <div class="flex items-center justify-between"><p class="text-sm text-gray-600">Showing <span
                class="text-[#0b2545]">6</span> of <span class="text-[#0b2545]">6</span> notices</p><select
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2545]">
                <option>Sort by: Latest First</option>
                <option>Sort by: Oldest First</option>
                <option>Sort by: Title (A-Z)</option>
                <option>Sort by: Ministry</option>
              </select></div>
            </div>
            <div class="divide-y divide-gray-200">
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span
                      class="text-sm text-[#377E7F]">S.R.O. 1544(I)/2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part II</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">Foreign Service
                      Allowance Revision — 2025</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Ministry of Foreign Affairs</span><span>•</span><span>15 Dec 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Service Rules</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Allowances</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Foreign Service</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span
                      class="text-sm text-[#377E7F]">S.R.O. 1521(I)/2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part II</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">Pakistan
                      Telecommunication (Re-organization) Amendment Rules, 2024</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Ministry of IT &amp; Telecom</span><span>•</span><span>10 Dec 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Telecom</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Licensing</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Regulation</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span
                      class="text-sm text-[#377E7F]">S.R.O. 1498(I)/2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part II</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">Income Tax (Amendment)
                      Rules, 2024</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Ministry of Finance</span><span>•</span><span>05 Dec 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Tax</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Finance</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Revenue</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span
                      class="text-sm text-[#377E7F]">Act No. XII of 2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part I</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">The Companies
                      (Amendment) Act, 2024</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Ministry of Commerce</span><span>•</span><span>01 Dec 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Corporate Law</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Companies</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Amendment</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span class="text-sm text-[#377E7F]">Notification No. 458/2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part III</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">Appointment of
                      Additional Secretary (Establishment Division)</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Establishment Division</span><span>•</span><span>28 Nov 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Appointments</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Administrative</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Personnel</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
              <button class="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left group">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2"><span
                      class="text-sm text-[#377E7F]">S.R.O. 1402(I)/2024</span><span
                      class="px-2 py-0.5 bg-[#377E7F]/10 text-[#377E7F] text-xs rounded">Part II</span><span
                      class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Verified</span></div>
                    <h4 class="text-[#0b2545] mb-2 group-hover:text-[#377E7F] transition-colors">Pakistan Penal Code
                      (Amendment) Rules, 2024</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Ministry of Law &amp; Justice</span><span>•</span><span>22 Nov 2024</span></div>
                    <div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Criminal Law</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Legal Reform</span><span
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Justice</span></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-chevron-right w-5 h-5 text-gray-400 group-hover:text-[#377E7F] flex-shrink-0 mt-1"
                       aria-hidden="true">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
            </div>
            <div class="border-t border-gray-200 px-6 py-4">
              <div class="flex items-center justify-between">
                <button
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1 bg-[#0b2545] text-white rounded text-sm">1</button>
                  <button class="px-3 py-1 hover:bg-gray-100 rounded text-sm">2</button>
                  <button class="px-3 py-1 hover:bg-gray-100 rounded text-sm">3</button>
                  <span class="text-gray-500">...</span>
                  <button class="px-3 py-1 hover:bg-gray-100 rounded text-sm">10</button>
                </div>
                <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Next</button>
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
