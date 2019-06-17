import React from 'react'
import {Redirect} from 'react-router-dom'


function DisplayRounds (props) {
    let roundDate = props.roundFromParent.date
    roundDate = roundDate.slice(0,10)
    console.log(props.roundFromParent)
    return(
        <div>
            <div style={displayFlex}>
                <h2 style={psapce}> {props.roundFromParent.coursename}</h2>
                <h3 style={psapce}> {roundDate}</h3>
                <button onClick={() => {props.viewCompletedRound(props.roundFromParent)}}>Veiw Round</button>
                {props.roundFromParent.roundcomplete !== 'true' &&
                <button onClick={() => {props.startResumeRound(props.roundFromParent)}}>Resume Round</button>}
            </div>
            <div style={displayFlex}>
                <p style={psapce}>Score: {props.roundFromParent.total_score}</p>
                <p style={psapce}>Tees: {props.roundFromParent.tee}</p>
                <p style={psapce}>Goal: {props.roundFromParent.goal}</p>
                <p style={psapce}>Round Length: {props.roundFromParent.numofholes}</p>
            </div>
            <div style={displayFlex}>
                <p style={psapce}>Greens Hit: {props.roundFromParent.total_gir}</p>
                <p style={psapce}>Lost Balls: {props.roundFromParent.total_lostball}</p>
                <p style={psapce}>Fairways Hit: {props.roundFromParent.total_fairways}</p>
            </div>
            <div>
                {props.roundComplete === true &&
                    <Redirect push to='/completedround' />}
                }
                {props.resumeRound === true &&
                    <Redirect push to='/playinground' />}
            </div>
        </div>
        
    )
}

const displayFlex = {
    display: 'flex'
}

const psapce = {
    margin: '20px'
}

export default DisplayRounds