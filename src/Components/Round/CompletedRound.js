import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlayingCourseCard from './PlayingRoundCards/PlayingCourseCard'
import PlayingRoundCard from './PlayingRoundCards/PlayingRoundCard'
import PlayedHole from './PlayingRoundCards/PlayedHole'


class PlayingRound extends Component {
    constructor() {
        super()
        this.state ={
        }
    }
    

    render(){
        console.log(this.props)
        let holes = []
        for (let i = 0; i < this.props.round.hole -1; i++){
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
        console.log(holes)
        return(
            <div>
                <PlayingCourseCard 
                    source='PlayingRound'
                    courseFromParent={this.props.round.course_id} />
                <div>
                    <PlayingRoundCard />
                </div>
                 {holes}
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
export default connect(mapStateToProps,{})(PlayingRound)
