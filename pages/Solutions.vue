<template>
  <div class="flex justify-between">
    <div class="w-1/2">
      <h3
        class="mb-7 text-xl font-bold text-custom-gold-light sm:mb-9 sm:text-3xl"
      >
        12 Punkte!
      </h3>
      <h1 class="typo-600">Gratuliere du gehörst zu den novu Profis!!</h1>
      <p>
        Hol dir jetzt dein Mandelbärli an unserem Stand ab! Zeig uns dafür deine
        Punktzahl.
      </p>
    </div>
    <div>
      <div class="gradient rounded-full" />
      <div>12/15 Richtig</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    completion() {
      return this.$store.getters.completion
    },
  },
}
</script>

<style scoped>
.gradient {
  background: transparent
    conic-gradient(
      from 0deg at 50% 50%,
      #ede9db 0%,
      #e9e2cb 18.23%,
      #f0e8cb 33%,
      #d5c283 56.65%,
      #d5c283 74.38%,
      #e5d087 84.73%,
      #ebdfb7 100%
    )
    0% 0% no-repeat padding-box;
}
</style>
