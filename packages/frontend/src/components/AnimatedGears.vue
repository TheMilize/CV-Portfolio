<template>
  <div class="gears-container">
    <!-- Main large gear -->
    <div class="gear gear-main">
      <div class="gear-inner">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <!-- Small gear on top -->
    <div class="gear gear-small gear-top">
      <div class="gear-inner">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <!-- Small gear on bottom -->
    <div class="gear gear-small gear-bottom">
      <div class="gear-inner">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент анимированных шестеренок
</script>

<style scoped>
.gears-container {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gear {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(145deg, #f8fafc, #e2e8f0);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.gear-main {
  width: 32px;
  height: 32px;
  z-index: 2;
}

.gear-small {
  width: 16px;
  height: 16px;
  z-index: 3;
  background: linear-gradient(145deg, #cbd5e1, #94a3b8);
}

.gear-top {
  top: -2px;
  right: -2px;
}

.gear-bottom {
  bottom: -2px;
  left: -2px;
}

.gear-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
}

.gear-main .gear-inner {
  animation: rotate-clockwise 4s infinite linear;
}

.gear-top .gear-inner {
  animation: rotate-counter-clockwise 2s infinite linear;
}

.gear-bottom .gear-inner {
  animation: rotate-clockwise 3s infinite linear;
}

.bar {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.gear-main .bar {
  width: 6px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -3px;
  margin-top: -8px;
}

.gear-small .bar {
  width: 4px;
  height: 10px;
  top: 50%;
  left: 50%;
  margin-left: -2px;
  margin-top: -5px;
}

.gear-main .bar:nth-child(1) {
  transform: rotate(0deg) translateY(-14px);
}
.gear-main .bar:nth-child(2) {
  transform: rotate(60deg) translateY(-14px);
}
.gear-main .bar:nth-child(3) {
  transform: rotate(120deg) translateY(-14px);
}
.gear-main .bar:nth-child(4) {
  transform: rotate(180deg) translateY(-14px);
}
.gear-main .bar:nth-child(5) {
  transform: rotate(240deg) translateY(-14px);
}
.gear-main .bar:nth-child(6) {
  transform: rotate(300deg) translateY(-14px);
}

.gear-small .bar:nth-child(1) {
  transform: rotate(0deg) translateY(-8px);
}
.gear-small .bar:nth-child(2) {
  transform: rotate(120deg) translateY(-8px);
}
.gear-small .bar:nth-child(3) {
  transform: rotate(240deg) translateY(-8px);
}

@keyframes rotate-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-counter-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* Dark mode adjustments */
:global(.dark) .gear {
  background: linear-gradient(145deg, #374151, #1f2937);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

:global(.dark) .gear-small {
  background: linear-gradient(145deg, #4b5563, #374151);
}

:global(.dark) .bar {
  background: rgba(255, 255, 255, 0.8);
}

/* Hover effects */
.gears-container:hover .gear-main .gear-inner {
  animation-duration: 2s;
}

.gears-container:hover .gear-top .gear-inner {
  animation-duration: 1s;
}

.gears-container:hover .gear-bottom .gear-inner {
  animation-duration: 1.5s;
}
</style>
