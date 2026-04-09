<script setup>
const displayMessage = "Hello, World!"

</script>


<template>
  <div class="container">
    <div class="output">
      <Transition name="fade-slide">
        <div class="output-content">
          {{ displayMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  border-radius: 12px;

}
.output {
  flex: 1;
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

</style>