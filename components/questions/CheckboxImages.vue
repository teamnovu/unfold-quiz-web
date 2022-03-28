<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
      <button
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :class="[
          {
            'ring-4 ring-custom-gold-light':
              checkbox.checked && !data.is_illustration,
          },
          {
            'bg-custom-gray-darker': checkbox.checked && data.is_illustration,
          },
        ]"
        class="group rounded-lg bg-custom-gray-darkest transition-all hover:bg-custom-gray-darker"
        @click="onInput(index)"
      >
        <!-- NORMAL IMAGE -->
        <div
          v-if="!data.is_illustration"
          class="relative aspect-9/10 h-full w-full overflow-hidden border-2 border-custom-gold-light"
        >
          <AppImage
            v-if="checkbox.image"
            :src="checkbox.image"
            class="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
            :class="{
              'scale-110': checkbox.checked,
            }"
          />
          <!-- GRADIENT -->
          <div class="checkbox-images-gradient absolute inset-0" />
          <!-- OVERLAY -->
          <div
            style="hyphens: auto"
            class="typo-300 absolute left-2 bottom-2 right-2 text-left font-semibold uppercase tracking-wider sm:left-5 sm:bottom-5 sm:right-5"
          >
            {{ checkbox.overlayText }}
          </div>
          <!-- GRADIENT -->
          <div class="gradient absolute inset-0" />
        </div>

        <!-- ILLUSTRATION -->
        <div
          v-else
          class="relative flex h-full w-full flex-col items-center justify-between rounded-sm p-3 transition-colors md:px-9 md:pt-3 md:pb-5"
          :class="{ 'bg-custom-gold-gradient text-black': checkbox.checked }"
        >
          <div class="aspect-square h-full w-full">
            <AppImage
              v-if="checkbox.image"
              :src="checkbox.image"
              class="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <!-- OVERLAY -->
          <div
            class="typo-300 absolute w-full text-left font-semibold uppercase tracking-wider sm:left-5"
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
