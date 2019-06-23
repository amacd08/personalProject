import React, {Component} from 'react'
import {connect} from 'react-redux'
import Course from '../Courses/Course'
import axios from 'axios';
import {roundSetup} from '../../redux/roundReducer'
import styled from 'styled-components'



class NewRoundConfig extends Component{
    constructor() {
        super()
        this.state ={
            chooseTees: true,
            chooseNumOfHoles: false,
            chooseStartingHole: false,
            chooseGoal: false,
            tee:'',
            numOfHoles: 18,
            startingHole: 1,
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
            tee:'blue',
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }

    updateWhiteState = () => {
        this.setState({
            tee: 'white',
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }
    updateRedState = () => {
        this.setState({
            tee: 'red',
            chooseTees: false,
            chooseNumOfHoles: true
        })
    }

    updateNineHole = () => {
        this.setState({
            numOfHoles: 9,
            chooseNumOfHoles: false,
            chooseStartingHole: true
        })
    }
    updateEighteenHole = () => {
        this.setState({
            numOfHoles: 18,
            chooseNumOfHoles: false,
            chooseGoal: true
        })
    }
    updateStartingOneHole = () => {
        this.setState({
            startingHole: 1,
            chooseStartingHole: false,
            chooseGoal: true
        })
    }
    updateStartingTenHole = () => {
        this.setState({
            startingHole: 10,
            chooseStartingHole: false,
            chooseGoal: true
        })
    }
    roundSetup = async () => {
        let roundComplete = 'no'
        const {tee, numOfHoles, goal,courseInfo, startingHole} = this.state
        let roundSetup = await axios.post('/round/create',{
                user_id:this.props.user.user_id,
                course_id:this.props.round.course_id.course_id,
                goal,
                numOfHoles,
                tee,
                startingHole,
                roundComplete})
        this.setState({
            round_id: roundSetup.data.round_id
        })
        const {round_id} = this.state
        this.props.roundSetup({round_id, tee, numOfHoles, goal, courseInfo, roundComplete, startingHole, hole:startingHole})
        return this.props.history.push('/playinground')
    }

    choiceFunction = (e) => {
        if (this.state.chooseTees) {
            return(
                <ConfigBox>
                    <Wrapper>
                        <h1>Choose Tees</h1>
                    </Wrapper>
                        <ChoiceBox>
                            <Button onClick={this.updateBlueState}>
                                <h2 value='blue'>Blue</h2>
                            </Button>
                            <Button onClick={this.updateWhiteState}>
                                <h2>White</h2>
                            </Button>
                            <Button onClick={this.updateRedState}>
                                <h2>Red</h2>
                            </Button>
                        </ChoiceBox>
                </ConfigBox>
            )
        } else if (this.state.chooseNumOfHoles) {
            return(
                <ConfigBox>
                    <Wrapper>
                        <h1>Round Length</h1>                
                    </Wrapper>
                    <ChoiceBox className="choiceBox">
                        
                        <div onClick={this.updateNineHole}>
                            <h2>9</h2>
                        </div>
                        <div onClick={this.updateEighteenHole}>
                            <h2>18</h2>
                        </div>
                    </ChoiceBox>
                </ConfigBox>
            )
        } else if (this.state.chooseStartingHole) {
            return(
                <ConfigBox>
                    <Wrapper>
                            <h1>Starting Hole</h1>
                    </Wrapper>
                    <ChoiceBox className="choiceBox">
                        <div onClick={this.updateStartingOneHole}>
                            <h2>1</h2>
                        </div>
                        <div onClick={this.updateStartingTenHole}>
                            <h2>10</h2>
                        </div>
                    </ChoiceBox>
                </ConfigBox>
            )
        } else if (this.state.chooseGoal) {
            return(
                <ConfigBox>
                    <Wrapper>
                        <h1>Choose Goal</h1>
                    </Wrapper>
                    <ChoiceBox>
                        <EnterHoleInput type='tel' onChange={this.updateState}></EnterHoleInput>
                        <Submit onClick={this.roundSetup}>Submit</Submit>
                    </ChoiceBox>
                </ConfigBox>
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

const ChoiceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    `
    
const Button = styled.div`
    marign:0px;
    `

const Submit = styled.button`
    margin: 0px;
    font-family: sans-serif;
    margin-top: 15px;
    font-size: 1.5em;
    width: 150px;
    height: 30px;
    background: #A7F285;
    text-decoration: none;
    border: 0px;
    border-radius: 10px;
    margin-bottom: 10px;
    `

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    `
    
const EnterHoleInput = styled.input` 
    font-size: 1.5em;
    font-family: sans-serif;
    width: 50%
    margin-top: 10px;
    `
const ConfigBox = styled.div`
   margin-left: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-flow: column;
   width: 400px;
   @media (max-width: 500px) {
       max-width: 350px;
     }
   `   
export default connect(mapStateToProps,{roundSetup})(NewRoundConfig)

