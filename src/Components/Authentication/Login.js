import React, {Component} from 'react'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'


    
    
class Login extends Component{
  constructor(){
    super()
    this.state={
      username: '',
      password:''
    }
  }



  handleTextUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserLogin = (e) => {
    e.preventDefault()
    const {username,password} = this.state
    axios
        .post('/user/login', {username, password})
        .then(res => this.props.history.push('/'))
        .catch(err => console.log(err))
        e.target.username.value = ''
        e.target.password.value =''
  }

    render() {
        return(
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleUserLogin}>
              <input type='text' onChange={this.handleTextUpdate} placeholder='Username' name='username'></input>
              <input type='text' onChange={this.handleTextUpdate} placeholder='Password' name='password'></input>
              <button>Submit</button>
          </form>
        </div>
        )
    }
  }
function mapStateToProps(state) {
  return {user:state.user}
}

 export default connect(mapStateToProps,{updateUser})(Login)