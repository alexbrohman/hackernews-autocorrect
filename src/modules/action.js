
const Types = {
    GET_ALL_STORIES: "GET_ALL_STORIES",
    UPDATE_SEARCH: "UPDATE_SEARCH",
}

const updateSearch = search => ({
    type: Types.UPDATE_SEARCH,
    payload: search
})

const getAllStories = data => ({
    type: Types.GET_ALL_STORIES,
    payload: data
})

export default {
    updateSearch,
    getAllStories,
    Types
};