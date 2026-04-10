<script setup>
</script>
<template>
  <div class="home-background">
    <div class="glass-carousel">
      <div class="carousel-track">
        <div class="item item-1">✂︎</div>
        <div class="item item-2">✂︎</div>
        <div class="item item-3">✂︎</div>
        <div class="item item-4">✂︎</div>
        <div class="item item-5">✂︎</div>
        <div class="item item-6">✂︎</div>
      </div>
    </div>
    <div class="glass-film" aria-hidden="true"></div>
  </div>
</template>



<style scoped>
.home-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.glass-carousel,
.home-background .glass-carousel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.14), transparent 35%),
              radial-gradient(circle at 80% 40%, rgba(107, 180, 255, 0.12), transparent 30%),
              linear-gradient(140deg, rgba(10, 12, 30, 0.82), rgba(22, 28, 54, 0.68));
}

.home-background .carousel-track {
  position: absolute;
  width: 200%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation: slide 30s linear infinite;
  transform-origin: center;
}

.home-background .item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 28px;
  color: white;
  text-shadow: 0 4px 14px rgba(0,0,0,0.4);
  font-size: 3rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25), 0 25px 50px rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transform: scale(0.42);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.home-background .item:hover {
  transform: scale(0.98);
  filter: saturate(1.3);
}

.home-background .glass-film {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 0 120px rgba(255, 255, 255, 0.15);
}

@keyframes slide {
  0% { transform: translateX(0) rotate(0); }
  50% { transform: translateX(-50%) rotate(5deg); }
  100% { transform: translateX(-100%) rotate(0); }
}
</style>
