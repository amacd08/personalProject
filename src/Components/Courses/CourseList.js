import React, {Component} from 'react'
import Course from './Course'
import styled from 'styled-components'
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
                <Course 
                    key={i} 
                    courseFromParent={course}
                    source="CourseList"/>
            )
        })
        return(
            <CourseListDiv>
              <h1>Course List</h1>
              {courses}
              <button onClick={this.addNewCourseLink}>Add New Course</button>
     
            </CourseListDiv>
        )
    }
}  export default CourseList

const CourseListDiv = styled.div`
    width: 500px;
    display: flex;
    justify-content: center;
    flex-flow:column;
    align-items: center;
    @media (max-width: 500px) {
        width: 320px;
      }
    `


