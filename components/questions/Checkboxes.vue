<template>
  <QuestionContainer :data="data" @next="checkAnswer()">
    <div class="space-y-5">
      <Checkbox
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :value="checkbox.checked"
        class="typo-400 min-h-[4rem] w-auto space-x-5 rounded-[4rem] bg-white bg-opacity-15 px-6 py-4 pr-12 sm:min-h-[5rem] sm:pr-16"
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
    }
  },

  mounted() {
    if (!this.data.checkboxes) return
    this.data.checkboxes.forEach((checkbox) => {
      this.checkboxes.push({
        answer: checkbox.answer,
        checked: false,
      })
    })
  },

  methods: {
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
  },
}
</script>
