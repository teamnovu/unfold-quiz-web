<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
      <button
        v-for="(radioButton, index) in radioButtons"
        :key="index"
        :class="[
          {
            'ring-4 ring-custom-gold-light':
              radioButton.checked && !data.is_illustration,
          },
          {
            'bg-custom-gray-darker':
              radioButton.checked && data.is_illustration,
          },
        ]"
        class="group bg-custom-gray-darkest transition-all hover:bg-custom-gray-darker"
        @click="onInput(index)"
      >
        <!-- NORMAL IMAGE -->
        <div
          v-if="!data.is_illustration"
          class="relative aspect-9/10 h-full w-full overflow-hidden border-2 border-custom-gold-light"
        >
          <AppImage
            v-if="radioButton.image"
            loading="lazy"
            :src="radioButton.image"
            class="h-full w-full object-cover transition-transform group-hover:scale-110"
            :class="{
              'scale-110': radioButton.checked,
            }"
          />
          <!-- GRADIENT -->
          <div class="checkbox-images-gradient absolute inset-0" />
          <!-- OVERLAY -->
          <div
            style="hyphens: auto"
            class="typo-300 absolute left-2 bottom-2 right-2 text-left font-semibold uppercase tracking-wider sm:left-5 sm:bottom-5 sm:right-5"
          >
            {{ radioButton.overlayText }}
          </div>
        </div>

        <!-- ILLUSTRATION -->
        <div
          v-else
          class="relative flex h-full w-full flex-col items-center justify-between rounded-sm px-9 pt-3 pb-5 font-bold transition-colors"
          :class="{ 'bg-custom-gold-gradient text-black': radioButton.checked }"
        >
          <AppImage
            v-if="radioButton.image"
            loading="lazy"
            :src="radioButton.image"
            class="h-full w-full object-contain"
          />

          <div
            class="typo-300 w-full text-left font-semibold uppercase tracking-wider"
            style="hyphens: auto"
          >
            {{ radioButton.overlayText }}
          </div>
        </div>
      </button>
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
          image: radioButton.image,
          overlayText: radioButton.image_overlay_text,
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
