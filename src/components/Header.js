import React, { Component } from 'react'
import cog from '../settings-work-tool.svg'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = { showMenu: true }

        this.toggleSearchSettings = this.toggleSearchSettings.bind(this)
    }

    toggleSearchSettings() {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    render() {
        return (
            <section id="search">
                <div className="search-wrap">
                    <h1>HACKER NEWS SEARCH</h1>
                    <div className="search-bar">
                        <input type="text" onKeyUp={this.props.onKeyUp} />
                        <div onClick={this.toggleSearchSettings} className="search-bar-settings-button">
                            <img width={'30px'} src={cog} alt="cog" />
                        </div>
                        {this.state.showMenu ?
                            <div className="search-bar-settings">
                                <span className="sort-title">Sort:</span>
                                <span onClick={this.props.sortDate} className="sort-option">Date</span>
                                <span onClick={this.props.sortScore} className="sort-option">Score</span>
                            </div>
                            : ''}
                    </div>
                </div>
            </section>
        )
    }
}

export default Header