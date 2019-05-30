
const Types = {
    GET_ALL_STORIES: "GET_ALL_STORIES",
    UPDATE_SEARCH: "UPDATE_SEARCH",
    CLEAR_SEARCH: "CLEAR_SEARCH",
}

const updateSearch = (searchType, search) => ({
    type: Types.UPDATE_SEARCH,
    payload: { searchType, search }
})

const getAllStories = data => ({
    type: Types.GET_ALL_STORIES,
    payload: data
})

const clearSearch = () => ({
    type: Types.CLEAR_SEARCH,
    payload: ''
})


export default {
    updateSearch,
    getAllStories,
    clearSearch,
    Types
};