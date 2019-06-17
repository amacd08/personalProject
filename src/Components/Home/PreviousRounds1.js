import React, {Component} from 'react'
import axios from 'axios';
import DisplayRounds from './DisplayRounds'
import {roundReview, clearRound} from '../../redux/roundReducer'
import {connect} from 'react-redux'

    
    
class PreviousRounds1 extends Component{
   constructor() {
         super()
         this.state = {
            roundsList: [],
            roundComplete: false,
            resumeRound: false
            }
       }
  
  async componentDidMount() {
    this.props.clearRound()
    axios
    .get('/round/getRoundList')
    .then(res => {
        this.setState({
            roundsList: res.data
        })
      })
      .catch(err => console.log(err))
    }
    
     viewCompletedRound = async (round) => {
       let fairway = []
       let score = []
       let lostBall = []
       let gir = []
       let par = []
       let blue = []
       let white = []
       let red = []
      let courseInfoAnswer = await axios.get(`/course/getCourseInfo/${round.course_id}`)
      for (let i = 0; i <= 17; i++) {
        par.push(courseInfoAnswer.data[i].par)
        blue.push(courseInfoAnswer.data[i].blue)
        white.push(courseInfoAnswer.data[i].white)
        red.push(courseInfoAnswer.data[i].red)
      }
      let courseInfo = {par, blue, white, red}
      let roundInfoAnswer = await axios.get(`/round/getRound/${round.round_id}`)
      for (let i = 0; i < roundInfoAnswer.data.length; i++) {
        fairway.push(roundInfoAnswer.data[i].fairway)
        score.push(roundInfoAnswer.data[i].score)
        gir.push(roundInfoAnswer.data[i].gir)
        lostBall.push(roundInfoAnswer.data[i].lostBall)
      }
      let hole = fairway.length
      if (hole < 18) {
        hole = hole + 1
      }
      round = {...round, hole}
      let roundInfo = {fairway, score, gir, lostBall}
      let newRoundData = {...round, courseInfo, roundInfo}
      this.props.roundReview(newRoundData)
      this.setState({
        roundComplete:true
        })
    }

    startResumeRound = async (round) => {
      let fairway = []
      let score = []
      let lostBall = []
      let gir = []
      let par = []
      let blue = []
      let white = []
      let red = []
     let courseInfoAnswer = await axios.get(`/course/getCourseInfo/${round.course_id}`)
     for (let i = 0; i <= 17; i++) {
       par.push(courseInfoAnswer.data[i].par)
       blue.push(courseInfoAnswer.data[i].blue)
       white.push(courseInfoAnswer.data[i].white)
       red.push(courseInfoAnswer.data[i].red)
     }
     let courseInfo = {par, blue, white, red}
     let roundInfoAnswer = await axios.get(`/round/getRound/${round.round_id}`)
     for (let i = 0; i < roundInfoAnswer.data.length; i++) {
       fairway.push(roundInfoAnswer.data[i].fairway)
       score.push(roundInfoAnswer.data[i].score)
       gir.push(roundInfoAnswer.data[i].gir)
       lostBall.push(roundInfoAnswer.data[i].lostBall)
     }
     let hole = fairway.length
     if (hole < 18) {
      hole = hole + 1
    }
     round = {...round, hole}
     let roundInfo = {fairway, score, gir, lostBall}
     let newRoundData = {...round, courseInfo, roundInfo}
      this.props.roundReview(newRoundData)
     this.setState({
       resumeRound:true
       })
   }

    render() {
        let rounds = this.state.roundsList.map((round,i) => {
            return (
                    <DisplayRounds 
                      key={i}
                      roundFromParent={round}
                      viewCompletedRound={this.viewCompletedRound}
                      roundComplete={this.state.roundComplete}
                      startResumeRound={this.startResumeRound}
                      resumeRound={this.state.resumeRound}
                       />
            )
        })
      return(
        <div>
          <h1>Previous Round</h1>
            {rounds}
        </div>
      )
    }
} 
function mapStateToProps(state) {
  return {round:state.round}
}

export default connect (mapStateToProps,{roundReview, clearRound})(PreviousRounds1)