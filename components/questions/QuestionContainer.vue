<template>
  <Container class="flex min-h-screen flex-col justify-between">
    <div class="space-y-14">
      <!-- TITLE -->
      <div class="mb-16">
        <QuestionIndex />

        <QuestionText :data="data.question" />
      </div>

      <!-- QUESTION -->
      <div>
        <slot />
      </div>
    </div>

    <!-- NEXT BUTTON -->
    <NextButton
      class="self-end"
      @click.native="
        ;[$store.commit('SET_INDEX', $store.getters.index + 1), $emit('next')]
      "
      >{{
        $store.getters.index === $store.getters.questions.length + 1
          ? 'Zum Resultat'
          : 'Nächste Frage'
      }}
    </NextButton>
  </Container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
