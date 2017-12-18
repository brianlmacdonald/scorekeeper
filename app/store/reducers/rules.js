const GET_RULES = 'GET_RULES'
const LOAD_CONTINUE = 'LOAD_CONTINUE'

export const getRulesAction = (payload) => ({
  type: GET_RULES,
  payload
})

export const loadContinueAction = (payload) => ({
  type: LOAD_CONTINUE,
  payload
})

const initalState = {}

const rules = (state = initalState, action) => {
  switch (action.type) {

    case LOAD_CONTINUE:
    return action.payload.rules

    case GET_RULES:
    return action.payload

    default:
    return state;
  }
}

export default rules
