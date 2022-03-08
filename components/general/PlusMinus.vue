<template>
  <div class="relative shrink-0">
    <!-- VERTICAL -->
    <div
      class="absolute left-1/2 top-1/2 h-full w-[0.125rem] -translate-y-1/2 -translate-x-1/2 bg-custom-gold-light transition-transform duration-200 ease-in-out sm:w-[0.1875rem]"
      :class="{ 'rotate-90 transform': plus }"
    />
    <!-- HORIZONTAL -->
    <div
      class="absolute left-1/2 top-1/2 h-[0.125rem] w-full -translate-y-1/2 -translate-x-1/2 bg-custom-gold-light sm:h-[0.1875rem]"
    />
  </div>
</template>

<script>
export default {
  props: {
    plus: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
