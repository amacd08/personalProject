import React, {Component} from 'react'
import PreviousRounds from './PreviousRounds'
import Posts from './Posts'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import Login from '../Authentication/Login'
import Register from '../Authentication/Register'
    
    
class Home extends Component{


    render() {
      if (!this.props.loggedIn) this.props.history.push('/login')
        return(
        <div>
          <PreviousRounds />
          <Posts />
        </div>
        )
    }


} export default Home