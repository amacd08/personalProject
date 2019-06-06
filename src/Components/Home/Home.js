import React, {Component} from 'react'
import PreviousRounds from './PreviousRounds'
import Posts from './Posts'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios';
import { statement } from '@babel/template';
    
    
class Home extends Component{

    async componentDidMount(){
      axios
      .get('/user/info')
      .then(res => {
        console.log(res)
        this.props.updateUser(res.data)
      })
      .catch((err) => {
        this.props.history.push('/login')
      })
    }

    render() {
        return(
        <div>
          <PreviousRounds />
          <Posts />
        </div>
        )
    }
}


    function mapStateToProps(state) {
      return {user:state.user}
    }
    
     export default connect(mapStateToProps,{updateUser})(Home)