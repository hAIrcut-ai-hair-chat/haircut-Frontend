<script setup>
import LateralBar from '@/components/LateralBar.vue'
</script>

<template>
  <div class="image-container">
    <div class="lateral-bar">
      <LateralBar />
    </div>

    <div class="image-section">
      <span class="my-images">My Images</span>
      <div class="images"></div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  text-align: center;
}

.image-section {
  padding: 20px;
}

.my-images {
  background-color: ;
  color: white;
  padding: 10px 15px;
  display: inline-block;
  border-radius: 8px;
  margin-bottom: 20px;
}

.images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
