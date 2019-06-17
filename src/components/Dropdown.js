import React, { Component } from 'react'
import '../scss/Dropdown.scss';

export class Dropdown extends Component {

    onSelectHandler = (e) => {
        if (e.currentTarget.value !== "Dropdown") {
            this.props.handler(e.currentTarget.value)
        }else{
            this.props.handler('')
        }
    }

    render() {

        return (

            <select onChange={this.onSelectHandler}>
                <option>Dropdown</option>
                {
                    this.props.data.map(data => <option key={data.id} value={data.label}>{data.label}</option>)
                }
            </select>

        )
    }
}

export default Dropdown
