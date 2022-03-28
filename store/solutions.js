export const state = () => ({
  solutions: [],
})

export const actions = {
  storeAnswer({ rootGetters, commit }, payload) {
    const question = rootGetters.questions[payload.questionIndex].question
    let questionText = ''
    question.forEach((item) => {
      if (item.type === 'text') {
        questionText += item.text
      }
    })
    const answer = {
      questionIndex: payload.questionIndex,
      question: questionText,
      correct: payload.correct,
      answer: payload.answer,
      storedAnswers: payload.storedAnswers,
    }

    commit('SET_ANSWER', answer)
  },
}

export const mutations = {
  SET_ANSWER(state, answer) {
    const solutions = [...state.solutions]
    const index = solutions.findIndex((solution) => {
      return solution.questionIndex === answer.questionIndex
    })

    if (index === -1) {
      solutions.push(answer)
    } else {
      solutions[index] = answer
    }

    state.solutions = JSON.parse(JSON.stringify(solutions))
    localStorage.setItem('solutions', JSON.stringify(solutions))
  },

  LOAD_SOLUTIONS(state) {
    const solutions = JSON.parse(localStorage.getItem('solutions'))
    if (!solutions) return
    state.solutions = solutions
  },

  RESET(state) {
    state.solutions = []
    localStorage.removeItem('solutions')
  },
}

export const getters = {
  solutions: (state) => {
    return state.solutions
  },

  storedAnswer: (state) => (questionIndex) => {
    const storedAnswers = state.solutions[questionIndex]?.storedAnswers
    if (!storedAnswers) return []
    return JSON.parse(JSON.stringify(storedAnswers))
  },

  result: (state) => {
    let correct = 0
    state.solutions.forEach((solution) => {
      if (solution.correct) {
        correct++
      }
    })
    return correct
  },
}
