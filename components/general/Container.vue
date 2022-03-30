<template>
  <section
    class="px-9 pt-24 pb-12 sm:pl-28 sm:pr-40 sm:pt-40"
    :class="{ '!pb-24': screenCanScroll }"
  >
    <slot />
  </section>
</template>

<script>
export default {
  data() {
    return {
      screenCanScroll: false,
    }
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted() {
    setTimeout(() => {
      this.handleResize()
    }, 500)
    // Why this next tick thing dont work brrr :(
    // this.$nextTick(() => {
    //   this.handleResize();
    // });
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.screenCanScroll = document.body.clientHeight > screen.height
    },
  },
}
</script>

<style scoped>
@media (min-height: 1175px) {
  section {
    @apply pb-24;
  }
}
</style>
