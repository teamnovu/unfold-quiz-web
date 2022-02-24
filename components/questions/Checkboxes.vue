<template>
  <QuestionContainer :data="data">
    <div class="grid gap-3 sm:gap-5">
      <Checkbox
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :value="checkbox.checked"
        class="typo-400 min-h-[4rem] rounded-full bg-white bg-opacity-15 px-6 py-4 sm:min-h-[5rem]"
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
    console.log(this.data)
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

      this.$store.commit('answers/SET_ANSWER', {
        correct,
        answer,
        questionIndex: this.questionIndex,
      })
    },
  },
}
</script>
