
const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    GET_ALL_STORIES: "GET_ALL_STORIES"

}

const getAllStories = data => ({
    type: Types.GET_ALL_STORIES,
    payload: data
})

export default {
    getAllStories,
    Types
};