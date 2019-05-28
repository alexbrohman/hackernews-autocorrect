import React, { Component } from "react"
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

class Results extends Component {
    constructor(props) {
        super(props)

        this.delayedSearch = _.debounce(this.searchAPI, 1000)

        this.updateSearchVal = this.updateSearchVal.bind(this)
    }

    async componentDidMount() {
        let latestStories = await API.get(searchTypes.latest)
        this.props.getAllStories(latestStories.data.hits)
    }

    async searchAPI(event) {
        const value = event.target.value
        let searchResults = await API.get(searchTypes.query + value)

        this.props.getAllStories(searchResults.data.hits)
    }

    updateSearchVal(e) {
        e.persist()
        this.delayedSearch(e)
    }

    render() {
        return (
            <div>
                <section className="search-bar">
                    <h2>{'Search'}</h2>
                    <input type="text" onKeyUp={this.updateSearchVal} />
                </section>

                <section className="results">
                    <h2>{`Story Count ${this.props.stories.length}`}</h2>
                    <ul className="results">
                        {this.props.stories.length ?
                            this.props.stories.map((story, key) =>
                                <li key={key}>
                                    <a rel="noopener noreferrer" target="_blank" href={story.url}>
                                        {story.title}
                                    </a>
                                </li>
                            )
                            :
                            <p>Loading Stories</p>
                        }
                    </ul>
                </section>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results)