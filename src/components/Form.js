import React, { Component } from 'react'
import * as _ from 'lodash';
import '../scss/Form.scss';
import Dropdown from './Dropdown';
import Search from './Search';
import Table from './Table';

export class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            city: '',
            search: '',
            tableData: undefined
        }
    }

    onSelectHandler = (val) => {
        this.setState({
            city: val
        })
    }

    onSearchHandler = (val) => {
        this.setState({
            search: val
        })
    }

    filterData = (data, searchParams) => {

        let names = []
        let firstnames = []
        let results

        data.forEach( result => {
            searchParams.forEach( (params) => {
                if(result.nom.toLowerCase().trim() === params.toLowerCase().trim() ){
                    names.push(result)
                }
                if(result.prenom.toLowerCase().trim() === params.toLowerCase().trim() ){
                    firstnames.push(result)
                }
            } )
        });

        if (names.length && firstnames.length) {
            results = _.intersection(names, firstnames)
        }
        if (names.length && !firstnames.length) {
            results = names
        }
        if (firstnames.length && !names.length) {
            results = firstnames
        }

        return results
    }

    submitHandler = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/api/users').then((response) => response.json()).then((data) => {

            let results
            let city = this.state.city
            let searchParams

            if (this.state.search !== '') {
                searchParams = this.state.search.split(' ')
            }

            if (city !== '') {
                results = _.filter(data, (result) => result.ville === city)
                if (searchParams) {
                    results = this.filterData(results, searchParams)
                }
            } else {
                if (searchParams) {
                    results = this.filterData(data, searchParams)
                }
            }

            if (results && results.length) {
                this.setState({
                    tableData: results
                })
            } else {
                this.setState({
                    tableData: undefined
                })
            }
        })

    }

    render() {
        
        let isDropDown = _.find( this.props.data, (cpt) => cpt.component_identifier === "dropdown" )
        return (
            <>
                <form onSubmit={this.submitHandler}>
                    <div className="search-params">
                        <div className="select">
                            {
                                isDropDown ? <Dropdown data={isDropDown.data} handler={this.onSelectHandler} /> : null
                            }
                        </div>
                        <div className="search-input">
                            <Search handler={this.onSearchHandler} />
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <Table data={this.state.tableData} />
            </>
        )
    }
}

export default Form
