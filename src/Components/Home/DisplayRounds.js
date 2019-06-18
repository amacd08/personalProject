import React from 'react'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'


function DisplayRounds (props) {

    let roundDate = props.roundFromParent.date
    roundDate = roundDate.slice(0,10)
    console.log(props)

    function roundReview(){
        return (
        <div>
            <div style={displayFlex}>
                <h2 style={psapce}> {props.roundFromParent.coursename}</h2>
                <h3 style={psapce}> {roundDate}</h3>
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
            {props.roundComplete === true &&
                <Redirect push to='/completedround' />}
            
            {props.resumeRound === true &&
                <Redirect push to='/playinground' />}
        </div>
        )
    }
    function chooseColor(){
        if (props.index % 2 === 0) {
           return(
                <PriColor>
                   {roundReview()}
                </PriColor>
           )
        } else {
            return(
                <SecColor>
                   {roundReview()}
                </SecColor>
           )
        }
    }

    return(
        <div>
            {chooseColor()}
        </div>
        
    )
}

const displayFlex = {
    display: 'flex'
}

const psapce = {
    margin: '5px'
}

const PriColor = styled.div`
    background: #4B5043;
    color: #FAFAFA;
    border-radius: 7px;
    margin-bottom: 10px;
    box-shadow: 6px 6px 2px 2px #888888;
    `
const SecColor = styled.div`
    background: #A7F285;
    color: #4B5043;
    border-radius: 7px;
    margin-bottom: 10px;
    box-shadow: 6px 6px 2px 2px #888888;
    `

export default DisplayRounds