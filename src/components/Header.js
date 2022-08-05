import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <h1>Todo list</h1>
                <button className="button-style-1">create a new task</button>
            </header>
        );
    }
}

export default Header;