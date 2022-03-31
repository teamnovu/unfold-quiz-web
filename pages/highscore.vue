<template>
  <div class="relative flex h-screen flex-col items-center justify-center">
    <!-- HIGHSCORE -->
    <div class="relative flex aspect-square items-center justify-center">
      <transition name="grow" mode="out-in">
        <h1 :key="maxScore" class="m-20 text-[12rem] font-bold text-gold-600">
          {{ maxScore }}
        </h1>
      </transition>
      <div
        class="bo insert-0 absolute h-full w-full animate-pulse rounded-full border-4 border-gold-700"
      />
    </div>

    <!-- AMOUNT -->
    <div
      class="mt-36 flex flex-col items-center text-5xl font-bold uppercase tracking-widest text-gold-700"
    >
      AKTUELLER HIGHSCORE
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersWithMaxScore: 0,
      maxScore: 0,
    }
  },

  created() {
    this.pollData()
  },

  mounted() {
    this.fetchHighScore()
  },

  beforeDestroy() {
    clearInterval(this.polling)
  },

  methods: {
    pollData() {
      this.polling = setInterval(() => {
        this.fetchHighScore()
      }, 3000)
    },

    async fetchHighScore() {
      let response
      try {
        response = await this.$axios.$get('/highscore')
      } catch (error) {
        console.log(error)
      }
      this.usersWithMaxScore = response.usersWithMaxScore || 0
      this.maxScore = response.maxScore || 0
    },
  },
}
</script>
