export const state = () => ({
  answers: [],
})

export const mutations = {
  SET_ANSWER(state, answer) {
    console.log(answer)
    if (state.answers[answer.questionIndex]) {
      state.answers[answer.questionIndex] = {
        correct: answer.correct,
        answer: answer.answer,
      }
      return
    }
    state.answers.push({
      correct: answer.correct,
      answer: answer.answer,
    })
  },
}

export const getters = {
  answers: (state) => {
    return state.answers
  },
}
