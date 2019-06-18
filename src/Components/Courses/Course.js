import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import './course.css'
import {courseSelect} from '../../redux/roundReducer'
import DisplayInfo1 from './courseInfo/DisplayInfo1'
import styled from 'styled-components'


class Course extends Component {
    constructor() {
        super()
        this.state = {
            addCourseInfo: false,
            updateCourseInfo: null,
            displayHoles: false,
            courseInfo: {
                blue: [],
                white: [],
                red: [],
                par: []
            }
        }
    }

    async componentDidMount () {
        if (this.props.source === 'NewRoundConfig'){
           let answer = this.collectCourseInfo()
        }
    }

    handleTextUpdate = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    addCourseInfo = () => {
        this.setState({
            addCourseInfo: true,
            displayHoles: false
        })
    }

    collectCourseInfo = async () => {
        const courseInfo = await axios.get(`/course/getCourseInfo/${this.props.courseFromParent.course_id}`)
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
    

    displayHoles = async () => {
        let answer = await this.collectCourseInfo()
        this.setState({
            displayHoles: true,
            addCourseInfo: false
        })
    }
    
    scoreCard = (startingHole, numOfHoles,card) => {
        return(
        <table className="roundTable" min-width='350'>
            <thead>
                <tr>
                    <th className="roundHeader">Tee</th>
                        {this.tableHead(startingHole, numOfHoles,card)}
                </tr>
            </thead>
            <tbody>
                <DisplayInfo1
                    tee={this.state.courseInfo.par}
                    row={'par'}
                    startingHole={startingHole}
                    numOfHoles={numOfHoles}
                    card={card}
                     />
                <DisplayInfo1
                    tee={this.state.courseInfo.blue}
                    row={'blue'} 
                    startingHole={startingHole}
                    numOfHoles={numOfHoles}
                    card={card}/>
                <DisplayInfo1
                    tee={this.state.courseInfo.white}
                    row={'white'} 
                    startingHole={startingHole}
                    numOfHoles={numOfHoles}
                    card={card}/>
                <DisplayInfo1
                    tee={this.state.courseInfo.red}
                    row={'red'} 
                    startingHole={startingHole}
                    numOfHoles={numOfHoles}
                    card={card}/>
            </tbody> 
        </table>
        )
    }

    showCourseInfo = () => {

        return(
               <>
                    {this.scoreCard(0, 9, 'firstCard')}
                    {this.scoreCard(8, 9,'secondCard')}
                </>
        )
    }

    updateCourseInfo = (e) => {
        e.preventDefault()
        const {course_id} = this.props.courseFromParent
        for (let i = 1; i <=18; i++) {
            let hole = i
            let par = this.state[`par${i}`]
            let distance = this.state[`distance${i}`]
            let tee = this.state.tee
            if (!this.state.updateCourseInfo) {
                axios
                    .post(`/course/addHoleInfo/${course_id}`,{hole,par,distance,tee})
                    .catch(err => console.log(err))
            } else {
                axios
                    .put(`/course/addHoleInfo/${course_id}`,{hole,par,distance,tee})
                    .catch(err => console.log(err))
            }
        }
    }
    
    tableHead = (startingHole, numOfHoles, card) => {
        let holes = []
        for (let i = startingHole; i < startingHole + 9; i++) {
            let th = <th key={i} width='75px' className="roundHeader">{i}</th>
            holes.push(th)
        }
        return holes
    }


    enterHoleInfo = () => {
        let holes = []
            for (let i = 1; i <=18; i++ ) {
                let hole = 
                    <div key={i}>
                        <span>Hole {i}<input onChange={this.handleTextUpdate} type='text' placeholder='Length' name={`distance${i}`}></input></span>
                        {!this.state.courseInfo.par[0] && <span><input type='text' onChange={this.handleTextUpdate} placeholder='Par' name={`par${i}`}></input></span>}
                    </div>
                holes.push(hole)
            }
            return (
                <form>
                    <select id="tee" name='tee' onChange={this.handleTextUpdate} defaultValue='placeholder'>
                        <option disabled value='placeholder'>Select Tee</option>
                        {!this.state.courseInfo.blue[0] && <option value="blue">Blues</option>}
                        {!this.state.courseInfo.white[0] && <option value="white">Whites</option>}
                        {!this.state.courseInfo.red[0] && <option value="red">Reds</option>}
                    </select>
                    {holes}
                    <button onClick={this.updateCourseInfo}>Update Course Info</button>
                </form>
            )
    }

    render(){
        return (
        <>
            <CourseInfo>
                {this.props.source==='newRoundSetup' ?
                    
                    <Link to ='/newround/step2' style={noTextDecoration}>
                        <CourseName onClick={() => {this.props.courseSelect({
                            course_id:this.props.courseFromParent,
                            course_info:this.state.course_info
                            })}}>
                            <h2>{`${this.props.courseFromParent.coursename}, ${this.props.courseFromParent.city}, ${this.props.courseFromParent.state}` }</h2>
                            {/* <h2>{` `}</h2> */}
                        </CourseName>
                    </Link>
                    :   
                    <div>
                        <h2>{`${this.props.courseFromParent.coursename}, ${this.props.courseFromParent.city}, ${this.props.courseFromParent.state}` }</h2>
                    </div>
                }
                {this.props.source !=='NewRoundConfig'  ?
                   <ButtonRow>
                        <Submit onClick={this.addCourseInfo}>Add Info</Submit>
                        <Submit onClick={this.displayHoles}>Display Course</Submit>
                    </ButtonRow>
                :
                    <>
                        {this.showCourseInfo()}
                    </>
                }
            </CourseInfo>
            <div>

                    {this.state.addCourseInfo && this.enterHoleInfo()}
                    {this.state.displayHoles && this.showCourseInfo()}      
            </div>  
        </>         
            
        )
    }
}

function mapStateToProps(state) {
    return {
        round: state.round,
        course: state.course
    }
}

const CourseName = styled.div`
   color: black;
   text-transform: uppercase;
   display: flex;
   justify-content: center;
   `

const noTextDecoration = {
    textDecoration: 'none'
}

const CourseInfo = styled.div`
    display: flex;
    justify-content: space-around;
    flex-flow: column
    `
const Submit = styled.button`
    margin: 0px;
    margin-left: 5px;
    font-family: sans-serif;
    margin-top: 15px;
    font-size: 1.5em;
    width: 125px;
    height: 62px;
    background: #A7F285;
    text-decoration: none;
    border: 0px;
    border-radius: 10px;
    margin-bottom: 10px;
    `
const ButtonRow = styled.div`
    display:flex;
    justify-content: space-around;
    width: 100%
    `
export default connect(mapStateToProps,{courseSelect})(Course)