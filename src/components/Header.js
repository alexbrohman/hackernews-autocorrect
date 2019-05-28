import React, { Component } from "react"

class Header extends Component {
    render() {
        return (
            <section className="search-bar">
                <h2>{'Search'}</h2>
                <input type="text" onKeyUp={this.props.onKeyUp} />
            </section>
        )
    }
}

export default Header


