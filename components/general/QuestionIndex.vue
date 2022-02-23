<template>
  <div
    class="mb-7 text-xl font-bold text-custom-gold-light sm:mb-9 sm:text-3xl"
  >
    {{ index }}/{{ amountQuestions }}
  </div>
</template>

<script>
export default {
  computed: {
    index() {
      return this.$store.getters.index - 1
    },

    amountQuestions() {
      return this.$store.getters.questions.length
    },
  },
}
</script>
