<script setup lang="ts">

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
            <span class="text-2xl" style="color: rgb(11, 37, 69);">1,247</span></div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Total Users</div>
            <div class="text-xs text-[#0b6b3a]">+12%</div>
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
            <span class="text-2xl" style="color: rgb(11, 107, 58);">342</span></div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Published (30d)</div>
            <div class="text-xs text-[#0b6b3a]">+8%</div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-dollar-sign w-5 h-5" aria-hidden="true" style="color: rgb(11, 37, 69);">
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span class="text-2xl" style="color: rgb(11, 37, 69);">89</span></div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">Active Subscriptions</div>
            <div class="text-xs text-[#0b6b3a]">+15%</div>
          </div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg mb-6">
        <div class="flex flex-wrap border-b border-gray-200 overflow-x-auto">
          <button
            class="px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap border-[#0b2545] text-[#0b2545]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-activity w-4 h-4" aria-hidden="true">
              <path
                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            </svg>
            Overview
          </button>
          <button
            class="px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap border-transparent text-gray-600 hover:text-[#0b2545]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-users w-4 h-4" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            Users &amp; Roles
          </button>
          <button
            class="px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap border-transparent text-gray-600 hover:text-[#0b2545]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-file-text w-4 h-4" aria-hidden="true">
              <path
                d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            SRO Rules
          </button>
          <button
            class="px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap border-transparent text-gray-600 hover:text-[#0b2545]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-shield w-4 h-4" aria-hidden="true">
              <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
            Audit &amp; Logs
          </button>
          <button
            class="px-6 py-3 border-b-2 text-sm flex items-center gap-2 whitespace-nowrap border-transparent text-gray-600 hover:text-[#0b2545]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-trending-up w-4 h-4" aria-hidden="true">
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
            Analytics
          </button>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1 lg:w-[70%] bg-white border border-gray-200 rounded-lg p-6"><h2 class="text-[#0b2545] mb-4">
          Published Notices Activity</h2>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-sm text-gray-600 mb-1">Ministry of Commerce</div>
                  <h3 class="text-gray-900 mb-1">Telecom Licensing Rules Amendment 2024</h3>
                  <div class="flex items-center gap-3 text-xs text-gray-500"><span
                    class="font-mono">S.R.O. 1543(I)/2024</span><span>•</span><span>2024-11-30 14:35:22</span></div>
                </div>
                <span
                  class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap">Published</span>
              </div>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-sm text-gray-600 mb-1">Finance Division</div>
                  <h3 class="text-gray-900 mb-1">Customs Duty Exemption on Medical Equipment</h3>
                  <div class="flex items-center gap-3 text-xs text-gray-500"><span
                    class="font-mono">S.R.O. 1542(I)/2024</span><span>•</span><span>2024-11-30 12:20:15</span></div>
                </div>
                <span
                  class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap">Published</span>
              </div>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-sm text-gray-600 mb-1">Ministry of IT &amp; Telecom</div>
                  <h3 class="text-gray-900 mb-1">Data Protection Regulations 2024</h3>
                  <div class="flex items-center gap-3 text-xs text-gray-500"><span
                    class="font-mono">S.R.O. 1541(I)/2024</span><span>•</span><span>2024-11-30 10:45:03</span></div>
                </div>
                <span
                  class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap">Published</span>
              </div>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-sm text-gray-600 mb-1">Ministry of Law &amp; Justice</div>
                  <h3 class="text-gray-900 mb-1">Court Fees Amendment Rules</h3>
                  <div class="flex items-center gap-3 text-xs text-gray-500"><span
                    class="font-mono">S.R.O. 1540(I)/2024</span><span>•</span><span>2024-11-29 16:30:42</span></div>
                </div>
                <span
                  class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap">Published</span>
              </div>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-sm text-gray-600 mb-1">Ministry of Commerce</div>
                  <h3 class="text-gray-900 mb-1">Export Policy Framework Update</h3>
                  <div class="flex items-center gap-3 text-xs text-gray-500"><span
                    class="font-mono">S.R.O. 1539(I)/2024</span><span>•</span><span>2024-11-29 14:15:28</span></div>
                </div>
                <span
                  class="px-2 py-0.5 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs whitespace-nowrap">Published</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-[30%] bg-white border border-gray-200 rounded-lg p-6"><h2 class="text-[#0b2545] mb-4">Recent
          Activity</h2>
          <div class="space-y-3">
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">User Created</div>
                <div class="text-xs text-gray-600">Ministry of Commerce publisher account</div>
                <div class="text-xs text-gray-500 mt-1">10 min ago</div>
              </div>
            </div>
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">Notice Published</div>
                <div class="text-xs text-gray-600">S.R.O. 1543(I)/2024 by Ministry of Commerce</div>
                <div class="text-xs text-gray-500 mt-1">1 hour ago</div>
              </div>
            </div>
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">SRO Reserved</div>
                <div class="text-xs text-gray-600">S.R.O. 1545(I)/2024 for Finance Division</div>
                <div class="text-xs text-gray-500 mt-1">2 hours ago</div>
              </div>
            </div>
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">Template Updated</div>
                <div class="text-xs text-gray-600">Part II template v2.1</div>
                <div class="text-xs text-gray-500 mt-1">3 hours ago</div>
              </div>
            </div>
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">User Login</div>
                <div class="text-xs text-gray-600">ali@pcp.gov.pk from 202.63.xxx.xxx</div>
                <div class="text-xs text-gray-500 mt-1">4 hours ago</div>
              </div>
            </div>
            <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div class="w-2 h-2 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="text-sm text-gray-900">Draft Submitted</div>
                <div class="text-xs text-gray-600">Finance Division</div>
                <div class="text-xs text-gray-500 mt-1">5 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-6"><h2 class="text-[#0b2545]">Users &amp; Roles</h2>
          <button class="px-4 py-2 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] text-sm">Add User</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm text-gray-700">Name</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700">Email</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700">Role</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700">Ministry/Tenant</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700">Status</th>
              <th class="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 text-sm">Muhammad Ahmad</td>
              <td class="py-3 px-4 text-sm text-gray-600">ahmad@moitt.gov.pk</td>
              <td class="py-3 px-4"><span
                class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">Publisher</span></td>
              <td class="py-3 px-4 text-sm text-gray-600">IT &amp; Telecom</td>
              <td class="py-3 px-4"><span class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs">Active</span>
              </td>
              <td class="py-3 px-4">
                <button class="text-sm text-[#0b2545] hover:underline">Edit</button>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 text-sm">Fatima Khan</td>
              <td class="py-3 px-4 text-sm text-gray-600">fatima@finance.gov.pk</td>
              <td class="py-3 px-4"><span
                class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">Publisher</span></td>
              <td class="py-3 px-4 text-sm text-gray-600">Finance</td>
              <td class="py-3 px-4"><span class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs">Active</span>
              </td>
              <td class="py-3 px-4">
                <button class="text-sm text-[#0b2545] hover:underline">Edit</button>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 text-sm">Ali Raza</td>
              <td class="py-3 px-4 text-sm text-gray-600">ali@pcp.gov.pk</td>
              <td class="py-3 px-4"><span
                class="px-2 py-1 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">Approver</span></td>
              <td class="py-3 px-4 text-sm text-gray-600">PCP</td>
              <td class="py-3 px-4"><span class="px-2 py-1 bg-[#0b6b3a]/10 text-[#0b6b3a] rounded text-xs">Active</span>
              </td>
              <td class="py-3 px-4">
                <button class="text-sm text-[#0b2545] hover:underline">Edit</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-[#0b2545] mb-4">SRO Numbering Rules</h2>
        <div class="space-y-6">
          <div><label class="block text-sm text-gray-700 mb-2">SRO Pattern Format</label><input type="text"
                                                                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                                                                readonly=""
                                                                                                value="S.R.O. {XXXX}({PART})/{YYYY}">
            <p class="text-xs text-gray-500 mt-1">{XXXX} = Auto-increment counter, {PART} = Part identifier (I/II/III),
              {YYYY} = Year</p></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="block text-sm text-gray-700 mb-2">Current Counter (2024)</label><input type="number"
                                                                                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                                                                      readonly=""
                                                                                                      value="1544">
            </div>
            <div><label class="block text-sm text-gray-700 mb-2">Next Available</label><input type="text"
                                                                                              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                                                                              readonly=""
                                                                                              value="S.R.O. 1545(I)/2024">
            </div>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><h3 class="text-sm text-gray-900 mb-2">Conflict
            Resolution</h3>
            <p class="text-xs text-gray-600">System automatically detects SRO conflicts and suggests alternatives.
              Manual override available for authorized users.</p></div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-6"><h2 class="text-[#0b2545]">Audit &amp; Logs</h2>
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Export CSV</button>
        </div>
        <div class="space-y-2">
          <div class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-start justify-between gap-4 text-sm">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1"><span class="font-mono text-xs text-gray-500">2024-11-30 14:35:22</span><span
                  class="px-2 py-0.5 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">NOTICE_PUBLISHED</span></div>
                <div class="text-gray-900 mb-1">S.R.O. 1543(I)/2024</div>
                <div class="text-xs text-gray-500">User: ali@pcp.gov.pk • IP: 202.63.xxx.xxx</div>
              </div>
            </div>
          </div>
          <div class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-start justify-between gap-4 text-sm">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1"><span class="font-mono text-xs text-gray-500">2024-11-30 14:30:15</span><span
                  class="px-2 py-0.5 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">DRAFT_SUBMITTED</span></div>
                <div class="text-gray-900 mb-1">Telecom Licensing Rules</div>
                <div class="text-xs text-gray-500">User: ahmad@moitt.gov.pk • IP: 202.63.xxx.xxx</div>
              </div>
            </div>
          </div>
          <div class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-start justify-between gap-4 text-sm">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1"><span class="font-mono text-xs text-gray-500">2024-11-30 14:15:03</span><span
                  class="px-2 py-0.5 bg-[#0b2545]/10 text-[#0b2545] rounded text-xs">SRO_RESERVED</span></div>
                <div class="text-gray-900 mb-1">S.R.O. 1545(I)/2024</div>
                <div class="text-xs text-gray-500">User: fatima@finance.gov.pk • IP: 202.63.xxx.xxx</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6"><h2 class="text-[#0b2545] mb-4">Publications by
          Ministry</h2>
          <div class="space-y-3">
            <div>
              <div class="flex items-center justify-between mb-1"><span
                class="text-sm text-gray-700">Finance Division</span><span class="text-sm text-gray-900">87</span></div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 100%; background-color: rgb(11, 37, 69);"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1"><span class="text-sm text-gray-700">Ministry of Commerce</span><span
                class="text-sm text-gray-900">65</span></div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 74.7126%; background-color: rgb(11, 107, 58);"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1"><span class="text-sm text-gray-700">Ministry of IT &amp; Telecom</span><span
                class="text-sm text-gray-900">52</span></div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 59.7701%; background-color: rgb(11, 37, 69);"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1"><span
                class="text-sm text-gray-700">Law &amp; Justice</span><span class="text-sm text-gray-900">41</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 47.1264%; background-color: rgb(11, 107, 58);"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6"><h2 class="text-[#0b2545] mb-4">Average Time to
          Publish</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between"><span
              class="text-sm text-gray-700">Finance Division</span><span class="text-sm text-gray-900">2.3 days</span>
            </div>
            <div class="flex items-center justify-between"><span
              class="text-sm text-gray-700">Ministry of Commerce</span><span
              class="text-sm text-gray-900">3.1 days</span></div>
            <div class="flex items-center justify-between"><span class="text-sm text-gray-700">Ministry of IT &amp; Telecom</span><span
              class="text-sm text-gray-900">1.8 days</span></div>
            <div class="flex items-center justify-between"><span
              class="text-sm text-gray-700">Law &amp; Justice</span><span class="text-sm text-gray-900">2.7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
