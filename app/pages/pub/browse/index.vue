<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button class="flex items-center gap-2 text-gray-600 hover:text-[#0b2545] mb-4 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-arrow-left w-4 h-4" aria-hidden="true">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span class="text-sm">Back to Home</span></button>
      <div class="mb-6"><h1 class="text-[#0b2545] mb-2">Advanced Search</h1>
        <p class="text-gray-600">Search and filter official gazette notifications</p></div>
      <div class="bg-white border border-gray-200 rounded-lg mb-6">
        <div class="flex flex-wrap border-b border-gray-200">
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-white border-[#0b2545] text-[#0b2545]">
            All
          </button>
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-gray-600 hover:text-[#0b2545]">
            Federal
          </button>
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-gray-600 hover:text-[#0b2545]">
            Punjab
          </button>
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-gray-600 hover:text-[#0b2545]">
            Sindh
          </button>
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-gray-600 hover:text-[#0b2545]">
            KPK
          </button>
          <button
            class="px-6 py-3 text-sm transition-colors border-b-2 bg-transparent border-transparent text-gray-600 hover:text-[#0b2545]">
            Balochistan
          </button>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 p-4">
          <div class="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                 aria-hidden="true">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input type="text" placeholder="Search by keyword, ministry, SRO number..."
                   class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
                   value=""></div>
          <button
            class="px-6 py-3 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors whitespace-nowrap">
            Search
          </button>
          <button
            class="sm:hidden px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-funnel w-5 h-5" aria-hidden="true">
              <path
                d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>
            </svg>
            Filters
          </button>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="lg:w-80 flex-shrink-0 block">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-sliders-horizontal w-5 h-5 text-[#0b2545]" aria-hidden="true">
                  <path d="M10 5H3"></path>
                  <path d="M12 19H3"></path>
                  <path d="M14 3v4"></path>
                  <path d="M16 17v4"></path>
                  <path d="M21 12h-9"></path>
                  <path d="M21 19h-5"></path>
                  <path d="M21 5h-7"></path>
                  <path d="M8 10v4"></path>
                  <path d="M8 12H3"></path>
                </svg>
                <h3 class="text-[#0b2545]">Filters</h3></div>
              <button class="lg:hidden p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-x w-5 h-5" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div class="space-y-4">
              <div class="border-b border-gray-200 pb-4">
                <button class="flex items-center justify-between w-full text-left mb-3"><span
                  class="text-sm text-gray-700">Notice Type</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round" class="lucide lucide-chevron-up w-4 h-4 text-gray-400"
                       aria-hidden="true">
                    <path d="m18 15-6-6-6 6"></path>
                  </svg>
                </button>
                <div class="space-y-2"><label class="flex items-center gap-2"><input type="checkbox"
                                                                                     class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Show All</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Act</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Ordinance</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">S.R.O.</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Order</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Appointment</span></label><label class="flex items-center gap-2"><input
                  type="checkbox" class="rounded border-gray-300 text-[#0b2545] focus:ring-[#0b2545]"><span
                  class="text-sm">Notification</span></label></div>
              </div>
              <div class="border-b border-gray-200 pb-4">
                <button class="flex items-center justify-between w-full text-left mb-3"><span
                  class="text-sm text-gray-700">Gazette Part</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round" class="lucide lucide-chevron-down w-4 h-4 text-gray-400"
                       aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
              <div class="border-b border-gray-200 pb-4">
                <button class="flex items-center justify-between w-full text-left mb-3"><span
                  class="text-sm text-gray-700">Ministry / Division</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round" class="lucide lucide-chevron-down w-4 h-4 text-gray-400"
                       aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
              <div class="border-b border-gray-200 pb-4">
                <button class="flex items-center justify-between w-full text-left mb-3"><span
                  class="text-sm text-gray-700">Date Range</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round" class="lucide lucide-chevron-down w-4 h-4 text-gray-400"
                       aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
              <button class="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Clear
                Filters
              </button>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="bg-white border border-gray-200 rounded-lg">
            <div
              class="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div class="text-sm text-gray-600">Showing <strong>1–5</strong> of <strong>5</strong> results
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-arrow-up-down w-4 h-4 text-gray-600" aria-hidden="true">
                  <path d="m21 16-4 4-4-4"></path>
                  <path d="M17 20V4"></path>
                  <path d="m3 8 4-4 4 4"></path>
                  <path d="M7 4v16"></path>
                </svg>
                <select
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] text-sm">
                  <option value="relevance">Relevance</option>
                  <option value="date-newest">Date (Newest First)</option>
                  <option value="date-oldest">Date (Oldest First)</option>
                </select></div>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <button class="text-[#0b2545] hover:underline text-left mb-2 block">Pakistan
                      Telecommunication (Re-organization) (Amendment) Ordinance, 2024
                    </button>
                    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-2"><span
                      class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded">Extraordinary — Part I</span><span>2024-11-28</span><span>•</span><span>Ministry of IT &amp; Telecom</span><span>•</span><span
                      class="text-[#0b6b3a]">ORD-XII/2024</span></div>
                    <p class="text-sm text-gray-600">An Ordinance to further amend the Pakistan
                      Telecommunication (Re-organization) Act, 1996, for purposes connected therewith or
                      ancillary thereto...</p></div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">View</button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">PDF</button>
                  <button
                    class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-3.5 h-3.5"
                         aria-hidden="true">
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
              <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <button class="text-[#0b2545] hover:underline text-left mb-2 block">S.R.O. 1543(I)/2024 —
                      Import Policy Order Amendment
                    </button>
                    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-2"><span
                      class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded">Extraordinary — Part II</span><span>2024-11-27</span><span>•</span><span>Ministry of Commerce</span><span>•</span><span
                      class="text-[#0b6b3a]">S.R.O. 1543(I)/2024</span></div>
                    <p class="text-sm text-gray-600">In exercise of powers conferred under section 3 of the
                      Imports and Exports (Control) Act, 1950, the Federal Government is pleased to amend the
                      Import Policy Order...</p></div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">View</button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">PDF</button>
                  <button
                    class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-3.5 h-3.5"
                         aria-hidden="true">
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
              <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <button class="text-[#0b2545] hover:underline text-left mb-2 block">Notification of
                      Additional District &amp; Sessions Judge Appointments
                    </button>
                    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-2"><span
                      class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded">Extraordinary — Part III</span><span>2024-11-26</span><span>•</span><span>Law &amp; Justice Division</span><span>•</span><span
                      class="text-[#0b6b3a]">NOT-LJ-234/2024</span></div>
                    <p class="text-sm text-gray-600">The President is pleased to appoint the following
                      officers as Additional District &amp; Sessions Judges with effect from the date they
                      assume charge of their respective posts...</p></div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">View</button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">PDF</button>
                  <button
                    class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-3.5 h-3.5"
                         aria-hidden="true">
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
              <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <button class="text-[#0b2545] hover:underline text-left mb-2 block">Finance Division —
                      Amendment to Tax Exemption Rules
                    </button>
                    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-2"><span
                      class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded">Extraordinary — Part II</span><span>2024-11-25</span><span>•</span><span>Finance Division</span><span>•</span><span
                      class="text-[#0b6b3a]">S.R.O. 1540(I)/2024</span></div>
                    <p class="text-sm text-gray-600">The Federal Board of Revenue hereby notifies amendments
                      to the Income Tax Ordinance, 2001, in exercise of powers conferred under section
                      50...</p></div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">View</button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">PDF</button>
                  <button
                    class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-3.5 h-3.5"
                         aria-hidden="true">
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
              <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div class="flex-1">
                    <button class="text-[#0b2545] hover:underline text-left mb-2 block">Establishment Division
                      — Transfer and Posting of Grade-20 Officers
                    </button>
                    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-2"><span
                      class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded">Extraordinary — Part III</span><span>2024-11-24</span><span>•</span><span>Establishment Division</span><span>•</span><span
                      class="text-[#0b6b3a]">NOT-EST-445/2024</span></div>
                    <p class="text-sm text-gray-600">In pursuance of Prime Minister's directive dated 15th
                      November 2024, the following officers are hereby transferred and posted with immediate
                      effect...</p></div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">View</button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white">PDF</button>
                  <button
                    class="px-3 py-1.5 border border-gray-300 rounded hover:bg-white flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-3.5 h-3.5"
                         aria-hidden="true">
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
            <div
              class="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2"><label class="text-sm text-gray-600">Per
                page:</label><select class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select></div>
              <div class="flex items-center gap-2">
                <button
                  class="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                  disabled="">Previous
                </button>
                <div class="flex gap-1">
                  <button class="px-3 py-1.5 rounded-lg text-sm bg-[#0b2545] text-white">1</button>
                </div>
                <button
                  class="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                  disabled="">Next
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
