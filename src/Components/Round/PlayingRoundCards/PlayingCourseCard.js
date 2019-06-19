import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../../Courses/course.css'
import DisplayInfo1 from '../../Courses/courseInfo/DisplayInfo1'
import styled from 'styled-components'

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
                       <th className="roundHeader">Tee</th>
                           {this.tableHead(card)}
                   </tr>
                </thead>
                <tbody>
                    <DisplayInfo1
                        tee={this.props.round.courseInfo.par}
                        row={'par'}
                        numOfHoles={this.props.numOfHoles} 
                        startingHole={startingHole}
                        card={card}
                        />
                    <DisplayInfo1
                        tee={this.props.round.courseInfo[this.props.round.tee]}
                        row={this.props.round.tee}
                        numOfHoles={this.props.numOfHoles} 
                        startingHole={startingHole}
                        source={'playingCourseCard'}
                        card={card} />
                    <DisplayInfo1
                       tee={this.props.round.roundInfo.score}
                       row={this.props.user.user.firstname} 
                       numOfHoles={this.props.numOfHoles} 
                       startingHole={startingHole}
                       source='golfer'
                       card={card}/>
                </tbody>
            </table>
        )
    }
    
    tableHead = (card) => {
        let holes = []
        if (card === 'firstCard') {
            for (let i = 1 ; i <=  9; i++) {
                let th = <th key={i} width='50px'>{i}</th>
                holes.push(th)
            } 
        } else if (card === 'secondCard') {
            for (let i = 10 ; i <=  18; i++) {
                let th = <th key={i} width='50px'>{i}</th>
                holes.push(th)
            }
        }
        return holes
    }

    render(){
        return(
                <CourseInfo>
                    <div style={displayFlex}>
                        <CourseName>
                            <h3 style={psapce}>{`${this.props.round.course_id.coursename}, ${this.props.round.course_id.city}, ${this.props.round.course_id.state}` }</h3>
                        </CourseName>
                    </div>
                    <CourseCard>
                        {this.props.round.numOfHoles === 9 ?
                            this.scoreCard(this.props.round.startingHole -1, this.props.round.numOfHoles, 'firstCard')
                        :
                        <div>
                            {this.scoreCard(this.props.round.startingHole -1, this.props.round.numOfHoles, 'firstCard')}
                            {this.scoreCard(this.props.round.startingHole + 7, this.props.round.numOfHoles,'secondCard')}
                        </div>
                        }
                        <div style={displayFlex}>
                            <p style={psapce}>Score:{this.props.round.roundTotal.total_score}</p>
                            <p style={psapce}>Fairways:{this.props.round.roundTotal.total_fairways}</p>
                            <p style={psapce}>Greens:{this.props.round.roundTotal.total_gir}</p>
                            <p style={psapce}>Lost Balls:{this.props.round.roundTotal.total_lostball}</p>
                        </div>
                    </CourseCard>
                </CourseInfo>
        )
    }
}
function mapStateToProps(state){
    return {
        round: state.round,
        user:state.user
    }
}


const CourseName = styled.div`
   color: black;
   text-transform: uppercase;
   display: flex;
   justify-content: center;
   `

const CourseCard = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    `
const CourseInfo = styled.div`
    display: flex;
    justify-content: space-around;
    flex-flow: column
    @media (max-width: 500px) {
        max-width: 320px;
      }
    `

const displayFlex = {
    display: 'flex'
}

const psapce = {
    margin: '10px'
}
export default connect(mapStateToProps,{})(PlayingCourseCard)
