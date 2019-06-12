import React, {Component} from 'react'
import {connect} from 'react-redux'
import Course from '../Courses/Course'
import axios from 'axios';
import {roundSetup} from '../../redux/roundReducer'


class NewRoundConfig extends Component{
    constructor() {
        super()
        this.state ={
            chooseTees: true,
            chooseNumOfHoles: false,
            chooseGoal: false,
            tee:'',
            numOfHoles: 18,
            goal: null,
            round_id: null,
            courseInfo: {
                blue: [],
                white: [],
                red: [],
                par: []
            }
        }
        this.blueRef = React.createRef();
        this.whiteRef = React.createRef();
        this.redRef = React.createRef();
        this.nineHoleRef = React.createRef();
        this.eighteenHoleRef = React.createRef();




    }

    async componentDidMount () {
            const courseInfo = await axios.get(`/course/getCourseInfo/${this.props.round.course_id.course_id}`)
            if (courseInfo.data !== 'No Course Info Added Yet') {
                this.setState({
                    updateCourseInfo: true
                })
                let blue = []
                let red = []
                let par = []
                let white = []
                courseInfo.data.map(hole => {
                    blue.push(hole.blue)
                    white.push(hole.white)
                    red.push(hole.red)
                    par.push(hole.par)
                    return 'complete'
                })
                this.setState({
                    courseInfo: {
                        blue: blue,
                        white: white,
                        red: red,
                        par:par
                    }
                })
            }
            return "collect course info complete"
       }

    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    
    updateBlueState = () => {
        this.setState({
            tee:this.blueRef.current.attributes.value.value,
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }

    updateWhiteState = () => {
        this.setState({
            tee:this.whiteRef.current.attributes.value.value,
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }
    updateRedState = () => {
        this.setState({
            tee:this.redRef.current.attributes.value.value,
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }

    updateNineHole = () => {
        this.setState({
            numOfHoles:this.nineHoleRef.current.attributes.value.value,
            chooseNumOfHoles: false,
            chooseGoal: true
        })
    }
    updateEighteenHole = () => {
        this.setState({
            tee:this.eighteenHoleRef.current.attributes.value.value,
            chooseNumOfHoles: false,
            chooseGoal: true
        })
    }
    roundSetup = async () => {
        let roundSetup = await axios.post('/round/create',{
                user_id:this.props.user.user_id,
                course_id:this.props.round.course_id.course_id,
                goal: this.state.goal,
                numOfHoles: this.state.numOfHoles,
                tee:this.state.tee,
                round_complete: no})
            this.setState({
                    round_id: roundSetup.data.round_id
                })
        const {round_id, tee, numOfHoles, goal,courseInfo} = this.state
        this.props.roundSetup({round_id, tee, numOfHoles, goal, courseInfo})
        return this.props.history.push('/playinground')
    }

    choiceFunction = (e) => {
        if (this.state.chooseTees) {
            return(
                <div className="choiceBox">
                    <h1>Choose Tees</h1>
                    <div className='bigButton1' value='blue' ref={this.blueRef} onClick={this.updateBlueState}>
                        <h2 value='blue'>Blue</h2>
                    </div>
                    <div className="bigButton2" value='white' ref={this.whiteRef} onClick={this.updateWhiteState}>
                        <h2>White</h2>
                    </div>
                    <div className="bigButton3" value='red' ref={this.redRef} onClick={this.updateRedState}>
                        <h2>Red</h2>
                    </div>
                </div>
            )
        } else if (this.state.chooseNumOfHoles) {
            return(
                <div className="choiceBox">
                    <h1>Round Length</h1>
                    <div className='yesButton1' name='numOfHoles' value={9} ref={this.nineHoleRef} onClick={this.updateNineHole}>
                        <h2>9</h2>
                    </div>
                    <div className="noButton1" name='numOfHoles' value={18} ref={this.eighteenHoleRef} onClick={this.updateEighteenHole}>
                        <h2>18</h2>
                    </div>
                </div>
            )
        } else if (this.state.chooseGoal) {
            return(
                <div className="choiceBox">
                    <h1>Choose Goal</h1>
                    <input type='tel' name='goal' placeholder="Enter Scoring Goal" onChange={this.updateState}></input>
                    <button onClick={this.roundSetup}>Submit</button>
                </div>
            )
        }
    }
    
    render() {
        return(
            <div>
                <Course 
                    courseFromParent={this.props.round.course_id}
                    source={'NewRoundConfig'}
                 />
                 {this.choiceFunction()}
            </div>
           

        )
    }
} 

function mapStateToProps(state){
    return {
        user:state.user,
        round:state.round
    }
}  

export default connect(mapStateToProps,{roundSetup})(NewRoundConfig)

