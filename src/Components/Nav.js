import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {clearUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import Axios from 'axios';



class Nav extends Component{


    logOut = () => {
        this.props.clearUser()
        Axios.get('/user/logout').then(()=>console.log('user logged out')).catch(err => console.log(err))
    }


    render() {
        console.log(this.props.user)

        return(
        <div>
          <h1>The Golfer Network</h1>
          {this.props.user.loggedIn &&
                <div>
                    <h3>{this.props.user.user.firstname}</h3>
                    <Link to='/login'><button onClick={this.logOut}>Logout</button></Link>
                    <Link to='/newround'><button>New Round Button</button></Link> 
                </div>
            
          }
          <span>
              <Link to='/courses'><p>Courses</p></Link>
              <Link to='/'><p>Home</p></Link>
              <p>Rounds</p>
          </span>
        </div>
        )
    }
} 

function mapStateToProps(state) {
    return {user: state.user}
  }
  
   export default connect(mapStateToProps,{clearUser})(Nav)