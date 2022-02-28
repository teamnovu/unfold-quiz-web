<template>
  <div
    class="
      flex
      min-h-screen
      flex-col
      justify-between
      px-9
      pt-32
      pb-9
      sm:pl-28 sm:pr-40 sm:pt-56 sm:pb-28
    "
  >
    <div class="flex justify-between">
      <div class="w-1/2">
        <h3
          class="
            text-custom-gold-light
            mb-7
            text-xl
            font-bold
            sm:mb-20 sm:text-3xl
          "

        >
          {{ result }} Punkt{{ result === 1 ? "" : "e" }}!
        </h3>
        <h1 class="typo-600 max-w-xl" v-html="completionFeedback.feedback"></h1>
        <p class="typo-400 mt-14 max-w-xl" v-html="text"></p>
      </div>
      <div>
        <div class="w-80 relative pt-8">
          <CircleGraph :amountQuestions="amountQuestions" :result="result" />
        </div>
        <div class="typo-400 text-center text-gold-700">
          {{ result }}/{{ amountQuestions }} Richtig
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      return "Hol dir jetzt dein Mandelbärli an unserem Stand ab! Zeig uns dafür deine Punktzahl.";
    },

    result() {
      return this.$store.getters["solutions/result"];
    },
    solutions() {
      return this.$store.getters["solutions/solutions"];
    },
    completionFeedback() {
      var procentCorrect = (100 / this.amountQuestions) * this.result; // Get procent of correct questions
      let resultsText =
        this.$store.getters.completion.completion_feedback.filter(
          (res) => res.point_range >= procentCorrect
        ); // Deleat all feedback texts which are below the achieved score

      // Sort array
      resultsText.sort(function (a, b) {
        return a.point_range - b.point_range;
      });

      return resultsText[0]; //Retrun obj with smalest point range
    },

    index() {
      return this.$store.getters.index - 1;
    },

    amountQuestions() {
      return this.$store.getters.questions.length;
    },
  },
};
</script>
