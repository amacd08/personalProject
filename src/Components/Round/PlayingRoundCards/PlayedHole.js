import React from 'react'


function PlayedHole(props) {
    return(
        <>
            <div style={displayFlex}>
                <h3 style={psapce}>{`Hole:${props.hole.hole + 1}`}</h3>
                <h3 style={psapce}>{`Par:${props.hole.par}`}</h3>
                <h3 style={psapce}>{`Hole Length:${props.hole.length}`}</h3>
            </div>
            <div style={displayFlex}>
                <p style={psapce}>{`Score:${props.hole.score}`}</p>
                <p style={psapce}>{`Fairway:${props.hole.fairway}`}</p>
                <p style={psapce}>{`Greens:${props.hole.gir}`}</p>
                <p style={psapce}>{`Lost Ball:${props.hole.lostball}`}</p>
            </div>
        </>
    )
}
const displayFlex = {
    display: 'flex'
}

const psapce = {
    margin: '20px'
}

export default PlayedHole