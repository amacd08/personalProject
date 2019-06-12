import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../../Courses/course.css'

class PlayingRoundCard extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <div>
                    <h2>Hole:{this.props.round.hole}</h2>
                    <h2>Par:{this.props.round.courseInfo.par[this.props.round.hole -1]}</h2>
                    <h2>Length:{this.props.round.courseInfo[this.props.round.tee][this.props.round.hole - 1]}</h2>
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
export default connect(mapStateToProps,{})(PlayingRoundCard)