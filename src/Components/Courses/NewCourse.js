import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-router-dom'


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
        console.log(this.state)
        const {coursename, city, st, picture} = this.state
        const createCourse = await axios.post('/course/createCourse',{coursename, city, st, picture})
        this.props.history.push('/courses')

    }

    render() {
        return(
        <div>
          <form onSubmit={this.handleNewCourse}>
              <input type="text" onChange={this.handleTextUpdate} placeholder='Course Name' name='coursename'></input>
              <input type="text" onChange={this.handleTextUpdate} placeholder='City' name='city'></input>
              <input type="text" onChange={this.handleTextUpdate} placeholder='State' name='st'></input>
              <input type="text" onChange={this.handleTextUpdate} placeholder='picture' name='picture'></input>
              <button>Sumbit</button>
          </form> 
        </div>
        )
    }
} export default NewCourse