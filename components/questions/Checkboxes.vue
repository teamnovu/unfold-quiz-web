<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="space-y-5">
      <Checkbox
        v-for="(checkbox, index) in checkboxes"
        :id="`checkbox-${index}`"
        :key="index"
        :value="checkbox.checked"
        class="typo-400 min-h-[4rem] w-auto space-x-5 rounded-full bg-white bg-opacity-15 px-6 py-4 pr-12 transition-colors hover:bg-opacity-25 sm:min-h-[5rem] sm:pr-16"
        :class="{ 'bg-opacity-25': checkbox.checked }"
        @input="onInput(index, $event)"
      >
        {{ checkbox.answer }}
      </Checkbox>
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
      screenWidth: 0,
    }
  },

  watch: {
    async screenWidth() {
      await this.$nextTick()

      this.checkboxes.forEach((checkbox, index) => {
        console.log(this.$refs[`checkbox-${index}`].clientWidth)
        const element = this.$refs[`checkbox-${index}`][0].$el
        if (!element) return
        const width = element.clientWidth
        const stringLength = element.textContent.length
        const proportion = width / stringLength
        if (proportion > 9) {
          element.style.borderRadius = '2rem'
        }
        console.log(width, stringLength, proportion)
      })
    },
  },

  mounted() {
    window.addEventListener('resize', this.calculateBorderRadius)
    this.calculateBorderRadius()
    if (!this.data.checkboxes) return
    this.data.checkboxes.forEach((checkbox) => {
      this.checkboxes.push({
        answer: checkbox.answer,
        checked: false,
      })
    })
  },

  unmounted() {
    window.removeEventListener('resize', this.calculateBorderRadius)
  },

  methods: {
    getScreenWidth() {
      this.screenWidth = document.documentElement.clientWidth
    },

    onInput(index, $event) {
      this.checkboxes.forEach((checkbox, i) => {
        if (i === index) {
          checkbox.checked = $event
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

    async calculateBorderRadius() {
      // based on element height
      await this.$nextTick()
      if (!this.checkboxes && !this.checkboxes.length) return
      let roundedFull = true
      this.checkboxes.forEach((checkbox, index) => {
        const element = document.getElementById(`checkbox-${index}`)
        if (!element) return
        if (element.clientHeight > 90) {
          roundedFull = false
        }
      })
      this.checkboxes.forEach((checkbox, index) => {
        const element = document.getElementById(`checkbox-${index}`)
        if (!element) return
        if (roundedFull) {
          element.style.borderRadius = '9999px'
        } else {
          element.style.borderRadius =
            document.documentElement.clientWidth > 640 ? '1.5rem' : '0.75rem'
        }
      })
    },
  },
}
</script>
