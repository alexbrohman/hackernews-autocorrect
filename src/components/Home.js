import React, { Component } from "react"
import Header from './Header'
import Results from './Results'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"
import API from '../utils/API'
import _ from "lodash"
import Pagination from "./Pagination";
import Footer from "./Footer";

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
        this.state = {
            searchType: 'search'
        }

        this.delayedUpdate = _.debounce(this.searchAPI, 1000)

        this.updateSearchVal = this.updateSearchVal.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.stringify = this.stringify.bind(this)
        this.sortDate = this.sortDate.bind(this)
        this.sortScore = this.sortScore.bind(this)
    }

    stringify(search) {
        let queryString = '?' + Object.keys(search).map(key => key + '=' + search[key]).join('&');
        queryString = queryString.replace(/ /g, '%20')
        return queryString + "&tags=story"
    }

    async searchAPI(search, searchType) {
        if (!searchType) {
            searchType = "search"
        }

        let queryString;

        if (search) {
            queryString = this.stringify(search)
        } else {
            queryString = this.stringify(this.props.search)
        }

        let searchResults = await API.get(searchType + queryString)
        this.props.getAllStories(searchResults.data)
    }

    nextPage() {
        if (this.props.stories.page < this.props.stories.nbPages) {
            let search = this.props.search
            search.page = this.props.stories.page + 1
            this.searchAPI(search)
            document.getElementById('content-wrapper').scrollTop = 0
        }
    }

    prevPage() {
        if (this.props.stories.page > 0) {
            let search = this.props.search
            search.page = this.props.stories.page - 1
            this.searchAPI(search)
            document.getElementById('content-wrapper').scrollTop = 0
        }
    }

    sortDate() {
        if (this.state.searchBy === 'date') {
            this.searchAPI(this.props.search)
            // this.setState({ searchBy: 'date' })
        } else {
            // this.setState({ searchBy: 'search' })
            this.searchAPI(this.props.search, "search_by_date")
        }
    }

    sortScore() {
        console.log('sorting score')
    }

    updateSearchVal(queryType, e) {
        e.persist()
        this.props.updateSearch(queryType, e.target.value)
        this.delayedUpdate()
    }

    componentDidMount() {
        this.searchAPI('')
    }

    /* hitsPerPage,nbHits, nbPages, page, */

    render() {
        return (
            <div id="content-wrapper">
                <Header
                    onKeyUp={(e) => this.updateSearchVal('query', e)}
                    sortDate={this.sortDate}
                    sortScore={this.sortScore}
                />
                {this.props.stories.hits ?
                    <Results stories={this.props.stories.hits} /> : ''
                }
                <Footer>
                    {!isNaN(this.props.stories.page) ?
                        <Pagination
                            page={this.props.stories.page}
                            nbPages={this.props.stories.nbPages}
                            prevPage={this.prevPage}
                            nextPage={this.nextPage}
                        />
                        : ''}
                </Footer>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)