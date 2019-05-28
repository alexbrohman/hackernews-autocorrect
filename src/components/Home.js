import React, { Component } from "react"
import Header from './Header'
import Results from './Results'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"
import API from '../utils/API'
import _ from "lodash"

const searchTypes = {
    latest: "search_by_date?tags=story",
    query: "search?query=",
    by_date: "search_by_date",
}

const mapStateToProps = state => ({
    stories: state.stories
})

const mapDispatchToProps = dispatch => ({
    getAllStories: data => dispatch(ACTIONS.getAllStories(data)),
    updateSearch: search => dispatch(ACTIONS.updateSearch(search))
})

class Home extends Component {
    constructor(props) {
        super(props)

        this.delayedSearch = _.debounce(this.searchAPI, 1000)

        this.updateSearchVal = this.updateSearchVal.bind(this)
    }

    async componentDidMount() {
        let latestStories = await API.get(searchTypes.latest)
        this.props.getAllStories(latestStories.data)
        // console.log('latest ', latestStories.data)
    }

    async searchAPI(event) {
        const value = event.target.value
        let searchResults = await API.get(searchTypes.query + value)

        this.props.getAllStories(searchResults.data)
        // console.log('search results', searchResults)
    }

    updateSearchVal(e) {
        e.persist()
        this.delayedSearch(e)
    }

    /* hitsPerPage,nbHits, nbPages, page, */

    render() {
        return (
            <div className="content-wrapper">
                <Header onKeyUp={this.updateSearchVal} />
                {this.props.stories.hits ? <Results stories={this.props.stories.hits} /> : ''}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)