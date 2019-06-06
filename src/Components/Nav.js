import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Nav extends Component{

    render() {
        return(
        <div>
          <h1>The Golfer Network</h1>
          <span>
              <Link to='/courses'><p>Courses</p></Link>
              <Link to='/'><p>Home</p></Link>
              <p>Rounds</p>
          </span>
        </div>
        )
    }
} export default Nav