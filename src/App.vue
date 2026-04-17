<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
</script>

<style>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #262626;
  --text-secondary: #8e8e8e;
  --border-color: #e0e0e0;
  --shadow-light: rgba(0, 0, 0, 0.05);
  --shadow-medium: rgba(0, 0, 0, 0.1);
}

html[data-theme='dark'] {
  --bg-primary: #121212;  
  --bg-secondary: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --border-color: #333333;
  --shadow-light: rgba(255, 255, 255, 0.05);
  --shadow-medium: rgba(255, 255, 255, 0.1);
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-secondary);
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app, main {
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: transparent;
}

.glass-carousel {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.14), transparent 35%),
              radial-gradient(circle at 80% 40%, rgba(107, 180, 255, 0.12), transparent 30%),
              linear-gradient(140deg, rgba(10, 12, 30, 0.82), rgba(22, 28, 54, 0.68));
}

.carousel-track {
  position: absolute;
  width: 200%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation: slide 30s linear infinite;
  transform-origin: center;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  border-radius: 30px;
  color: white;
  text-shadow: 0 4px 14px rgba(0,0,0,0.4);
  font-size: 4rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25), 0 25px 50px rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transform: scale(0.4);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.item-1 { background: linear-gradient(145deg, rgba(169, 85, 242, 0.45), rgba(104, 189, 255, 0.28)); }
.item-2 { background: linear-gradient(145deg, rgba(255, 206, 84, 0.35), rgba(255, 111, 105, 0.28)); }
.item-3 { background: linear-gradient(145deg, rgba(97, 215, 142, 0.4), rgba(59, 120, 245, 0.24)); }
.item-4 { background: linear-gradient(145deg, rgba(249, 102, 191, 0.35), rgba(121, 93, 255, 0.26)); }
.item-5 { background: linear-gradient(145deg, rgba(139, 245, 161, 0.3), rgba(119, 201, 240, 0.26)); }
.item-6 { background: linear-gradient(145deg, rgba(255, 191, 123, 0.38), rgba(183, 121, 255, 0.22)); }

.item:hover {
  transform: scale(1);
  filter: saturate(1.2);
}

@keyframes slide {
  0% { transform: translateX(0) rotate(0deg) scale(1); }
  50% { transform: translateX(-50%) rotate(6deg) scale(1.05); }
  100% { transform: translateX(-100%) rotate(0deg) scale(1); }
}

/* opção de formas “corte de cabelo” com pseudo-elementos */
.item::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  transform: skewY(-7deg) rotate(-1deg);
  pointer-events: none;
}

/* conteúdo do app em primeiro plano */
.glass-film {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: inset 0 0 120px rgba(255, 255, 255, 0.2);
}

.content-wrapper {
  position: relative;
  z-index: 2;
}

.router-view {
  position: relative;
  z-index: 2;
}
</style>