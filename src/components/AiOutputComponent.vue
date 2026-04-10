<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "Hello, World!"
  },
  type: {
    type: String,
    default: 'ai'
  }
})

const displayMessage = props.message
</script>


<template>
  <div class="container" :class="props.type">
    <div class="output" :class="props.type">
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
  width: 100%;
}
.container.ai {
  justify-content: flex-start;
}
.container.user {
  justify-content: flex-end;
}
.output {
  width: fit-content;
  max-width: 85%;
  min-width: 160px;
  border-radius: 24px;
  padding: 1.1rem 1.35rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: none;
}
.output.ai {
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.12);
}
.output.user {
  background: #2563eb;
  color: #ffffff;
}
.output-content {
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 1rem;
}

</style>