<template>
  <main class="main-content">
    <WelcomeSection />

    <div class="profile-icon-container">
      <ProfileIcon />
    </div>

    <div class="photo-container">
      <PhotoComponent />
    </div>
  </main>
</template>

<script setup>
import WelcomeSection from '@/components/WelcomeSection.vue'
import ProfileIcon from '@/components/ProfileIcon.vue'
import PhotoComponent from '@/components/PhotoComponent.vue'
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: #f8fafc;
  position: relative;
  padding: 20px;
  overflow: hidden;
}

.profile-icon-container {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 20;
}

.photo-container {
  width: 100%;
  max-width: 820px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  z-index: 5;
}

@media (max-width: 768px) {
  .photo-container {
    margin-top: 60px;
    padding: 0 16px;
  }

  .profile-icon-container {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .photo-container {
    margin-top: 40px;
  }
}
</style>
