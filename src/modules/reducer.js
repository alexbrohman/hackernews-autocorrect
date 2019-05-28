import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
    stories: [],
    search: ''
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case ACTIONS.Types.GET_ALL_STORIES: {
            let newState = _.cloneDeep(state)
            newState.stories = [...action.payload]
            return newState
        }

        case ACTIONS.Types.UPDATE_SEARCH: {
            let newState = _.cloneDeep(state)
            newState.search = action.payload
            return newState
        }

        default:
            return state;
    }
};

export default reducer;