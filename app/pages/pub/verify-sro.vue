<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button class="flex items-center gap-2 text-gray-600 hover:text-[#0b2545] mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-arrow-left w-4 h-4" aria-hidden="true">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span class="text-sm">Back to Home</span></button>
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-[#0b2545]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-shield-check w-10 h-10 text-[#0b2545]" aria-hidden="true">
            <path
              d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <h1 class="text-[#0b2545] mb-4">Verify SRO Authenticity</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Verify the authenticity of any SRO or Serial number against
          official Gazette of Pakistan records</p></div>
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-8"><label
        class="block text-sm text-gray-700 mb-3">Enter SRO / Serial Number</label>
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <div class="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                 aria-hidden="true">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input type="text" placeholder="e.g., S.R.O. 1543(I)/2024"
                   class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2545] focus:border-transparent"
                   value=""></div>
          <button
            class="px-8 py-4 bg-[#0b2545] text-white rounded-lg hover:bg-[#0d2f59] transition-colors whitespace-nowrap">
            Verify Authenticity
          </button>
        </div>
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg"><h3 class="text-sm text-gray-900 mb-2">How to
          use:</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Enter the complete SRO or Serial number as shown on the document</li>
            <li>• The system will check against official published records</li>
            <li>• Valid notifications will display verification details and signed PDF</li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-[#0b2545] mb-3">Why Verify?</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Protect against fake notifications</span></li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Confirm legal validity</span></li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Access official signed PDFs</span></li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#0b6b3a] mt-1.5 flex-shrink-0"></div>
              <span>Ensure regulatory compliance</span></li>
          </ul>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-[#0b2545] mb-3">Need Help?</h3>
          <p class="text-sm text-gray-600 mb-4">If you're having trouble verifying a notification or suspect a fake
            document, please contact our verification helpline.</p>
          <button class="text-sm text-[#0b2545] hover:underline">Contact Support →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
