<template>
  <button
    class="mt-16 flex items-center space-x-5 lg:justify-end"
    @click="$store.commit('SET_INDEX', 1)"
  >
    <span class="typo-400 text-custom-gold-light">
      <slot />
    </span>
    <div
      class="relative h-10 w-10 shrink-0 rounded-full bg-custom-gold-light sm:h-16 sm:w-16"
    >
      <ArrowIcon
        class="absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2 text-black sm:w-7"
      />
    </div>
  </button>
</template>

<script>
export default {}
</script>
