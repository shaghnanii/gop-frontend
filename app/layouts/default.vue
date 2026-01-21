<script setup lang="ts">

import Header from "~/components/layouts/Header.vue";
import Footer from "~/components/layouts/Footer.vue";
</script>

<template>
  <div id="container">
    <div class="tailwind">
      <div id="fig-code-root" style="height: 100%;">
        <div class="min-h-screen bg-white">
          <Header />
          <NuxtPage />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
