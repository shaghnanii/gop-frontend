<script setup lang="ts">
// Notifications component
// This can be extended later with API integration when available
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
    <div class="flex items-center gap-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-bell w-5 h-5 text-[#0b2545]" aria-hidden="true">
        <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
        <path
          d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
      </svg>
      <h3 class="text-[#0b2545]">Notifications</h3>
    </div>
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
</template>

