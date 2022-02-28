export const state = () => ({
  index: 0,
  page: {},
  user: {
    firstname: 'kyle',
    lastname: 'werner',
    email: 'kyle.werner2@novu.ch',
    company: 'novu',
    newsletter: false,
  },
  isSaved: false,
})

export const actions = {
  async nuxtServerInit({ commit }, { error, $axios }) {
    let page = {}
    try {
      page = await $axios.$get('/collections/pages/entries/home')
    } catch (err) {
      error({
        statusCode: err.response?.status,
        message: err.response?.data?.message,
      })
    }

    commit('SET_PAGE', page?.data)
  },
  async saveResult({ state, getters, rootGetters, commit }) {
    if (state.isSaved) return
    const payload = {
      user: state.user,
      solutions: rootGetters['solutions/solutions'],
      points: rootGetters['solutions/result'],
      total: getters.questions.length,
    }
    console.log('asdfasdfasdfasdsadffdsaafsdsdfa')
    let response = null
    try {
      response = await this.$axios.$post('/result', payload)
    } catch (err) {
      this.$nuxt.error({
        statusCode: err.response?.status,
        message: err.response?.data?.message,
      })
    }
    if (response === 200) commit('SET_SAVED', true)
    console.log(response)
  },
  reset({ commit }) {
    commit('RESET')
    commit('solutions/RESET')
    console.log('reset')
  },
}

export const mutations = {
  SET_PAGE(state, page) {
    state.page = page || {}
  },
  SET_INDEX(state, index) {
    state.index = index
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_SAVED(state, bool) {
    state.isSaved = bool
  },
  RESET(state) {
    state.isSaved = false
    state.user = {
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      newsletter: false,
    }
  },
}

export const getters = {
  index: (state) => {
    return state.index
  },
  page: (state) => {
    return state.page
  },
  user: (state) => {
    return state.user
  },
  home: (state) => {
    return { main_title: state.page.main_title }
  },
  register: (state) => {
    return {
      register_title: state.page.register_title,
      checkbox_text: state.page.register_checkbox_text,
    }
  },
  questions: (state) => {
    return state.page.components
  },
  completion: (state) => {
    return {
      completion_feedback: state.page.completion_feedback,
      mandelbaerli_text: state.page.completion_mandelbaerli_text,
      no_manderlbaerli_text: state.page.completion_no_mandelbaerli_text,
    }
  },
}
