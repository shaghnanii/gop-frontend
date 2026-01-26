<script setup lang="ts">
// Protect publisher routes - only publisher users can access
import MyDrafts from "~/components/publisher/MyDrafts.vue";
import RecentlyPublished from "~/components/publisher/RecentlyPublished.vue";
import Notifications from "~/components/publisher/Notifications.vue";

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
          <MyDrafts />
          <RecentlyPublished />
        </div>
        <div class="space-y-6">
          <Notifications />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
