import React, {Component} from 'react'
import axios from 'axios';
import styled from 'styled-components'


class NewCourse extends Component{
    constructor() {
        super()
        this.state = {
            coursename: '',
            city: '',
            st: '',
            picture:''
        }
    }

    handleTextUpdate = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
     handleNewCourse = async (e) => {
        e.preventDefault()
        const {coursename, city, st, picture} = this.state
        axios
            .post('/course/createCourse',{coursename, city, state: st})
            .then(() => {this.props.history.push('/courses')})
    }

    render() {
        return(
        <NewCourseBox>
          <NewCourseForm onSubmit={this.handleNewCourse}>
              <EnterHoleInput type="text" onChange={this.handleTextUpdate} placeholder='Course Name' name='coursename'></EnterHoleInput>
              <EnterHoleInput type="text" onChange={this.handleTextUpdate} placeholder='City' name='city'></EnterHoleInput>
              <EnterHoleInput type="text" onChange={this.handleTextUpdate} placeholder='State' name='st'></EnterHoleInput>
              <button>Sumbit</button>
          </NewCourseForm> 
        </NewCourseBox>
        )
    }
}
const NewCourseBox = styled.div`
    margin-top: 100px;
    width: 500px;
    `
const NewCourseForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    `
const EnterHoleInput = styled.input` 
    font-size: 1.5em;
    font-family: sans-serif;
    width: 50%
    margin-bottom: 10px;
    `
export default NewCourse