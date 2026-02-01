<script setup lang="ts">
interface Props {
  tips?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  tips: () => [
    'Use templates to maintain consistency',
    'SRO numbers are auto-generated but can be manually edited',
    'All notices undergo automated validation',
    'Save drafts frequently to avoid data loss'
  ]
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-[#0b2545] mb-4">Quick Tips</h3>
    <ul class="space-y-2 text-sm text-gray-600">
      <li v-for="(tip, index) in tips" :key="index" class="flex items-start gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-[#0b2545] mt-1.5 flex-shrink-0"></div>
        <span>{{ tip }}</span>
      </li>
    </ul>
  </div>
</template>
