<template>
  <div class="">
    <transition name="slide-right-in" mode="out-in">
      <Home v-if="index === 0" key="0" />
      <Register v-else-if="index === 1" key="1" />
    </transition>
  </div>
</template>

<script>
import head from '~/mixins/head'

export default {
  mixins: [head],
  computed: {
    index() {
      return this.$store.getters.index
    },
  },
}
</script>
