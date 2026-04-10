<template>
  <aside class="sidebar">
    <LateralBar />
  </aside>
</template>

<script setup>
import LateralBar from '@/components/LateralBar.vue'
</script>

<style scoped>
.sidebar {
  background: #f8fafc;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
