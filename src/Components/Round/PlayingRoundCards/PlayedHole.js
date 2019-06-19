import React from 'react'
import styled from 'styled-components'

function PlayedHole(props) {

    function displayHole() {
        return(
            <>
                <div style={displayFlex}>
                    <h3 style={psapce}>{`Hole:${props.hole.hole + 1}`}</h3>
                    <h3 style={psapce}>{`Par:${props.hole.par}`}</h3>
                    <h3 style={psapce}>{`Length:${props.hole.length}`}</h3>
                </div>
                <div style={displayFlex}>
                    <p style={psapce}>{`Score:${props.hole.score}`}</p>
                    <p style={psapce}>{`Fairway:${props.hole.fairway}`}</p>
                </div>
                <div style={displayFlex}>
                    <p style={psapce}>{`Greens:${props.hole.gir}`}</p>
                    <p style={psapce}>{`Lost Ball:${props.hole.lostball}`}</p>
                </div>
            </>
        )
    }

    function chooseColor() {
        if (props.index % 2 === 0) {
            return(
                <PriColor>
                    {displayHole()}
                 </PriColor>
            )
            } else {
             return(
                 <SecColor>
                    {displayHole()}
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
    margin: '20px'
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

export default PlayedHole