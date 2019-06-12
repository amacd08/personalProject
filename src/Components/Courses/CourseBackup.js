import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import './course.css'
import {courseSelect} from '../../redux/roundReducer'
import DisplayInfo from './courseInfo/DisplayInfo'
import EnterInfo from './courseInfo/EnterInfo'


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
        console.log(this.props)
        if (this.props.source === 'NewRoundConfig'){
           this.collectCourseInfo()
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
        if (courseInfo.data != 'No Course Info Added Yet') {
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
        console.log('collect course info complete')
   }
    

    displayHoles = async () => {
        await this.collectCourseInfo()
        this.setState({
            displayHoles: true,
            addCourseInfo: false
        })
    }


    showCourseInfo = () => {
        console.log(this.props)
        return(
            <table>
                <thead>
                    <tr>
                        <th>Tee</th>
                            {this.tableHead()}
                    </tr>
                </thead>
                {this.props.source === 'playingRound' ?
                    <tbody>
                        <DisplayInfo
                            tee={this.state.courseInfo.par}
                            row={'par'} />
                        <DisplayInfo
                            tee={this.state.courseInfo[this.props.tee]}
                            row={this.props.tee} />
                    </tbody>
                :
                    <tbody>
                        <DisplayInfo
                            tee={this.state.courseInfo.par}
                            row={'par'} />
                        <DisplayInfo
                            tee={this.state.courseInfo.blue}
                            row={'blue'} />
                        <DisplayInfo
                            tee={this.state.courseInfo.white}
                            row={'white'} />
                        <DisplayInfo
                            tee={this.props.courseInfo.red}
                            row={'red'} />
                    </tbody> 
                }
            </table>
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
    
    tableHead = () => {
        let holes = []
        for (let i = 1; i <=18; i++) {
            let th = <th key={i} width='75px'>{i}</th>
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
            <div>
                {this.props.source==='newRoundSetup' ?
                    
                    <Link to ='/newround/step2'>
                        <div onClick={() => {this.props.courseSelect({
                            course_id:this.props.courseFromParent,
                            course_info:this.state.course_info
                            })}}>
                            <h2>{this.props.courseFromParent.coursename}</h2>
                            <p>{this.props.courseFromParent.city}</p>
                        </div>
                    </Link>
                    :   
                    <div>
                        <h2>{this.props.courseFromParent.coursename}</h2>
                        <p>{this.props.courseFromParent.city}</p>
                    </div>
                }
                {this.props.source !=='NewRoundConfig' ?
                    <div>
                        <button onClick={this.addCourseInfo}>Add Course Info</button>
                        <button onClick={this.displayHoles}>Display Course Information</button>
                    </div>
                :
                   () => {this.displayHoles()}
                }
                {this.state.addCourseInfo && this.enterHoleInfo()}
                {this.state.displayHoles && this.showCourseInfo()}
                    
            </div>
        )
    }

    
}

function mapStateToProps(state) {
    return {
        round: state.round,
        course: state.course
    }
}
export default connect(mapStateToProps,{courseSelect})(Course)