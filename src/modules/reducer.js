import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
    stories: {},
    search: {
        query: '',
    }
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case ACTIONS.Types.GET_ALL_STORIES: {
            let newState = _.cloneDeep(state)
            newState.stories = action.payload
            return newState
        }

        case ACTIONS.Types.UPDATE_SEARCH: {
            let newState = _.cloneDeep(state)
            newState.search[action.payload.searchType] = action.payload.search
            return newState
        }

        case ACTIONS.Types.CLEAR_SEARCH: {
            let newState = _.cloneDeep(state)
            newState.search = defaultState.search
            return newState
        }

        default:
            return state;
    }
};

export default reducer;