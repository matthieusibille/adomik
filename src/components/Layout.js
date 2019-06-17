import React, { Component } from 'react'
import '../scss/Layout.scss';
import Form from './Form';

export class Layout extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             components: []
        }
    }
    
    buildCptArray = (obj) => {
        let arr = this.state.components

        for (let property in obj) {
            if (property === "component_identifier") {

                // cas où le cpt a de la data associée
                if (obj.data) {
                    let cptData = { component_identifier: obj[property], data: obj.data }
                    arr.push(cptData)
                } else {
                    // sinon on l'insère dans l'array tel quel
                    arr.push({ component_identifier: obj[property] })
                }

                // on vérifie si il y a une propriété children présente, dans ce cas on relance la fonction en recursive
                if (obj.children && obj.children.length) {
                    this.buildCptArray(obj.children[0])
                }else{
                    this.setState({
                        components: arr
                    })
                }
            }
        }

    }

    componentDidMount() {

        fetch('http://localhost:3000/api/components')
            .then( (response) => response.json() )
            .then( (data) => {
                let obj = data.components[0]
                if (obj) {
                    this.buildCptArray(obj)
                }
            })
    }

    render() {
        
        return (
            <div className="layout">
                <Form data={this.state.components}/> 
            </div>
        )
    }
}

export default Layout
