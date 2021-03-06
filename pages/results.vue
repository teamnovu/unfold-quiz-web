<template>
  <Container>
    <div
      class="grid grid-cols-1 gap-5 py-5 text-custom-gold-light sm:grid-cols-3 md:grid-cols-5"
    >
      <button
        v-for="(sortOption, index) in sortOptions"
        :key="index"
        class="rounded border border-custom-gold-light"
        @click="sort = sortOption"
      >
        {{ sortOption }}
      </button>
      <div>Total users: {{ sortedUsers.length }}</div>
      <div>Total attempts: {{ attempts }}</div>
    </div>

    <transition-group name="listFilter" mode="out-in" class="space-y-2">
      <Accordion
        v-for="(user, index) in sortedUsers"
        :key="user.email || index"
        class="relative rounded bg-custom-gray-darkest px-7 py-2 transition-all duration-300"
      >
        <!-- HEADER -->
        <template #header>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            <div class="grid w-44 grid-cols-3 gap-1">
              <div class="font-bold text-custom-gold-light">
                {{ points(user.results).points }}
              </div>
              <div>of</div>
              <div>{{ points(user.results).total }}</div>
            </div>
            <div>{{ user.firstname }} {{ user.lastname }}</div>
            <div class="font-bold text-custom-gold-light">{{ user.email }}</div>
            <div>Newsletter: {{ user.newsletter }}</div>
            <div>Attempts: {{ user.results.length }}</div>
          </div>
        </template>
        <!-- CONTENT -->
        <template #content>
          <div class="py-5">
            <div v-for="(result, i) in user.results" :key="i">
              <div class="grid grid-cols-2 gap-y-2">
                <div class="grid w-40 grid-cols-3 gap-1">
                  <div>{{ result.points }}</div>
                  <div>of</div>
                  <div>{{ result.total }}</div>
                </div>
                <div>{{ result.completed_at }}</div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>
    </transition-group>
  </Container>
</template>

<script>
export default {
  async asyncData({ error, $axios }) {
    let page = {}
    try {
      page = await $axios.$get('/collections/pages/entries/results')
    } catch (err) {
      error({
        statusCode: err.response?.status,
        message: err.response?.data?.message,
      })
    }
    return page
  },

  data() {
    return {
      sort: 'points',
      sortOptions: {
        points: 'Points',
        email: 'Email',
        newsletter: 'Newsletter',
      },
    }
  },

  computed: {
    sortedUsers() {
      const users = this.data.users
      if (this.sort === 'Email') {
        return users.sort((a, b) => a.email.localeCompare(b.email))
      }
      if (this.sort === 'Points') {
        return users.sort(
          (a, b) =>
            this.points(b.results).points - this.points(a.results).points
        )
      }
      if (this.sort === 'Newsletter') {
        return users.sort((a, b) => b.newsletter - a.newsletter)
      }
      return users
    },

    attempts() {
      let attempts = 0
      this.sortedUsers.forEach((user) => {
        attempts += user.results.length
      })
      return attempts
    },
  },

  methods: {
    points(results) {
      if (!results) return 'N/A'
      let points = 0
      let total = 0
      results.forEach((result) => {
        if (result.points > points) {
          points = result.points
          total = result.total
        }
      })
      return { points, total }
    },
  },
}
</script>
