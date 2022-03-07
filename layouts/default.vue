<template>
  <div class="relative min-h-screen">
    <!-- HEADER -->
    <div
      class="absolute inset-x-9 top-9 flex items-center justify-between sm:left-28 sm:right-40 sm:top-24"
    >
      <!-- LOGO -->
      <Logo />
      <transition name="slideRightInRightOut">
        <BackButton
          v-if="$store.getters.index !== 0"
          @click.native="$store.commit('SET_INDEX', $store.getters.index - 1)"
          >Zurück</BackButton
        >
      </transition>
    </div>
    <!-- NUXT -->
    <Nuxt />
    <!-- BORDER -->
    <div
      class="pointer-events-none fixed inset-0 border-6 border-custom-gold-light sm:border-8"
    />
  </div>
</template>
