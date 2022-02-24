<template>
  <div class="">
    <transition name="slide-right-in" mode="out-in">
      <!-- INTRO -->
      <Home v-if="pageIndex === 0" key="0" />
      <!-- REGISTER -->
      <Register v-else-if="pageIndex === 1" key="1" />

      <!-- QUESTIONS LOOP -->
      <div v-else-if="pageIndex > 1 && pageIndex < questions.length + 2">
        <div v-for="(question, index) in questions" :key="index">
          <transition name="slide-right-in" mode="out-in">
            <Component
              :is="question.type.replace(/_/g, '-')"
              v-if="isVisible(index)"
              :key="index"
              :data="question"
            >
              {{ question.type }}
            </Component>
          </transition>
        </div>
      </div>

      <!-- COMPLETION -->
      <div v-else-if="pageIndex > questions.length + 2">
        <transition name="slide-right-in" mode="out-in">
          <Solutions />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import head from '~/mixins/head'

export default {
  mixins: [head],
  computed: {
    pageIndex() {
      return this.$store.getters.index
    },

    questions() {
      return this.$store.getters.questions
    },
  },

  methods: {
    isVisible(index) {
      return index + 2 === this.pageIndex
    },
  },
}
</script>
