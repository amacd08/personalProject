import React from 'react'

function DisplayInfo(props){
    console.log(props)
        let holes = []
        for (let i = 1; i <=18; i++) {
            let th = <th key={i} width='75px'>{i}</th>
            holes.push(th)
        }
        let teeDistance = (tee) => {
            let distance = props.course[tee].map((hole, i) => {
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
            <table>
                <thead>
                    <tr>
                        <th>Tee</th>
                            {holes}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Par</th>
                        {props.course.par[0] ? teeDistance('par') : emptyCourse()}
                    </tr>
                    <tr>
                        <th>Blue</th>
                        {props.course.blue[0] ? teeDistance('blue') : emptyCourse()}
                    </tr>
                    <tr>
                        <th>White</th>
                        {props.course.white[0] ? teeDistance('white') : emptyCourse()}
                    </tr>
                    <tr>
                        <th>Red</th>
                        {props.course.red[0] ? teeDistance('red') : emptyCourse()}
                    </tr>
                </tbody>
            </table>
        )
} export default DisplayInfo
    