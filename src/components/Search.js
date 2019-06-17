import React, { Component } from 'react'
import '../scss/Search.scss';

export class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    searchHandler = (e) => {
        this.setState({
            search: e.currentTarget.value
        })
        this.props.handler(e.currentTarget.value)
    }

    render() {
        return (
            <input type="text" name="search" value={this.state.search} onChange={this.searchHandler} />
        )
    }
}

export default Search
