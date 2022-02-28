<template>
  <QuestionContainer :data="data">
    <div class="grid gap-3 sm:gap-5">
      <RadioButton
        v-for="(radioButton, index) in radioButtons"
        :key="index"
        :value="radioButton.checked"
        class="min-h-[4rem] space-x-5 rounded-full bg-white bg-opacity-15 px-6 py-4 sm:min-h-[5rem]"
        @input="onInput(index)"
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
    }
  },

  mounted() {
    if (!this.data.radio_buttons) return
    this.data.radio_buttons.forEach((radioButton) => {
      this.radioButtons.push({
        answer: radioButton.answer,
        checked: false,
      })
    })
  },

  methods: {
    onInput(index) {
      this.radioButtons.forEach((radioButton, i) => {
        if (i === index) {
          radioButton.checked = true
        } else {
          radioButton.checked = false
        }
      })
      this.checkAnswer(this.data.radio_buttons[index])
    },

    checkAnswer(radioButton) {
      // check if answer is correct
      let correct = false
      let answer = ''
      if (radioButton.correct) {
        correct = true
      }

      if (correct) {
        answer = this.getCorrectAnswer(radioButton)
      } else {
        answer = this.getIncorrectAnswer(radioButton)
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
  },
}
</script>
