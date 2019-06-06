import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {clearUser} from '../redux/userReducer'
import {connect} from 'react-redux'



class Nav extends Component{


    logOut = () => {
        this.props.clearUser()
    }


    render() {
        console.log(this.props)
        return(
        <div>
          <h1>The Golfer Network</h1>
          {this.props.user.loggedIn &&
                <div>
                    <h3>{this.props.user.user.firstname}</h3>
                    <button>Logout</button>
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