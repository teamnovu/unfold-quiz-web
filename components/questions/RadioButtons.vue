<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="grid gap-3 sm:gap-5">
      <RadioButton
        v-for="(radioButton, index) in radioButtons"
        :id="`radioButton-${index}`"
        :key="index"
        :value="radioButton.checked"
        :disabled="checkForFlee(index) && isFleeing"
        class="relative min-h-[4rem] space-x-5 bg-white bg-opacity-15 px-6 py-4 pr-12 transition-all hover:bg-opacity-25 sm:min-h-[5rem] sm:pr-16"
        :class="{
          'bg-opacity-25': radioButton.checked,
        }"
        @input="onInput(index)"
        @click.native="checkForFlee(index) && isFleeing ? onInput(index) : null"
        @mouseenter.native="flee(index, $event)"
      >
        {{ radioButton.answer }}
      </RadioButton>
    </div>
  </QuestionContainer>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    questionIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      radioButtons: [],
      timesFleed: 0,
    }
  },

  computed: {
    isFleeing() {
      return this.timesFleed <= 5
    },
  },

  mounted() {
    window.addEventListener('resize', this.calculateBorderRadius)
    this.calculateBorderRadius()
    if (!this.data.radio_buttons) return
    this.data.radio_buttons.forEach((radioButton) => {
      this.radioButtons.push({
        answer: radioButton.answer,
        checked: false,
      })
    })
  },

  unmounted() {
    window.removeEventListener('resize', this.calculateBorderRadius)
  },

  methods: {
    flee(index) {
      if (!this.checkForFlee(index)) return
      const radioButton = document.getElementById(`radioButton-${index}`)
      let width = radioButton.offsetWidth
      let length = radioButton.offsetHeight
      if (!this.isFleeing) width = width / 3
      if (!this.isFleeing) length = length / 3
      const x = Math.round(Math.random() * (length - -length) + -length)
      const y = Math.round(Math.random() * (width - -width) + -width)
      radioButton.style.transform = `translate(${x}px, ${y}px)`
      radioButton.style.backgroundColor = '#2b2b2b'
      radioButton.style.zIndex = '100'
    },

    checkForFlee(index) {
      return this.data.radio_buttons[index].answer === 'WordPress'
    },

    onInput(index) {
      if (this.checkForFlee(index)) {
        this.timesFleed++
        this.flee(index)
        if (this.isFleeing) return
      }

      this.radioButtons.forEach((radioButton, i) => {
        if (i === index) {
          radioButton.checked = true
        } else {
          radioButton.checked = false
        }
      })
      this.checkAnswer()
    },

    checkAnswer() {
      const index = this.radioButtons.findIndex((radioButton) => {
        return radioButton.checked
      })
      const radioButton = this.data.radio_buttons[index]
      let answer = ''
      let correct = false

      // if no answer is given
      if (!radioButton) {
        correct = false
        answer = this.data.answer_incorrect
      } else {
        correct = radioButton.correct
        if (correct) {
          answer = this.getCorrectAnswer(radioButton)
        } else {
          answer = this.getIncorrectAnswer(radioButton)
        }
      }

      this.$store.dispatch('solutions/storeAnswer', {
        correct,
        answer,
        questionIndex: this.questionIndex,
      })
    },

    getCorrectAnswer(radioButton) {
      if (this.data.global_feedback) {
        return this.data.answer_correct
      } else {
        return radioButton.answer_correct_text || this.data.answer_correct
      }
    },

    getIncorrectAnswer(radioButton) {
      if (this.data.global_feedback) {
        return this.data.answer_incorrect
      } else {
        return radioButton.answer_incorrect_text || this.data.answer_incorrect
      }
    },

    async calculateBorderRadius() {
      // based on element height
      await this.$nextTick()
      if (!this.radioButtons && !this.radioButtons.length) return
      this.radioButtons.forEach((radioButton, index) => {
        const element = document.getElementById(`radioButton-${index}`)
        if (!element) return
        if (element.clientHeight > 90) {
          element.style.borderRadius = '1.5rem'
        } else {
          element.style.borderRadius = '9999px'
        }
      })
    },
  },
}
</script>
