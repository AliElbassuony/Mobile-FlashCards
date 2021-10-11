import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks ( state = {}, action) {

    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck]: {
                    title: action.deck,
                    questions: []
                }
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: [...state[action.deck].questions, action.card]
                }
            }
        default:
            return state
    }
}

export default decks;