<template>
  <Container class="flex flex-col justify-between">
    <!-- QUESTION -->
    <div class="space-y-14">
      <!-- TITLE -->
      <div>
        <h1 class="typo-600">
          {{ register.register_title }}
        </h1>
      </div>

      <!-- FORM -->
      <div>
        <ValidationObserver ref="observer">
          <form
            class="grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2"
            autocomplete="off"
          >
            <InputField
              v-model="user.firstname"
              rules="required"
              name="Vorname"
            />
            <InputField
              v-model="user.lastname"
              rules="required"
              name="Nachname"
            />
            <InputField
              v-model="user.email"
              rules="required|email"
              name="E-Mail"
              type="email"
            />
            <InputField v-model="user.company" name="Firma (optional)" />
          </form>
        </ValidationObserver>
      </div>
      <!-- CHECKBOX -->
      <Checkbox class="space-x-5" @input="user.newsletter = $event">
        <div class="text-base sm:text-2xl">{{ register.checkbox_text }}</div>
      </Checkbox>
    </div>

    <!-- NEXT BUTTON -->
    <NextButton class="self-end" @click.native="nextPage()"
      >Zur Auswertung</NextButton
    >
  </Container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        newsletter: false,
      },
    }
  },

  computed: {
    register() {
      return this.$store.getters.register
    },
  },

  watch: {
    user: {
      handler() {
        this.setUser()
      },

      deep: true,
    },
  },

  beforeMount() {
    this.$store.commit('LOAD_USER')
  },

  async mounted() {
    const user = this.$store.getters.user
    this.user = { ...user }
    await this.$nextTick()
    this.$refs.observer.reset()
  },

  methods: {
    async setUser() {
      if (!this.user.firstname || !this.user.lastname || !this.user.email)
        return
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return

      this.$store.commit('SET_USER', { ...this.user })
    },

    async nextPage() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      this.$store.commit('SET_INDEX', this.$store.getters.index + 1)
    },
  },
}
</script>
