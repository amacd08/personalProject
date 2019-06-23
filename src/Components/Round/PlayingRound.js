import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlayingCourseCard from './PlayingRoundCards/PlayingCourseCard'
import PlayingRoundCard from './PlayingRoundCards/PlayingRoundCard'
import PlayedHole from './PlayingRoundCards/PlayedHole'
import EmptyHole from './PlayingRoundCards/EmptyHole'
import styled from 'styled-components'


class PlayingRound extends Component {
    constructor() {
        super()
        this.state ={
        }
    }
    

    render(){
        console.log(this.props.round.roundInfo.fairway.length)
        console.log(this.props.round)
        let holes = []
        for (let i = 0; i < this.props.round.roundInfo.fairway.length ; i++){
            let hole = {
                hole: i ,
                score:this.props.round.roundInfo.score[i],
                fairway:this.props.round.roundInfo.fairway[i],
                gir:this.props.round.roundInfo.gir[i],
                lostball:this.props.round.roundInfo.gir[i],
                par: this.props.round.courseInfo[this.props.round.tee][i],
                length: this.props.round.courseInfo.par[i]
            }
            let holeComponent=<PlayedHole hole={hole} />
            holes.push(holeComponent)
        }
        return(
            <PlayingRoundDiv>
                <PlayingCourseCard 
                    source='PlayingRound'
                    courseFromParent={this.props.round.course_id} />
                <div>
                    <PlayingRoundCard />
                </div>
                <div>
                    <EmptyHole />
                        
                </div>
                 {holes}
            </PlayingRoundDiv>
        )
    }
}
function mapStateToProps(state){
    return {
        round: state.round,
        user:state.user
    }
}

const PlayingRoundDiv = styled.div`
    display: flex;
    justify-content: space-around;
    flex-flow: column
    @media (max-width: 500px) {
        max-width: 320px;
      }
    `
export default connect(mapStateToProps,{})(PlayingRound)
