<script setup lang="ts">
// Protect publisher routes - only publisher users can access
definePageMeta({
  middleware: 'publisher'
})
</script>

<template>
  <p>edit notice</p>
</template>

<style scoped>

</style>
