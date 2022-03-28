<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-14">
      <div
        v-for="(radioButton, index) in radioButtons"
        :key="index"
        class="group"
      >
        <RadioButton
          :value="radioButton.checked"
          class="min-h-[4rem] space-x-5 rounded-full py-4 sm:min-h-[5rem]"
          @input="onInput(index)"
        >
          {{ radioButton.answer }}
        </RadioButton>
        <div class="rounded">
          <div
            class="relative h-full w-full cursor-pointer overflow-hidden transition-all"
            @click="onInput(index)"
          >
            <AppImage
              v-if="radioButton.image"
              loading="lazy"
              :src="radioButton.image"
              class="h-full w-full object-contain transition-transform group-hover:scale-105"
              :class="{
                'scale-105': radioButton.checked,
              }"
            />
          </div>
        </div>
      </div>
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

    // restore answers
    const storedAnswers = this.$store.getters['solutions/storedAnswer'](
      this.questionIndex
    )

    if (
      storedAnswers &&
      storedAnswers.length &&
      storedAnswers.length === this.data.radio_buttons.length
    ) {
      this.radioButtons = storedAnswers
    } else {
      this.data.radio_buttons.forEach((radioButton) => {
        this.radioButtons.push({
          answer: radioButton.answer,
          image: radioButton.image,
          checked: false,
        })
      })
    }
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
        storedAnswers: this.radioButtons,
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
