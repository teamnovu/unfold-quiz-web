<template>
  <QuestionContainer :data="data">
    <div class="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
      <button
        v-for="(radioButton, index) in radioButtons"
        :key="index"
        :class="{
          'ring-4 ring-custom-gold-light':
            radioButton.checked && !data.is_illustration,
        }"
        class="transition-all"
        @click="onInput(index)"
      >
        <!-- NORMAL IMAGE -->
        <div
          v-if="!data.is_illustration"
          class="relative aspect-9/10 border-2 border-custom-gold-light"
        >
          <img
            loading="lazy"
            :src="radioButton.image.permalink"
            class="h-full w-full object-cover"
          />
          <!-- OVERLAY -->
          <div
            class="typo-400 absolute left-2 bottom-2 pr-2 text-left text-sm sm:left-5 sm:bottom-5 sm:pr-5 sm:text-xl"
          >
            {{ radioButton.overlayText }}
          </div>
        </div>

        <!-- ILLUSTRATION -->
        <div
          v-else
          class="relative flex h-full w-full flex-col items-center justify-between rounded-sm px-9 pt-3 pb-5 transition-colors"
          :class="{ 'bg-custom-gold-light text-black': radioButton.checked }"
        >
          <img loading="lazy" :src="radioButton.image.permalink" class="" />

          <div
            class="typo-400 text-left text-sm sm:left-5"
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
    console.log(this.data)
    if (!this.data.radio_buttons) return
    this.data.radio_buttons.forEach((radioButton) => {
      this.radioButtons.push({
        image: radioButton.image,
        overlayText: radioButton.image_overlay_text,
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

      this.$store.commit('solutions/SET_SOLUTION', {
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
