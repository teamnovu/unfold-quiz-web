export const state = () => ({
  index: localStorage.getItem('index') || 0,
  lastIndex: 0,
  page: {},
  user: {
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    newsletter: false,
  },
  isSaved: localStorage.getItem('isSaved'),
  mandelbaerliScoreAchieved: false,
  mandelbaerliReceived: null,
  isKiosk: false,
})

export const actions = {
  async fetchPage({ commit }) {
    let page = {}
    try {
      page = await this.$axios.$get('/collections/pages/entries/home')
    } catch (err) {
      console.log(err)
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
      mandelbaerli_score_achieved: state.mandelbaerliScoreAchieved,
    }

    console.log(payload)

    const history = JSON.parse(localStorage.getItem('history')) || []
    const historyItem = {
      user: payload.user.email,
      points: payload.points,
    }
    history.push(historyItem)
    localStorage.setItem('history', JSON.stringify(history))

    let response = null
    try {
      response = await this.$axios.$post('/result', payload)
    } catch (err) {
      console.log(err)
      return
    }

    commit('SET_MANDELBAERLI_RECEIVED', response.mandelbaerli_received)
    commit('SET_SAVED', true)
  },

  reset({ commit }) {
    commit('RESET')
    commit('solutions/RESET')
  },
}

export const mutations = {
  SET_PAGE(state, page) {
    state.page = page || {}
  },

  SET_INDEX(state, index) {
    state.lastIndex = state.index
    state.index = index
    localStorage.setItem('index', index)
  },

  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },

  LOAD_USER(state) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    state.user = user
  },

  SET_SAVED(state, bool) {
    state.isSaved = bool
    localStorage.setItem('isSaved', true)
  },

  SET_MANDELBAERLI_RECEIVED(state, bool) {
    state.mandelbaerliReceived = bool
  },

  SET_MANDELBAERLI_SCORE_ACHIEVED(state, bool) {
    state.mandelbaerliScoreAchieved = bool
  },

  SET_KIOSK(state, isKiosk) {
    state.isKiosk = isKiosk
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
    localStorage.removeItem('isSaved')

    if (state.isKiosk) {
      localStorage.removeItem('user')
    }
  },
}

export const getters = {
  index: (state) => {
    return parseInt(state.index)
  },

  direction: (state) => {
    return state.index > state.lastIndex ? 'next' : 'prev'
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
    return state.page.components || []
  },

  completion: (state) => {
    return {
      completion_feedback: state.page.completion_feedback || [],
      mandelbaerli_text: state.page.mandelbaerli_text,
      no_mandelbaerli_text: state.page.no_mandelbaerli_text,
    }
  },

  history: (state) => {
    return state.history
  },

  minPointsForMandelbaerli(state) {
    return state.page.min_result_for_mandelbaerli || 100
  },

  mandelbaerliReceived: (state) => {
    return state.mandelbaerliReceived
  },
}
