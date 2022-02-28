export const state = () => ({
  solutions: [
    {
      questionIndex: 4,
      question:
        '<p>Welche dieser Angebote gehören NICHT zu unseren Kernkompetenzen?</p>',
      correct: false,
      answer: null,
    },
    {
      questionIndex: 5,
      question:
        '<p>Wann wird eine    Checkbox und wann ein    Radio-Button verwendet?</p>',
      correct: true,
      answer: '<p>Stimmt</p>',
    },
  ],
})

export const actions = {
  storeAnswer({ rootGetters, commit }, payload) {
    const question = rootGetters.questions[payload.questionIndex].question

    const answer = {
      questionIndex: payload.questionIndex,
      question,
      correct: payload.correct,
      answer: payload.answer,
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

    state.solutions = solutions
  },
}

export const getters = {
  solutions: (state) => {
    return state.solutions
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
