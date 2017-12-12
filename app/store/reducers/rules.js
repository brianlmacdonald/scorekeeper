const GET_RULES = 'GET_RULES'

export const getRulesAction = (payload) => ({
  type: GET_RULES,
  payload
})

const initalState = {}

const rules = (state = initalState, action) => {
  switch (action.type) {

    case GET_RULES:
    return action.payload

    default:
    return state;
  }
}

export default rules
