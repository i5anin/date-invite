<template>
  <div class="phone">
    <div class="phone__notch" />
    <div class="phone__screen">
      <slot />
    </div>
    <div class="phone__bar" />
  </div>
</template>

<style scoped>
.phone {
  background: #241a26;
  border-radius: 34px;
  box-shadow: var(--shadow-m);
  margin: 0 auto;
  max-width: 320px;
  padding: 10px;
  position: relative;
  width: 100%;
}

.phone__notch {
  background: #241a26;
  border-radius: 0 0 12px 12px;
  height: 16px;
  left: 50%;
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  width: 96px;
  z-index: 2;
}

.phone__screen {
  aspect-ratio: 9 / 17;
  background: var(--surface);
  border-radius: 26px;
  overflow: hidden;
  position: relative;
}

.phone__bar {
  background: #6b5b6d;
  border-radius: 999px;
  height: 4px;
  margin: 7px auto 2px;
  width: 96px;
}
</style>
