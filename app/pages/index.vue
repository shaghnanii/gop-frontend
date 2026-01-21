<script setup lang="ts">
</script>

<template>
  <div>
    <div class="bg-gradient-to-br from-[#377E7F] to-[#3A715E] text-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-white" style="font-size: 60px; font-weight: bold; padding: 80px 200px 60px;">Pakistan Digital Gazette</h1>
          <p class="text-lg text-gray-100 max-w-2xl mx-auto mb-6">The official digital source for government notifications, laws, SROs, rules, tenders, appointments, and executive orders.</p>
          <div class="flex flex-wrap items-center justify-center gap-4 mb-[60px]">
            <button class="px-6 py-3 bg-white text-[#377E7F] rounded-lg hover:bg-gray-100 transition-colors">
              Browse All
            </button>
            <button
              class="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
              Recently Published
            </button>
          </div>
        </div>
        <div class="max-w-3xl mx-auto">
          <div class="bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg overflow-hidden">
            <div class="flex flex-wrap border-b-2 border-white">
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-white text-[#377E7F] border-white">
                All
              </button>
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-white hover:bg-white/10">
                Federal
              </button>
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-white hover:bg-white/10">
                Punjab
              </button>
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-white hover:bg-white/10">
                Sindh
              </button>
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-white hover:bg-white/10">
                KPK
              </button>
              <button
                class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-white hover:bg-white/10">
                Balochistan
              </button>
            </div>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
                   aria-hidden="true">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              <input type="text" placeholder="Search Gazette by keyword, ministry, date, SRO/Serial number"
                     class="w-full pl-12 pr-4 py-4 text-white placeholder:text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-[#EECA62] focus:border-[#EECA62]">
            </div>
          </div>
          <p class="text-center text-white/90 text-sm mt-4">Every document hosted here is the digitally
            signed, legally binding version of the Official Government Gazette.</p></div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-left group">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            style="background-color: rgba(55, 126, 127, 0.082);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-scale w-6 h-6" aria-hidden="true" style="color: rgb(55, 126, 127);">
              <path d="M12 3v18"></path>
              <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
              <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
              <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
              <path d="M7 21h10"></path>
            </svg>
          </div>
          <h3 class="text-[#377E7F] mb-2">Acts &amp; Ordinances</h3>
          <p class="text-sm text-gray-600 mb-3">Browse and search official publications</p>
          <div class="text-sm text-[#377E7F] hover:underline text-right">Extraordinary Part 1 →</div>
        </button>
        <button
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-left group">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            style="background-color: rgba(58, 113, 94, 0.082);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-file-text w-6 h-6" aria-hidden="true" style="color: rgb(58, 113, 94);">
              <path
                d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
          </div>
          <h3 class="text-[#377E7F] mb-2">S.R.O.s &amp; Rules</h3>
          <p class="text-sm text-gray-600 mb-3">Browse and search official publications</p>
          <div class="text-sm text-[#377E7F] hover:underline text-right">Extraordinary Part 2 →</div>
        </button>
        <button
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-left group">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            style="background-color: rgba(62, 125, 133, 0.082);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-bell w-6 h-6" aria-hidden="true" style="color: rgb(62, 125, 133);">
              <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
              <path
                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
            </svg>
          </div>
          <h3 class="text-[#377E7F] mb-2">Administrative Notifications</h3>
          <p class="text-sm text-gray-600 mb-3">Browse and search official publications</p>
          <div class="text-sm text-[#377E7F] hover:underline text-right">Extraordinary Part 3 →</div>
        </button>
        <button
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-left group">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            style="background-color: rgba(34, 72, 57, 0.082);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-briefcase w-6 h-6" aria-hidden="true" style="color: rgb(34, 72, 57);">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              <rect width="20" height="14" x="2" y="6" rx="2"></rect>
            </svg>
          </div>
          <h3 class="text-[#377E7F] mb-2">Weekly Gazette</h3>
          <p class="text-sm text-gray-600 mb-3">Browse and search official publications</p>
          <div class="text-sm text-[#377E7F] hover:underline text-right">Browse all →</div>
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-[#377E7F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-shield-check w-6 h-6 text-[#377E7F]" aria-hidden="true">
              <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <div><h2 class="text-[#377E7F] mb-2">Verify Notification</h2>
            <p class="text-gray-600">Enter an SRO or Serial number to verify its authenticity against official
              records</p></div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 mb-4"><input type="text"
                                                                 placeholder="Enter SRO/Serial number (e.g., S.R.O. 1543(I)/2024)"
                                                                 class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377E7F] focus:border-transparent"
                                                                 value="">
          <button
            class="px-6 py-3 bg-[#377E7F] text-white rounded-lg hover:bg-[#3A715E] transition-colors whitespace-nowrap">
            Verify Authenticity
          </button>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="flex items-center justify-between mb-6">
        <div><h2 class="text-[#377E7F] mb-2">Latest Publications</h2>
          <p class="text-gray-600">Recently published official notifications</p></div>
        <button class="text-[#377E7F] hover:underline text-sm flex items-center gap-1">View All
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-trending-up w-4 h-4" aria-hidden="true">
            <path d="M16 7h6v6"></path>
            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <button class="text-[#377E7F] hover:underline text-left mb-2 block">Pakistan Telecommunication
                (Re-organization) (Amendment) Ordinance, 2024
              </button>
              <div class="flex flex-wrap gap-2 text-xs text-gray-600"><span
                class="px-2 py-1 bg-[#377E7F]/10 text-[#377E7F] rounded">Extraordinary — Part I</span><span>2024-11-28</span><span>•</span><span>Ministry of IT &amp; Telecom</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">An Ordinance to further amend the Pakistan Telecommunication
            (Re-organization) Act...</p>
          <div class="flex flex-wrap gap-2 text-sm">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-eye w-4 h-4" aria-hidden="true">
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-download w-4 h-4" aria-hidden="true">
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
              PDF
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-share2 lucide-share-2 w-4 h-4" aria-hidden="true">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <button class="text-[#377E7F] hover:underline text-left mb-2 block">S.R.O. 1543(I)/2024 — Import
                Policy Order Amendment
              </button>
              <div class="flex flex-wrap gap-2 text-xs text-gray-600"><span
                class="px-2 py-1 bg-[#377E7F]/10 text-[#377E7F] rounded">Extraordinary — Part II</span><span>2024-11-27</span><span>•</span><span>Ministry of Commerce</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">In exercise of powers conferred under section 3 of the Imports
            and Exports...</p>
          <div class="flex flex-wrap gap-2 text-sm">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-eye w-4 h-4" aria-hidden="true">
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-download w-4 h-4" aria-hidden="true">
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
              PDF
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-share2 lucide-share-2 w-4 h-4" aria-hidden="true">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <button class="text-[#377E7F] hover:underline text-left mb-2 block">Notification of Additional
                District &amp; Sessions Judge Appointments
              </button>
              <div class="flex flex-wrap gap-2 text-xs text-gray-600"><span
                class="px-2 py-1 bg-[#377E7F]/10 text-[#377E7F] rounded">Extraordinary — Part III</span><span>2024-11-26</span><span>•</span><span>Law &amp; Justice Division</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">The President is pleased to appoint the following officers as
            Additional...</p>
          <div class="flex flex-wrap gap-2 text-sm">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-eye w-4 h-4" aria-hidden="true">
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-download w-4 h-4" aria-hidden="true">
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
              PDF
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-share2 lucide-share-2 w-4 h-4" aria-hidden="true">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <button class="text-[#377E7F] hover:underline text-left mb-2 block">Finance Division — Amendment
                to Tax Exemption Rules
              </button>
              <div class="flex flex-wrap gap-2 text-xs text-gray-600"><span
                class="px-2 py-1 bg-[#377E7F]/10 text-[#377E7F] rounded">Extraordinary — Part II</span><span>2024-11-25</span><span>•</span><span>Finance Division</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">The Federal Board of Revenue hereby notifies amendments to the
            Income Tax...</p>
          <div class="flex flex-wrap gap-2 text-sm">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-eye w-4 h-4" aria-hidden="true">
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-download w-4 h-4" aria-hidden="true">
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
              PDF
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-share2 lucide-share-2 w-4 h-4" aria-hidden="true">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center text-sm text-gray-500">Published by authority — signed PDF available</div>
    </div>
  </div>
</template>
