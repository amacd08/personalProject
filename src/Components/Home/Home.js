import React, {Component} from 'react'
import PreviousRounds1 from './PreviousRounds1'
import Posts from './Posts'
import {updateUser} from '../../redux/userReducer'
import {connect} from 'react-redux'
import axios from 'axios';
import {BarLoader} from 'react-spinners'
    
    
class Home extends Component{
  constructor(){
    super()
    this.state={
      loading: true
    }
  }

    componentDidMount(){
      if (this.props.user.loggedIn) {
        this.props.history.push('/')
      }
      axios
          .get('/user/info')
          .then(res => {
            this.props.updateUser(res.data)
            this.setState({
              loading: false
            })})
          .catch(err => {
            this.props.history.push('/login')
          })
      }

    

    render() {
        return(
        <div>
          {this.state.loading ?
             <BarLoader size={50000} color={'#A7F285'} />
          :
          <PreviousRounds1 />
          }
        </div>
        )
    }
}


    function mapStateToProps(state) {
      return {user:state.user}
    }
    
     export default connect(mapStateToProps,{updateUser})(Home)