import React, {Component} from 'react'
import axios from 'axios'
import Course from '../Courses/Course'
import {connect} from 'react-redux'
import {createCourseList} from '../../redux/courseReducer'

class NewRoundCourseSelect extends Component {
    constructor() {
        super()
        this.state = {


        }
    }
    componentDidMount() {
        axios
            .get('/course/getCourses')
            .then(res => {
                let courseList = res.data.map(course => {
                    return course
                })
                this.props.createCourseList(courseList)
            })
            .catch(err => console.log(err))
    }

    render(){
        let courses = this.props.course.courseList.map((course,i) => {
                //onclick or link these div boxes .. . . that will send the user to the next question - like tee -> num of holes => etc. .. 
                //This function also needs to add course_id and maybe round_id into redux. . . 
            return(    
                <div  key={i}>
                    <Course
                     key={i} 
                        courseFromParent={course}
                        source={'newRoundSetup'} />
                </div>
            )
        })
        return (
            <div>
                
                {courses}
                {/* <Route path='/newround/step3' component={StepThree} /> */}
            </div>
            )
    }
}
function mapStateToProps(state) {
    return {
        course: state.course,
        round: state.round
    }
}
export default connect(mapStateToProps,{createCourseList})(NewRoundCourseSelect)
