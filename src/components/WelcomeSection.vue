<template>
  <div class="welcome-section">
    <h1 class="welcome-title">
      Hello to<span class="brand-name">Haircut!</span>
    </h1>
  </div>
</template>



<style scoped>
.welcome-section {
  padding: 2rem 3rem 1.5rem;
  text-align: center;
  z-index: 10;
  position: relative;
}

.welcome-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #2d2a55 0%, #3a3570 100%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 999px;
  border: none;
  box-shadow: 0 4px 12px rgba(45, 42, 85, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.welcome-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.welcome-title:hover {
  background: linear-gradient(135deg, #3a3570 0%, #4a4490 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(45, 42, 85, 0.4);
  font-weight: 600;
  letter-spacing: 0.3px;
}

.welcome-title:hover::before {
  left: 100%;
}

.welcome-title:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(45, 42, 85, 0.3);
}

.welcome-title i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.welcome-title:hover i {
  transform: scale(1.1);
}

.brand-name {
  font-weight: 700;
  background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 1.5rem 1rem;
  }

  .welcome-title {
    font-size: 14px;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>
