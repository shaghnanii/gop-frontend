<script setup lang="ts">
import QuickTips from "~/components/publisher/QuickTips.vue";

interface Props {
  title?: string
  tips?: string[]
}

withDefaults(defineProps<Props>(), {
  title: '',
  tips: undefined
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <slot name="content" />
      </div>
    </div>
    <div class="lg:col-span-1">
      <QuickTips :tips="tips" />
    </div>
  </div>
</template>
