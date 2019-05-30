import React, { Component } from 'react'
import extractDomain from 'extract-domain'
import Moment from 'react-moment';

class Results extends Component {
    render() {
        return (
            <section id='results'>
                <ul className={`results-list ${this.props.typing ? 'typing' : ''}`}>
                    {this.props.stories.length ?
                        this.props.stories.map((story, key) =>
                            <li className='result' key={key}>
                                <div className='result-points'>
                                    <div className='result-points-circle'>
                                        {story.points}
                                    </div>
                                </div>
                                <div className='result-title'>
                                    <h3>{story.title}</h3>
                                    <span className='result-date'>
                                        <Moment format='dddd, MMMM Do YYYY'>
                                            {story.created_at}
                                        </Moment>
                                    </span>
                                </div>
                                <a className='result-url' rel='noopener noreferrer' target='_blank' href={story.url}>
                                    {story.url ? extractDomain(story.url) : ''}
                                </a>
                            </li>
                        )
                        :
                        <div className='nothing-found'>
                            <span>Nothing Found Here!</span>
                        </div>

                    }
                </ul>
            </section>
        )
    }
}

export default Results
