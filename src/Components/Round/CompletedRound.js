import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlayingCourseCard from './PlayingRoundCards/PlayingCourseCard'
import PlayedHole from './PlayingRoundCards/PlayedHole'
import styled from 'styled-components'
import axios from 'axios';


class PlayingRound extends Component {
    constructor() {
        super()
        this.state ={
        }
    }

    
    

    render(){
        let holes = []
        for (let i = 0; i < this.props.round.hole -1; i++){
            let hole = {
                hole: i ,
                score:this.props.round.roundInfo.score[i],
                fairway:this.props.round.roundInfo.fairway[i],
                gir:this.props.round.roundInfo.gir[i],
                lostball:this.props.round.roundInfo.gir[i],
                length: this.props.round.courseInfo[this.props.round.tee][i],
                par: this.props.round.courseInfo.par[i]
            }
            let holeComponent=<PlayedHole key={i} index={i} hole={hole} />
            holes.push(holeComponent)
        }
        return(
            <CourseInfo>
                <CourseCard>
                    <PlayingCourseCard 
                        source='PlayingRound'
                        courseFromParent={this.props.round.course_id} />
     
                     {holes}
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

export default connect(mapStateToProps,{})(PlayingRound)
