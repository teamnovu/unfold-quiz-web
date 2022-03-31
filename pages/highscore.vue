<template>
  <div class="relative flex h-screen flex-col items-center justify-center">
    <div
      class="flex aspect-square animate-pulse items-center justify-center rounded-full border-4 border-gold-700 p-20"
    >
      <transition name="fade">
        <h1 :key="maxScore" class="text-[12rem] font-bold text-gold-700">
          {{ maxScore }}
        </h1>
      </transition>
    </div>

    <div class="mt-36 flex flex-col items-center text-3xl text-gold-600">
      <span class="text-4xl font-bold">{{ usersWithMaxScore }}</span>
      <span>Bewerber für den Hauptpreis</span>
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
