import React, { Component } from "react"

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
                        <div onClick={this.toggleSearchSettings} className="search-bar-settings-button">TOGGLE</div>
                        {this.state.showMenu ?
                            <div className="search-bar-settings">
                                Settings here
                            </div>
                            : ''}
                    </div>
                </div>
            </section>
        )
    }
}

export default Header


