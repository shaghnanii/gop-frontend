<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-[#377E7F] rounded-lg mb-4">
          <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-[#0b2545] mb-2">Gazette of Pakistan</h1>
        <p class="text-gray-600">Sign in to your account</p></div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8"><h2 class="text-[#0b2545] mb-6">Select
        Account Type</h2>
        <div class="space-y-3 mb-8"><label
          class="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#377E7F] hover:bg-gray-50 transition-all"><input
          type="radio" name="role" class="w-5 h-5 text-[#377E7F] focus:ring-[#377E7F] mt-0.5 flex-shrink-0"
          value="public" checked="">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-user w-5 h-5 text-[#377E7F]" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span class="text-gray-900">Guest / MyGazette</span></div>
            <p class="text-sm text-gray-500">Citizen, researcher, or paid subscriber</p></div>
        </label><label
          class="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#377E7F] hover:bg-gray-50 transition-all"><input
          type="radio" name="role" class="w-5 h-5 text-[#377E7F] focus:ring-[#377E7F] mt-0.5 flex-shrink-0"
          value="publisher">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-building2 lucide-building-2 w-5 h-5 text-[#377E7F]" aria-hidden="true">
                <path d="M10 12h4"></path>
                <path d="M10 8h4"></path>
                <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
                <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
              </svg>
              <span class="text-gray-900">Publisher</span></div>
            <p class="text-sm text-gray-500">Ministry or supplier account</p></div>
        </label><label
          class="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#377E7F] hover:bg-gray-50 transition-all"><input
          type="radio" name="role" class="w-5 h-5 text-[#377E7F] focus:ring-[#377E7F] mt-0.5 flex-shrink-0"
          value="admin">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-settings w-5 h-5 text-[#377E7F]" aria-hidden="true">
                <path
                  d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span class="text-gray-900">Super Admin</span></div>
            <p class="text-sm text-gray-500">System administration</p></div>
        </label></div>
        <button class="w-full px-6 py-3 bg-[#377E7F] text-white rounded-lg hover:bg-[#2d6668] transition-colors">Login
        </button>
        <button class="w-full mt-3 px-6 py-3 text-gray-600 hover:text-[#377E7F] text-sm">Back to Home</button>
      </div>
      <div class="mt-6 p-4 bg-white rounded-lg border border-gray-200"><p class="text-xs text-gray-600 text-center">
        <strong>Notice:</strong> This portal is for official government records. Figma Make is not intended for
        collecting PII or securing sensitive data.</p></div>
    </div>
  </div>
</template>

<style scoped>

</style>
