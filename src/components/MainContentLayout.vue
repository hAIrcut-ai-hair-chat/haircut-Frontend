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
  padding: clamp(1rem, 3vw, 20px);
  overflow: hidden;
}

.profile-icon-container {
  position: absolute;
  top: clamp(20px, 3vw, 30px);
  right: clamp(20px, 3vw, 30px);
  z-index: 20;
}

.photo-container {
  width: 100%;
  max-width: 820px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(50px, 10vw, 80px);
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
