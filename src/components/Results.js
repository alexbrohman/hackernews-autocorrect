import React, { Component } from "react"

class Results extends Component {
    render() {
        return (
            <section className="results">
                <ul className="results-list">
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
        )
    }
}

export default Results
