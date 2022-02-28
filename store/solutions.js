export const state = () => ({
  solutions: [],
})

export const mutations = {
  SET_SOLUTION(state, answer) {
    // console.log(getters)
    // const question = getters.questions[answer.questionIndex]
    // console.log(question)
    if (state.solutions[answer.questionIndex]) {
      state.solutions[answer.questionIndex] = {
        correct: answer.correct,
        answer: answer.answer,
      }
      return
    }
    state.solutions.push({
      correct: answer.correct,
      answer: answer.answer,
    })
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
