<template>
  <div>
    <transition
      :name="
        $store.getters.direction === 'prev' ? 'slideLeftIn' : 'slideRightIn'
      "
      mode="out-in"
    >
      <!-- INTRO -->
      <Home v-if="pageIndex === 0" key="0" />

      <!-- QUESTIONS LOOP -->
      <div
        v-else-if="pageIndex > 0 && pageIndex < questions.length + 1"
        key="1"
      >
        <transition
          :name="
            $store.getters.direction === 'prev' ? 'slideLeftIn' : 'slideRightIn'
          "
          mode="out-in"
        >
          <template v-for="(question, index) in questions">
            <Component
              :is="question.type.replace(/_/g, '-')"
              v-if="isVisible(index)"
              :key="index"
              :data="question"
              :question-index="index"
            />
          </template>
        </transition>
      </div>

      <!-- REGISTER -->
      <Register v-else-if="pageIndex === questions.length + 1" key="2" />

      <!-- COMPLETION -->
      <div v-else-if="pageIndex === questions.length + 2" key="3">
        <Completion />
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

  beforeMount() {
    this.$store.dispatch('fetchPage')
    this.$store.commit('solutions/LOAD_SOLUTIONS')
  },

  methods: {
    isVisible(index) {
      return index + 1 === this.pageIndex
    },
  },
}
</script>
