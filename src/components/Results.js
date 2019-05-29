import React, { Component } from 'react'
import extractDomain from 'extract-domain'

class Results extends Component {
    render() {
        return (
            <section className="results">
                <ul className="results-list">
                    {this.props.stories.length ?
                        this.props.stories.map((story, key) =>
                            <li className="result" key={key}>
                                <div className="result-points">{story.points}</div>
                                <div className="result-title">
                                    <h3>{story.title}</h3>
                                </div>
                                <a className="result-url" rel="noopener noreferrer" target="_blank" href={story.url}>
                                    {story.url ? extractDomain(story.url) : 'No URL'}
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
