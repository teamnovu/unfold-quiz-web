<template>
  <QuestionContainer :data="data">
    <div class="grid gap-3 sm:gap-5">
      <RadioButton
        v-for="(radioButton, index) in data.radio_buttons"
        :key="index"
        class="h-16 rounded-full bg-white bg-opacity-15 px-6 py-4 sm:h-20"
        >{{ radioButton.answer }}</RadioButton
      >
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
  },

  mounted() {
    console.log(this.data)
  },
}
</script>
