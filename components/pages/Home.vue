<template>
  <div class="flex min-h-screen flex-col justify-center overflow-hidden">
    <!-- TITLE & TEXT -->
    <div class="mb-14 px-9 sm:pl-28 sm:pr-40">
      <h1
        class="mb-28 text-xl font-bold text-custom-gold-light sm:mb-10 sm:text-4xl"
      >
        novu Quiz
      </h1>
      <div
        class="col-span-1 mb-20 grid gap-5 sm:gap-10 lg:grid-cols-3 lg:gap-36"
      >
        <div class="typo-600 lg:col-span-2">
          <h2 class="pr-[10vw] text-3xl sm:text-6xl">
            {{ home.main_title }}
          </h2>
        </div>
        <!-- START BUTTON -->
        <button
          class="typo-400 group -ml-3 flex h-min w-min items-center space-x-5 rounded-full p-1 pl-3 lg:justify-end"
          @click="$store.commit('SET_INDEX', 1)"
        >
          <span
            class="whitespace-nowrap text-2xl text-custom-gold-light transition-colors ease-in-out group-hover:text-custom-gold sm:text-4xl"
            >Jetzt starten</span
          >
          <!-- CIRCLE -->
          <div
            class="relative h-10 w-10 shrink-0 rounded-full bg-custom-gold-light shadow-inner-right shadow-custom-gold transition-all ease-in-out group-hover:scale-110 group-hover:bg-custom-gold sm:h-20 sm:w-20"
          >
            <!-- ARROW -->
            <div
              class="absolute inset-0 transition-transform ease-in-out group-hover:translate-x-2 sm:group-hover:translate-x-3"
            >
              <ArrowIcon
                class="absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2 text-black sm:w-8"
              />
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- IMPRINT -->
    <div class="absolute bottom-16 -left-24 sm:-left-48">
      <Imprint />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    home() {
      return this.$store.getters.home
    },
  },

  mounted() {
    this.$store.dispatch('reset')
  },
}
</script>
