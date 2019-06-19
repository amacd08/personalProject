import React, {Component} from 'react'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


    
    
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
        <>  
          <ContainerBox>
            <LoginText>Login</LoginText>
            <FormBox onSubmit={this.handleUserLogin}>
                <InputBox type='text' onChange={this.handleTextUpdate} placeholder='Username' name='username'></InputBox>
                <InputBox type='text' onChange={this.handleTextUpdate} placeholder='Password' name='password'></InputBox>
                <Submit>Submit</Submit>
            </FormBox>
            <Submit><Link to={'/register'}>Register</Link></Submit>
          </ContainerBox>
        </>
      )

    }
  }
function mapStateToProps(state) {
  return {user:state.user}
}

const ContainerBox = styled.div`
    margin-top: 50px;
    width: 320px;   
    height: 350px; 
    padding-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-conent: flex-end;
    background: #F9F9F9;
    box-shadow: 10px 10px 7px 7px #888888;
    border-radius: 7px;
    `

const LoginText = styled.h1`
    margin: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: sans-serif;
    font-size: 1.75em;
    `
const RegisterText = styled.h1`
    margin: 0px;
    margin-top: 30px;
    font-family: serif;
    font-size 1.75em;
    `

const FormBox = styled.form`  
    display: flex;
    justify-conent: center;
    align-items: center;
    flex-flow: column;
    `
const InputBox = styled.input`
    font-size: 1.5em;
    border-radius: 7px;
    margin-bottom: 20px;
    width: 75%;
    `

const Submit = styled.button`
    margin: 0px;
    font-family: sans-serif;
    margin-top: 15px;
    font-size: 1.5em;
    width: 300px;
    height: 30px;
    background: #A7F285;
    text-decoration: none;
    border: 0px;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 75%;
    `
 export default connect(mapStateToProps,{updateUser})(Login)