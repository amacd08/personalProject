import React, {Component} from 'react'
import axios from 'axios'
    
    
class Register extends Component{
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      city: '',
      state:'',
      favoritecourse:''

    }
  }

  handleTextUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserRegistration = (e) => {
    e.preventDefault()
    const {firstname,lastname, email, username, password, city, state, favoritecourse} = this.state
    axios
        .post('/user/registration', {firstname,lastname, email, username, password, city, state, favoritecourse})
        .then(res => this.props.history.push('/details'))
        .catch(err => console.log(err))
        e.target.username.value = ''
        e.target.password.value =''
  }

    render() {
        return(
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleUserRegistration}>
            <input type='text' onChange={this.handleTextUpdate} placeholder='First Name' name='firstname'></input>
            <input type='text' onChange={this.handleTextUpdate} placeholder='Last Name' name='lastname'></input>              
            <input type='text' onChange={this.handleTextUpdate} placeholder='Email' name='email'></input>          
            <input type='text' onChange={this.handleTextUpdate} placeholder='Username' name='username'></input>
            <input type='text' onChange={this.handleTextUpdate} placeholder='Password' name='password'></input>
            <input type='text' onChange={this.handleTextUpdate} placeholder='City' name='city'></input>
            <input type='text' onChange={this.handleTextUpdate} placeholder='State' name='state'></input>
            <input type='text' onChange={this.handleTextUpdate} placeholder='Favorite Course' name='favoritecourse'></input>
            <button>Submit</button>
          </form>
        </div>
        )
    }
} export default Register