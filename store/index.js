export const state = () => ({
  page: {}
})

export const actions = {
  async nuxtServerInit ({ commit }, { error, $axios }) {
    let page = {}
    try {
      page = await $axios.$get('/collections/pages/entries/home')
    } catch (err) {
      error({
        statusCode: err.response?.status,
        message: err.response?.data?.message
      })
    }
    commit('SET_PAGE', page?.data)
  }
}

export const mutations = {
  SET_PAGE (state, page) {
    state.page = page || {}
  }
}

export const getters = {
  page: (state) => {
    return state.page
  },
  home: (state) => {
    return { main_title: state.page.main_title }
  },
  register: (state) => {
    return { register_title: state.page.register_title, checkbox_text: state.page.register_checkbox_text }
  },
  questions: (state) => {
    return { components: state.page.components }
  },
  completion: (state) => {
    return {
      completion_feedback: state.page.completion_feedback,
      mandelbaerli_text: state.page.completion_mandelbaerli_text,
      no_manderlbaerli_text: state.page.completion_no_mandelbaerli_text
    }
  }
}
