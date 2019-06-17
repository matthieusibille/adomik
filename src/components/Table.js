import React from 'react'
import '../scss/Table.scss';
function Table(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Ville</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Right</th>
                </tr>
                {
                    props.data && props.data.length ? props.data.map( data => 
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.ville}</td>
                            <td>{data.prenom}</td>
                            <td>{data.nom}</td>
                            <td>{data.right}</td>
                        </tr>
                    ) : <tr><td colSpan="5">No data</td></tr>
                }

            </tbody>
        </table>
    )

}

export default Table
