import React, {Component} from 'react'
import Course from './Course'
import axios from 'axios';


class CourseList extends Component{
    constructor() {
        super()
    this.state = {
        courseList: [],
        course_id: null
        }
    }


    componentDidMount() {
        axios
            .get('/course/getCourses')
            .then(res => {
                this.setState({
                    courseList: res.data
                })
            })
            .catch(err => console.log(err))
    }

    addNewCourseLink = () => {
        this.props.history.push('/newcourse')
    }

    render() {
        let courses = this.state.courseList.map((course,i) => {
            return(
                <Course key={i} courseFromParent={course} />
            )
        })
        return(
            <div>
              <h1>Course List</h1>
              {courses}
              <button onClick={this.addNewCourseLink}>Add New Course</button>
     
            </div>
        )
    }
} export default CourseList