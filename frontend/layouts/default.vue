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
          <transition name="slide" appear>
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
.slide-enter,
.slide-leave-to {
  // @apply left-0;
  @apply left-[-28rem];
}

.slide-leave,
.slide-enter-to {
  @apply left-0;
  // @apply left-[-28rem];
}

.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-400;
}
</style>
