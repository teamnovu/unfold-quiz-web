<template>
  <QuestionContainer :data="data">
    <div class="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
      <button
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :class="{
          'ring-4 ring-custom-gold-light':
            checkbox.checked && !data.is_illustration,
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
            v-if="checkbox.image"
            loading="lazy"
            :src="checkbox.image.permalink"
            class="h-full w-full object-cover"
          />
          <!-- OVERLAY -->
          <div
            class="typo-400 absolute left-2 bottom-2 pr-2 text-left text-sm sm:left-5 sm:bottom-5 sm:pr-5 sm:text-xl"
          >
            {{ checkbox.overlayText }}
          </div>
        </div>

        <!-- ILLUSTRATION -->
        <div
          v-else
          class="relative flex h-full w-full flex-col items-center justify-between rounded-sm px-9 pt-3 pb-5 transition-colors"
          :class="{ 'bg-custom-gold-light text-black': checkbox.checked }"
        >
          <img
            v-if="checkbox.image"
            loading="lazy"
            :src="checkbox.image.permalink"
            class=""
          />

          <div
            class="typo-400 text-left text-sm sm:left-5"
            style="hyphens: auto"
          >
            {{ checkbox.overlayText }}
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
      checkboxes: [],
    }
  },

  mounted() {
    console.log(this.data)
    if (!this.data.checkboxes) return
    this.data.checkboxes.forEach((checkbox) => {
      this.checkboxes.push({
        answer: checkbox.answer,
        checked: false,
        image: checkbox.image,
        overlayText: checkbox.image_overlay_text,
      })
    })
  },

  methods: {
    onInput(index) {
      this.checkboxes.forEach((checkbox, i) => {
        if (i === index) {
          checkbox.checked = !checkbox.checked
        }
      })

      this.checkAnswer()
    },

    checkAnswer() {
      // check if answer is correct
      let correct = true
      let answer = ''

      this.checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked !== this.data.checkboxes[index].correct) {
          correct = false
        }
      })

      if (correct) {
        answer = this.data.answer_correct
      } else {
        answer = this.data.answer_incorrect
      }

      this.$store.dispatch('solutions/storeAnswer', {
        correct,
        answer,
        questionIndex: this.questionIndex,
      })
    },
  },
}
</script>
