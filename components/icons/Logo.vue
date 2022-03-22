<template>
  <button
    class="-ml-3 rounded-full p-3"
    @click=";[animation.goToAndPlay(0, true), $store.commit('SET_INDEX', 0)]"
  >
    <div ref="lottie" class="w-16 sm:w-28" />
  </button>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie_light.min.js'
import logo from '~/static/animations/novu_logo.json'

export default {
  data() {
    return {
      animation: null,
    }
  },

  mounted() {
    // this.setShouldAnimate(true)
    this.animation = lottie.loadAnimation({
      container: this.$refs.lottie, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: logo,
    })

    this.animation.goToAndPlay(0, true)
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 640px) {
  ::v-deep svg {
    transition: all 0.5s ease;

    &:hover {
      @apply text-custom-gold;

      path {
        fill: currentColor;
        stroke: currentColor;
      }
    }
  }
}
</style>
