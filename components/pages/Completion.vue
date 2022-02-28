<template>
  <Container class="flex min-h-screen flex-col justify-between">
    <div class="flex flex-col justify-between md:flex-row">
      <div class="md:w-1/2">
        <h3
          class="mb-7 text-xl font-bold text-custom-gold-light sm:mb-20 sm:text-3xl"
        >
          {{ result }} Punkt{{ result === 1 ? '' : 'e' }}!
        </h3>
        <h1 class="typo-600 max-w-xl" v-html="completionFeedback.feedback" />
        <p class="typo-400 mt-14 max-w-xl" v-html="text" />
      </div>
      <div>
        <div class="relative w-80 pt-8">
          <CircleGraph :amount-questions="amountQuestions" :result="result" />
        </div>
        <div class="typo-400 text-center text-gold-700">
          {{ result }}/{{ amountQuestions }} Richtig
        </div>
      </div>
    </div>

    <!-- FOOTER BUTTONS -->
    <div class="flex w-full justify-between">
      <!-- SHOW SOLUTIONS -->
      <button
        class="typo-400 mt-16 flex w-min cursor-pointer items-center space-x-2 rounded text-custom-gold-light outline-none ring-custom-gold-light focus:ring"
        @click=";[(showSolutions = true), scrollToSolutions()]"
      >
        <p class="whitespace-nowrap">Lösungen anzeigen</p>
        <ArrowIcon class="w-6 rotate-90 transform text-custom-gold-light" />
      </button>

      <!-- AGAIN -->
      <NextButton @click.native="$store.commit('SET_INDEX', 0)"
        >Neues Quiz starten</NextButton
      >
    </div>
    <transition name="fade">
      <Solutions v-show="showSolutions" ref="solutions" class="mt-16" />
    </transition>
  </Container>
</template>

<script>
export default {
  data: () => ({
    showSolutions: false,
  }),

  computed: {
    text() {
      return 'Hol dir jetzt dein Mandelbärli an unserem Stand ab! Zeig uns dafür deine Punktzahl.'
    },

    result() {
      return this.$store.getters['solutions/result']
    },

    solutions() {
      return this.$store.getters['solutions/solutions']
    },

    completionFeedback() {
      const percentCorrect = (100 / this.amountQuestions) * this.result // Get percent of correct questions
      const resultsText =
        this.$store.getters.completion.completion_feedback.filter(
          (res) => res.point_range >= percentCorrect
        ) // Delete all feedback texts which are below the achieved score

      // Sort array
      resultsText.sort(function (a, b) {
        return a.point_range - b.point_range
      })

      return resultsText[0] // Return obj with smallest point range
    },

    index() {
      return this.$store.getters.index - 1
    },

    amountQuestions() {
      return this.$store.getters.questions.length
    },
  },

  mounted() {
    this.$confetti.start({
      defaultColors: ['#D5C283', '#FFFDF5', '#EBDFB7'],
      defaultSize: 6,
      particlesPerFrame: 1,
    })
    window.setTimeout(() => {
      this.$confetti.stop()
    }, 3500)
    this.$store.dispatch('saveResult')
  },

  methods: {
    async scrollToSolutions() {
      console.log('scroll to solutions')
      await this.$nextTick()
      this.$refs.solutions.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
  },
}
</script>
