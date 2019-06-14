import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../../Courses/course.css'
import DisplayInfo1 from '../../Courses/courseInfo/DisplayInfo1'

class PlayingCourseCard extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    scoreCard = (startingHole, numOfHoles,card) => {
        return(
            <table>
                <thead>
                   <tr>
                       <th>Tee</th>
                           {this.tableHead(startingHole,numOfHoles,card)}
                   </tr>
                </thead>
                <tbody>
                    <DisplayInfo1
                        tee={this.props.round.courseInfo.par}
                        row={'par'}
                        numOfHoles={numOfHoles} 
                        startingHole={startingHole}/>
                    <DisplayInfo1
                        tee={this.props.round.courseInfo[this.props.round.tee]}
                        row={this.props.round.tee}
                        numOfHoles={numOfHoles} 
                        startingHole={startingHole} />
                    <DisplayInfo1
                       tee={this.props.round.roundInfo.score}
                       row={this.props.user.user.firstname} 
                       numOfHoles={numOfHoles} 
                       startingHole={startingHole}
                       source='golfer'
                       card={card}/>
                </tbody>
            </table>
        )
    }
    
    tableHead = (startingHole,numOfHoles,card) => {
        let holes = []
        console.log(startingHole, numOfHoles)
        for (let i = startingHole; i < startingHole + 9; i++) {
            let th = <th key={i} width='75px'>{i}</th>
            holes.push(th)
        }
        return holes
    }


    render(){
        return(
            <div>
                <div style={displayFlex}>
                    <h2 style={psapce}>{this.props.courseFromParent.coursename}</h2>
                    <p  style={psapce}>{this.props.courseFromParent.city}</p>
                    <p style={psapce}>{this.props.user.user.firstname}</p>
                </div>
                {this.props.round.numOfHoles === 9 ?
                    this.scoreCard(this.props.round.startingHole, this.props.round.numOfHoles, 'firstCard')
                :
                <div>
                    {this.scoreCard(this.props.round.startingHole, this.props.round.numOfHoles, 'firstCard')}
                    {this.scoreCard(this.props.round.startingHole + 9, this.props.round.numOfHoles,'secondCard')}
                </div>
                }
                <div style={displayFlex}>
                    <p style={psapce}>Score Total:{this.props.round.roundTotal.score}</p>
                    <p style={psapce}>Total Fairways:{this.props.round.roundTotal.fairway}</p>
                    <p style={psapce}>Total Greens:{this.props.round.roundTotal.gir}</p>
                    <p style={psapce}>Total Lost Balls:{this.props.round.roundTotal.lostBall}</p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        round: state.round,
        user:state.user
    }
}

const displayFlex = {
    display: 'flex'
}

const psapce = {
    margin: '20px'
}
export default connect(mapStateToProps,{})(PlayingCourseCard)
