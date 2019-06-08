import React, {Component} from 'react'

function DisplayInfo(props){
        let teeDistance = (tee) => {
            console.log(props.tee)
            let distance = props.tee.map((hole, i) => {
                return <td key={i}>{hole}</td>
            })
            return distance
        }
        let emptyCourse = (tee) => {
            let distance = []
            for (let i = 1; i <= 18; i++)
                distance.push(<td key={i}></td>)
            return distance
        }
        return(
            <tr>
                <th>{props.row}</th>
                {props.tee[0] ? teeDistance(props.row) : emptyCourse()}
            </tr>
        )
} export default DisplayInfo
    