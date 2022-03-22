<template>
  <button
    class="group mt-16 flex items-center space-x-5 rounded-full p-1 pl-3 lg:justify-end"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <span
      class="typo-400 text-custom-gold-light transition-colors ease-in-out group-hover:text-custom-gold"
    >
      <slot />
    </span>
    <div class="relative h-10 w-10 shrink-0 sm:h-16 sm:w-16">
      <!-- CIRCLE -->
      <div
        class="absolute inset-0 rounded-full bg-custom-gold-light shadow-inner-right shadow-custom-gold transition-all ease-in-out group-hover:scale-110 group-hover:bg-custom-gold"
      />
      <!-- ARROW -->
      <div
        class="absolute inset-0 transition-transform ease-in-out group-hover:translate-x-2"
      >
        <ArrowIcon
          class="absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2 text-black sm:w-7"
        />
      </div>
    </div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
    }
  },
}
</script>
