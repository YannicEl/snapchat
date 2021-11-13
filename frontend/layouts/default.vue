<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="
        w-full
        max-w-screen-xl
        h-[95vh]
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-xl
        grid grid-cols-7
      "
    >
      <div class="flex flex-col col-span-2 border-r border-gray-200">
        <logo-header></logo-header>

        <div class="h-full relative">
          <transition name="slide">
            <settings v-show="isOpen"></settings>
          </transition>

          <slot name="left" />
        </div>
      </div>

      <div class="col-span-5">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isOpen } = useSidenav();
</script>

<style lang="scss">
.slide-enter-active {
  animation: ease-in-out slideIn 300ms;
}
.slide-leave-active {
  animation: ease-in-out slideOut 300ms;
}

@keyframes slideIn {
  from {
    left: -28rem;
  }
  to {
    left: 0rem;
  }
}
@keyframes slideOut {
  from {
    left: 0;
  }
  to {
    left: -28rem;
  }
}
</style>
