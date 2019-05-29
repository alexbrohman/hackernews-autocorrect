import React, { Component } from "react"
import Header from './Header'
import Results from './Results'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"
import API from '../utils/API'
import _ from "lodash"

const mapStateToProps = state => ({
    stories: state.stories,
    search: state.search
})

const mapDispatchToProps = dispatch => ({
    getAllStories: data => dispatch(ACTIONS.getAllStories(data)),
    updateSearch: (searchType, search) => dispatch(ACTIONS.updateSearch(searchType, search))
})

class Home extends Component {
    constructor(props) {
        super(props)
        this.delayedUpdate = _.debounce(this.searchAPI, 1000)

        this.updateSearchVal = this.updateSearchVal.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.stringify = this.stringify.bind(this)
    }

    stringify(search) {
        let queryString = '?' + Object.keys(search).map(key => key + '=' + search[key]).join('&');
        queryString = queryString.replace(/ /g, '%20')
        return queryString
    }

    async searchAPI(search) {
        let queryString;

        if (search) {
            queryString = this.stringify(search)
        } else {
            queryString = this.stringify(this.props.search)
        }

        let searchResults = await API.get(queryString)
        this.props.getAllStories(searchResults.data)
    }

    nextPage() {
        let search = this.props.search
        search.page = this.props.stories.page + 1
        this.searchAPI(search)
    }

    prevPage() {
        let search = this.props.search
        search.page = this.props.stories.page - 1
        this.searchAPI(search)
    }

    updateSearchVal(queryType, e) {
        e.persist()
        this.props.updateSearch(queryType, e.target.value)
        this.delayedUpdate()
    }

    /* hitsPerPage,nbHits, nbPages, page, */

    render() {
        return (
            <div className="content-wrapper">
                <Header onKeyUp={(e) => this.updateSearchVal('query', e)} />
                {this.props.stories.hits ?
                    <Results stories={this.props.stories.hits} /> : ''}

                {!isNaN(this.props.stories.page) ?
                    <div className="pagination">
                        <button onClick={this.prevPage}>PREVIOUS</button>
                        <p>PAGE: {this.props.stories.page + 1} of {this.props.stories.nbPages}</p>
                        <button onClick={this.nextPage}>NEXT</button>
                    </div>
                    : ''}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)