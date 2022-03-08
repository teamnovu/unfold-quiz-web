<template>
  <div class="space-y-6">
    <h2 class="typo-400 font-bold text-custom-gold-light">Die Lösungen</h2>
    <Accordion
      v-for="(solution, index) in solutions"
      :key="index"
      class="rounded bg-custom-gray-darkest p-7"
    >
      <!-- HEADER -->
      <template #header>
        <div class="mb-4 space-y-3 sm:space-y-0">
          <div class="flex items-center space-x-3 sm:items-start sm:space-x-8">
            <!-- DOT -->
            <div
              class="relative h-6 w-6 shrink-0 rounded-full sm:h-12 sm:w-12"
              :class="
                solution.correct
                  ? 'bg-custom-green-light'
                  : 'bg-custom-red-light'
              "
            >
              <label
                class="typo-400 absolute left-1/2 top-1/2 w-auto -translate-y-1/2 -translate-x-1/2 font-bold text-black"
                >{{ solution.questionIndex + 1 }}</label
              >
            </div>

            <!-- QUESTION TITLE -->
            <div class="typo-400">
              <p
                :class="
                  solution.correct
                    ? 'text-custom-green-light'
                    : 'text-custom-red-light'
                "
                class="font-bold text-custom-green-light sm:text-xl"
              >
                {{ solution.correct ? 'Richtig!' : 'Falsch!' }}
              </p>
              <!-- DESKTOP -->
              <div
                class="hidden text-base sm:block sm:text-2xl"
                v-html="solution.question"
              />
            </div>
          </div>
          <!-- MOBILE -->
          <div
            class="text-base sm:hidden sm:text-2xl"
            v-html="solution.question"
          />
        </div>
      </template>
      <!-- CONTENT -->
      <template #content>
        <div class="sm:px-20" v-html="solution.answer" />
      </template>
    </Accordion>
  </div>
</template>

<script>
export default {
  computed: {
    solutions() {
      return this.$store.getters['solutions/solutions']
    },
  },
}
</script>
