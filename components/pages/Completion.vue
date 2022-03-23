<template>
  <Container class="flex min-h-screen flex-col justify-between">
    <div class="flex flex-col justify-between sm:min-h-[calc(100vh-14rem)]">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="md:w-1/2">
          <h3
            class="mb-7 text-xl font-bold text-custom-gold-light sm:mb-20 sm:text-3xl"
          >
            {{ result }} Punkt{{ result === 1 ? '' : 'e' }}!
          </h3>
          <h1
            class="typo-600 max-w-xl sm:leading-15"
            v-html="completionFeedback.feedback"
          />
          <p class="typo-400 mt-14 max-w-xl">
            {{
              mandelbaerliReceived
                ? completion.no_manderlbaerli_text
                : completion.manderlbaerli_text
            }}
          </p>
        </div>
        <div class="relative flex justify-between md:block">
          <div
            class="relative -mr-16 w-80 translate-x-[-12.5%] scale-75 pt-8 md:scale-100"
          >
            <CircleGraph
              :amount-questions="amountQuestions"
              :result="result"
              @hover-leave="mouseleave()"
              @hover-over-circle="hoverOverCircle()"
              @hover-over-result="hoverOverResult()"
            />
          </div>
          <div
            class="typo-400 absolute flex w-full flex-row items-center justify-center text-center text-gold-600"
          >
            {{
              showHoverText
                ? resultText
                : `${result}/${amountQuestions} Richtig`
            }}
          </div>
        </div>
      </div>

      <!-- FOOTER BUTTONS -->
      <div class="mb-20 flex w-full justify-between">
        <!-- SHOW SOLUTIONS -->
        <button
          class="typo-400 mt-16 -ml-3 flex w-min cursor-pointer items-center space-x-2 rounded p-3 text-custom-gold-light outline-none ring-custom-gold-light focus-visible:ring"
          @click="scrollToSolutions($event)"
        >
          <p class="whitespace-nowrap">Lösungen anzeigen</p>
          <ArrowIcon class="w-6 rotate-90 transform text-custom-gold-light" />
        </button>

        <!-- AGAIN -->
        <NextButton @click.native="$store.commit('SET_INDEX', 0)"
          >Neues Quiz starten</NextButton
        >
      </div>
    </div>
    <Solutions ref="solutions" class="mt-56" />
    <transition name="grow">
      <GifPlayer v-if="cry" />
    </transition>
  </Container>
</template>

<script>
export default {
  data: () => ({
    cry: false,
    showHoverText: false,
    resultText: '',
  }),

  computed: {
    completion() {
      return this.$store.getters.completion
    },

    result() {
      return this.$store.getters['solutions/result']
    },

    solutions() {
      return this.$store.getters['solutions/solutions']
    },

    completionFeedback() {
      const percentCorrect = (100 / this.amountQuestions) * this.result // Get percent of correct questions
      if (!this.completion.completion_feedback) return ''

      const resultsText = this.completion.completion_feedback.filter(
        (res) => res.point_range >= percentCorrect
      ) // Delete all feedback texts which are below the achieved score

      // Sort array
      resultsText.sort(function (a, b) {
        return a.point_range - b.point_range
      })

      return resultsText[0] || {} // Return obj with smallest point range
    },

    index() {
      return this.$store.getters.index - 1
    },

    amountQuestions() {
      return this.$store.getters.questions.length
    },

    mandelbaerliReceived() {
      return this.$store.getters.mandelbaerliReceived
    },
  },

  async mounted() {
    this.$store.dispatch('saveResult')
    await this.$nextTick()
    if (this.checkIfCrying()) {
      this.startCrying()
    } else {
      this.startConfetti()
    }
  },

  methods: {
    checkIfCrying() {
      const userEmail = this.$store.getters.user.email
      const history = JSON.parse(localStorage.getItem('history')) || []

      let amountZeroPoints = 0
      history.forEach((historyItem) => {
        if (historyItem.user !== userEmail) return
        if (historyItem.points !== 0) return
        amountZeroPoints++
      })
      if (amountZeroPoints >= 1) {
        // adjust this value to determine how many zero round are needed to cry
        localStorage.removeItem('history')
        return true
      } else {
        return false
      }
    },

    hoverOverCircle() {
      this.showHoverText = true
      this.resultText = `${this.amountQuestions} Fragen falsch Beantwortet`
      console.log('circle')
    },

    hoverOverResult() {
      this.showHoverText = true
      this.resultText = `${this.result} Fragen richtig Beantwortet`
      console.log('result')
    },

    mouseleave() {
      this.showHoverText = false
    },

    async startCrying() {
      await this.timeout(1000)
      this.cry = true
      await this.timeout(5000)
      this.cry = false
    },

    timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },

    async startConfetti() {
      this.$confetti.start({
        defaultColors: ['#D5C283', '#FFFDF5', '#EBDFB7'],
        defaultSize: 6,
        particlesPerFrame: 1,
      })
      await this.timeout(3500)
      this.$confetti.stop()
    },

    scrollToSolutions() {
      this.$refs.solutions.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
  },
}
</script>
