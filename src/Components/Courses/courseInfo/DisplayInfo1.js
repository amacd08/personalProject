import React from 'react'

function DisplayInfo1 (props){
    console.log(props)
    const {startingHole, numOfHoles} = props
    let scoreCard1Start = Number(startingHole)
    let scoreCard1End = Number(startingHole) + Number(numOfHoles) - 1 
    // 1 + 9 -1 = 9,  10 + 9 -1 = 18. . . 1 + 18 -1 = 18

    let teeDistance = (tee) => {
        console.log(props.tee)
        if (props.source === 'golfer') {
                if (props.card === 'firstCard') {
                let distance = props.tee.map((hole, i) => {
                        return <td key={i}>{hole}</td> })
                return distance
                } else if (process.card === 'secondCard'){
                    let distance = props.tee.map((hole, i) => {
                        return <td key={i}>{hole}</td> })
                    return distance
                }
        } else if (props.source !== 'golfer') {
        let distance = props.tee.map((hole, i) => {
            if (i + 1 >= scoreCard1Start && i + 1 <= scoreCard1Start + 8) {
                return <td key={i}>{hole}</td> }
            })
            return distance
        }
    }
    let emptyCourse = (tee) => {
        let distance = []
        for (let i = scoreCard1Start; i <= scoreCard1Start + 8; i++)
            distance.push(<td key={i}></td>)
        return distance
    }


    return(
        <tr>
            <th>{props.row}</th>
            {props.tee[0] ? teeDistance(props.row) : emptyCourse()}
        </tr>
    )
} export default DisplayInfo1
    