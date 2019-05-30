import React, { Component } from 'react'

const TimeButton = ({ sortDate, days, selectedDate }) => {
    return (
        <span className={`sort-option ${selectedDate === days ? 'selected' : ''}`}
            onClick={() => sortDate(days)}>
            {days == 1 ?
                <span>24 Hours</span> :
                <span>Last {days} Days</span>
            }
        </span>
    )
}

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section id='search'>
                <div className='search-wrap'>
                    <h1>HACKER NEWS SEARCH</h1>
                    <div className='search-bar'>
                        <input id='search-input' type='text' onKeyUp={this.props.onKeyUp} />
                        <span className='cancel' onClick={this.props.cancelSearch}>
                            <img src='https://img.icons8.com/metro/26/000000/multiply.png'></img>
                        </span>

                        <div className='search-bar-settings'>
                            <span className='sort-title'>Date:</span>
                            <span className={`sort-option ${!this.props.selectedDate ? 'selected' : ''}`} onClick={this.props.cancelSortDate}>
                                All
                            </span>
                            <TimeButton
                                selectedDate={this.props.selectedDate}
                                sortDate={this.props.sortDate}
                                days={1}
                            />
                            <TimeButton
                                selectedDate={this.props.selectedDate}
                                sortDate={this.props.sortDate}
                                days={7}
                            />
                            <TimeButton
                                selectedDate={this.props.selectedDate}
                                sortDate={this.props.sortDate}
                                days={30}
                            />
                            <TimeButton
                                selectedDate={this.props.selectedDate}
                                sortDate={this.props.sortDate}
                                days={90}
                            />
                            <span className='sort-option' onClick={this.props.cancelSortDate} />

                        </div>
                    </div>
                </div>
            </section >
        )
    }
}

export default Header