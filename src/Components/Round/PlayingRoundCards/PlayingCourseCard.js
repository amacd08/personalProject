import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../../Courses/course.css'
import DisplayInfo from '../../Courses/courseInfo/DisplayInfo'

class PlayingCourseCard extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }
    
    tableHead = () => {
        let holes = []
        for (let i = 1; i <=18; i++) {
            let th = <th key={i} width='75px'>{i}</th>
            holes.push(th)
        }
        return holes
    }


    render(){
        return(
            <div>
                <div>
                    <h2>{this.props.courseFromParent.coursename}</h2>
                    <p>{this.props.courseFromParent.city}</p>
                    <p>{this.props.user.user.firstname}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Tee</th>
                                {this.tableHead()}
                        </tr>
                    </thead>
                    <tbody>
                        <DisplayInfo
                            tee={this.props.round.courseInfo.par}
                            row={'par'} />
                        <DisplayInfo
                            tee={this.props.round.courseInfo[this.props.round.tee]}
                            row={this.props.round.tee} />
                        <DisplayInfo 
                           tee={this.props.round.roundInfo.score}
                           row={this.props.user.user.firstname} />
                    </tbody>
                </table>
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
export default connect(mapStateToProps,{})(PlayingCourseCard)
