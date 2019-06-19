import React from 'react'

function DisplayInfo1 (props){
    let {startingHole} = props
   
    let teeDistance = (tee) => {
        if (props.card === 'firstCard') {
            let distance = props.tee.map((hole, i) => {
                if (i >= startingHole  && i <= startingHole + 8){
                    return <td key={i} className={`${props.row}`}>{hole}</td> 
                } else {
                    return null
                }
            })
            return distance
            } else if (props.card === 'secondCard'){
                let distance = props.tee.map((hole, i) => {
                    if (i > startingHole) {
                        return <td key={i} className={`${props.row}`}>{hole}</td> 
                    } else {
                        return null
                    }
                 })
            return distance
            }
    }

    let emptyCourse = (tee) => {
        let distance = []
        if (props.card === 'firstCard'){
            for (let i = startingHole; i <= startingHole + 8; i++){
                distance.push(<td key={i} className={`${props.row}`}></td>)
            }
        }
        if (props.card === 'secondCard'){
            for (let i = startingHole; i < 17; i++) {
            distance.push(<td key={i} className={`${props.row}`}></td>)
            }
        }
        
        return distance
    }


    return(
        <tr>
            <th className={`${props.row}`}>{props.row}</th>
            {props.tee[0] ? teeDistance(props.row) : emptyCourse()}
        </tr>
    )
} 

export default DisplayInfo1
    