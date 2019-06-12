import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlayingCourseCard from './PlayingRoundCards/PlayingCourseCard'
import PlayingRoundCard from './PlayingRoundCards/PlayingRoundCard'
import PlayedHole from './PlayingRoundCards/PlayedHole'
import EmptyHole from './PlayingRoundCards/EmptyHole'


class PlayingRound extends Component {
    constructor() {
        super()
        this.state ={
        }
    }
    

    render(){
        console.log(this.props)
        let holes = []
        for (let i = 1; i < this.state.hole; i++){
            let hole = {
                score:this.props.round.roundInfo.score[i],
                fairway:this.props.round.roundInfo.fairway[i],
                gir:this.props.round.roundInfo.gir[i],
                lostball:this.props.round.roundInfo.gir[i],
                par: this.props.round.courseInfo[this.props.tee][i],
                length: this.props.round.courseInfo.par[i]
            }
            
            let holeComponent=<PlayedHole hole={hole} />
            holes.push(holeComponent)
        }
        return(
            <div>
                <PlayingCourseCard 
                    source='PlayingRound'
                    courseFromParent={this.props.round.course_id} />
                <div>
                    <PlayingRoundCard />
                </div>
                <div>
                    <EmptyHole />
                        
                </div>
                {/* {holes} */}
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
