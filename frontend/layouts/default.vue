<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="
        w-full
        max-w-screen-2xl
        bg-white
        lg:rounded-2xl
        overflow-hidden
        shadow-xl
        grid grid-cols-7
      "
    >
      <div
        class="
          hidden
          lg:flex
          flex-col
          h-95vh
          col-span-2
          border-r border-gray-200
        "
      >
        <logo-header></logo-header>

        <div
          class="relative flex-1"
          :class="{
            'overflow-auto': scrollable,
            'overflow-hidden': !scrollable,
          }"
        >
          <transition
            name="slide"
            v-on:after-enter="scrollable = false"
            v-on:before-leave="scrollable = true"
          >
            <settings v-show="isOpen"></settings>
          </transition>

          <slot name="left" />
        </div>
      </div>

      <div class="col-span-7 lg:col-span-5 h:h-screen lg:h-95vh z-0">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isOpen } = useSidenav();
const scrollable = ref(true);
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
