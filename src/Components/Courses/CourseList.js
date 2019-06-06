import React, {Component} from 'react'
import NewCourse from './NewCourse'
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
            .get('/course/getcourses')
            .then(res => {})
    }

    render() {
        return(
        <div>
          <h1>Course List</h1>
          <NewCourse />
 
        </div>
        )
    }
} export default CourseList