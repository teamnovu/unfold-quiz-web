<template>
  <button
    class="-ml-3 rounded-full p-3"
    @click=";[animation.goToAndPlay(0, true), $store.commit('SET_INDEX', 0)]"
  >
    <div
      ref="lottie"
      class="logo-container h-6 w-auto first-letter:md:h-auto"
    />
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
.logo-container {
  width: 123px;
  height: 26px;
}

::v-deep svg {
  transition: all 0.5s ease;

  &:hover {
    @apply text-gold-700;

    path {
      fill: currentColor;
      stroke: currentColor;
    }
  }
}
</style>
