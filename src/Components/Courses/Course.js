import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Course extends Component {
    constructor() {
        super()
        this.state = {
            addCourseInfo: false,
            tee: null,
            updateCourseInfo: null
        }
    }
    async componentDidMount () {
        const courseInfo = await axios.get(`/course/getCourseInfo/${this.props.course.course_id}`)
        if (courseInfo.data) {
            this.setState({
                updateCourseInfo: true
            })
        }
    }

    handleTextUpdate = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    addCourseInfo = () => {
        this.setState({
            addCourseInfo: true
        })
    }

    updateCourseInfo = (e) => {
        e.preventDefault()
        const {course_id} = this.props.course
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


    enterHoleInfo = () => {
        let holes = []
            for (let i = 1; i <=18; i++ ) {
                let hole = 
                    <div key={i}>
                        <span>Hole {i}<input onChange={this.handleTextUpdate} type='text' placeholder='Length' name={`distance${i}`}></input></span>
                        <span><input type='text' onChange={this.handleTextUpdate} placeholder='Par' name={`par${i}`}></input></span>
                    </div>
                holes.push(hole)
            }
            return (
                <form>
                    <select id="tee" name='tee' onChange={this.handleTextUpdate} defaultValue='placeholder'>
                        <option disabled value='placeholder'>Select Tee</option>
                        <option value="blue">Blues</option>
                        <option value="white">Whites</option>
                        <option value="red">Reds</option>
                    </select>
                    {holes}
                    <button onClick={this.updateCourseInfo}>Update Course Info</button>
                </form>
            )
    }
    
    render(){
        return (
            <div>
                <h2>{this.props.course.coursename}</h2>
                <p>{this.props.course.city}</p>
                
                <button onClick={this.addCourseInfo}>Add Course Info</button>
                {this.state.addCourseInfo && this.enterHoleInfo()}
                
            </div>
        )
    }
}  export default Course