import React, {Component} from 'react'
    
    
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

    render() {
        return(
        <div>
          <h1>Login</h1>
          <form>
              <input type='text' onChange={this.handleTextUpdate} placeholder='Username' name='username'></input>
              <input type='text' onChange={this.handleTextUpdate} placeholder='Password' name='password'></input>
          </form>
        </div>
        )
    }
} export default Login