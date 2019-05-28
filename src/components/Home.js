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
    updateSearch: (searchType, search) => dispatch(ACTIONS.updateSearch(searchType, search)),
})

class Home extends Component {
    constructor(props) {
        super(props)
        this.delayedUpdate = _.debounce(this.searchAPI, 1000)

        this.updateSearchVal = this.updateSearchVal.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.changePage = this.changePage.bind(this)
    }

    // async componentDidMount() {
    //     let latestStories = await API.get(searchTypes.latest)
    //     this.props.getAllStories(latestStories.data)
    // }

    get queryString() {
        let searchObj = this.props.search
        let queryString = '?' + Object.keys(searchObj).map(key => key + '=' + searchObj[key]).join('&');
        queryString = queryString.replace(/ /g, '%20')
        return queryString
    }

    async searchAPI() {
        console.log(this.queryString)
        let searchResults = await API.get(this.queryString)
        console.log(searchResults)
    }

    nextPage() {
        console.log('next')
        // this.searchAPI()
    }

    prevPage() {
        console.log('prev')
    }

    async changePage() {
        console.log('changing page')
    }

    updateSearchVal(e) {
        e.persist()
        this.props.updateSearch('query', e.target.value)
        this.delayedUpdate()
    }

    /* hitsPerPage,nbHits, nbPages, page, */

    render() {
        return (
            <div className="content-wrapper">
                <Header onKeyUp={this.updateSearchVal} />
                {this.props.stories.hits ? <Results stories={this.props.stories.hits} /> : ''}

                {this.props.stories ?
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