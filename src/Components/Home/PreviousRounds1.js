import React, {Component} from 'react'
import axios from 'axios';
import DisplayRounds from './DisplayRounds'
import {Link} from 'react-router-dom'

    
    
class PreviousRounds1 extends Component{
   constructor() {
         super()
         this.state = {
            roundsList: []
            }
       }
  
  async componentDidMount() {
    axios
    .get('/round/getRoundList')
    .then(res => {
        this.setState({
            roundsList: res.data
        })
      })
      .catch(err => console.log(err))
    }


    render() {
        let rounds = this.state.roundsList.map((round,i) => {
            return (
                    <DisplayRounds 
                      key={i}
                      roundFromParent={round} />
            )
        })
        return rounds
      return(
        <div>
          <h1>Previous Round</h1>
            {rounds}
        </div>
      )
    }
} export default PreviousRounds1