import React, { Component } from "react"
import { connect } from "react-redux"
import ACTIONS from "./modules/action"
import API from './utils/API'

const mapStateToProps = state => ({
    stories: state.stories
});

const mapDispatchToProps = dispatch => ({
    getAllStories: data => dispatch(ACTIONS.getAllStories(data))
});

class Results extends Component {
    async componentDidMount() {
        let userData = await API.get('/search_by_date?tags=story')
        this.props.getAllStories(userData.data.hits)
    }

    render() {
        return (
            <div>
                <h1>{`Story Count ${this.props.stories.length}`}</h1>
                <ul className="results">
                    {this.props.stories.length ?
                        this.props.stories.map((story, key) =>
                            <li key={key}>
                                <a target="_blank" href={story.url}>
                                    {story.title}
                                </a>
                            </li>
                        )
                        :
                        <p>Loading Stories</p>
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results)