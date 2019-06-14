import React, {Component} from 'react'
import PreviousRounds1 from './PreviousRounds1'
import Posts from './Posts'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios';
    
    
class Home extends Component{

    componentDidMount(){
      axios
          .get('/user/info')
          .then(res => this.props.updateUser(res.data))
          .catch(err => {
            this.props.history.push('/login')
          })
      }
    

    render() {
        return(
        <div>
          <PreviousRounds1 />
          <Posts />
        </div>
        )
    }
}


    function mapStateToProps(state) {
      return {user:state.user}
    }
    
     export default connect(mapStateToProps,{updateUser})(Home)