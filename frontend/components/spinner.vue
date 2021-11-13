<template>
  <div class="spinner"></div>
</template>

<style lang="scss">
.spinner {
  @apply border-gray-300 border-t-blue-500 border-5 rounded-full w-10 h-10;

  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
