<template>
  <div
    class="flex min-h-screen flex-col justify-between px-9 pt-32 pb-9 sm:pl-28 sm:pr-40 sm:pt-56 sm:pb-28"
  >
    <div class="flex justify-between">
      <div class="w-1/2">
        <h3
          class="text-custom-gold-light mb-7 text-xl font-bold sm:mb-20 sm:text-3xl"
        >
          12 Punkte!
        </h3>
        <h1 class="typo-600 max-w-xl">Gratuliere 🥳 du gehörst zu den novu Profis!!</h1>
        <p class="typo-400 mt-14 max-w-xl">
          Hol dir jetzt dein Mandelbärli an unserem Stand ab! Zeig uns dafür
          deine Punktzahl.
        </p>
      </div>
      <div>
        <div class="w-80 relative pt-8" >
          <CircleGraph/>
        </div>
        <div class="typo-400 text-center text-gold">12/15 Richtig</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    completion() {
      return this.$store.getters.completion
    },

    index() {
      return this.$store.getters.index - 1
    },

    amountQuestions() {
      return this.$store.getters.questions.length
    },
  },
}
</script>
