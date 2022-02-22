<template>
  <div class="flex-col justify-center flex overflow-hidden">
    <!-- TITLE & TEXT -->
    <div class="sm:pl-28 sm:pr-40 px-9 mb-14">
      <h1 class="text-custom-light-gold font-bold sm:text-4xl text-xl sm:mb-10 mb-28">
        novu Quiz
      </h1>
      <div class="grid lg:grid-cols-3 col-span-1 lg:gap-36 sm:gap-10 gap-5 mb-20">
        <h2 class="typo-600 lg:col-span-2">
          {{ home.main_title }}
        </h2>
        <!-- START BUTTON -->
        <button class="flex items-center space-x-5 lg:justify-end">
          <span class="typo-400 text-custom-light-gold sm:text-4xl text-2xl">Jetzt starten</span>
          <div class="sm:w-20 sm:h-20 w-10 h-10 bg-custom-light-gold rounded-full relative shrink-0">
            <ArrowIcon class="sm:w-8 w-4 text-black -translate-x-1/2  absolute -translate-y-1/2 left-1/2 top-1/2" />
          </div>
        </button>
      </div>
    </div>

    <!-- IMPRINT -->
    <div class="absolute bottom-16 sm:-left-48 -left-24">
      <Imprint />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    home () {
      return this.$store.getters.home
    }
  }

}
</script>
