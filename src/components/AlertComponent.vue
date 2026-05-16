<script setup>
defineProps({
  type: {
    type: String,
    default: 'error' 
  },
  message: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div v-if="show" class="alert" :class="type">
    {{ message }}
  </div>
</template>

<style scoped>
.alert {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  font-weight: 500;
}

.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.4);
  color: #ff4d4d;
}

.success {
  background: rgba(0, 255, 100, 0.1);
  border: 1px solid rgba(0, 255, 100, 0.4);
  color: #3cff88;
}

.warning {
  background: rgba(255, 200, 0, 0.1);
  border: 1px solid rgba(255, 200, 0, 0.4);
  color: #ffd24d;
}

.info {
  background: rgba(0, 150, 255, 0.1);
  border: 1px solid rgba(0, 150, 255, 0.4);
  color: #4db8ff;
}
</style>