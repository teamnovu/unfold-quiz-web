<template>
 <Vue100vh :css="{height: '100rvh'}">
  <div class=" relative h-full ">
    <!-- HEADER -->
    <div
      class="absolute inset-x-9 top-9 z-40 flex items-center justify-between sm:left-28 sm:right-40 sm:top-20"
    >
      <!-- LOGO -->
      <Logo />
      <transition name="slideRightInRightOut">
        <BackButton
          v-if="$store.getters.index > 1"
          @click.native="$store.commit('SET_INDEX', $store.getters.index - 1)"
          >Zurück</BackButton
        >
      </transition>
    </div>
    <!-- NUXT -->
    <Nuxt class="relative h-full" />
    <!-- BORDER -->
    <div
      class="pointer-events-none fixed inset-0 border-4 border-custom-gold-light sm:border-6"
    />
  </div>
   </Vue100vh>
</template>

<script>
import Vue100vh from 'vue-100vh'

export default {
  components: { Vue100vh },
}
</script>

<style scoped>
.screen-outiline {
  box-shadow: inset 0px 0px 0px 4px rgb(235 223 183);
}
@media (min-width: 640px) {
  .screen-outiline {
    box-shadow: none;
  }
}
</style>
