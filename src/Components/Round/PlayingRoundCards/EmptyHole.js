import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {holeUpdate,totalUpdate} from '../../../redux/roundReducer'
import {Redirect} from 'react-router-dom'


class EmptyHole extends Component {
    constructor(){
        super()
        this.state={
            selectFairway: true,
            selectGir: false,
            selectLostBalls: false,
            selectScore: false,
            fairway: '',
            gir: '',
            lostBall: '',
            score: null,
            roundComplete: false
        }
 
    }

    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    updateSelectFairwayYes = () => {
        this.setState({
            fairway: 'yes',
            selectFairway: false,
            selectGir: true
        })
    }

    updateSelectFairwayNo = () => {
        this.setState({
            fairway: 'no',
            selectFairway: false,
            selectGir: true
        })
    }

    updateSelectGirYes = () => {
        this.setState({
            gir: 'yes',
            selectGir: false,
            selectLostBalls: true
        })
    }

    updateSelectGirNo = () => {
        this.setState({
            gir: 'no',
            selectGir: false,
            selectLostBalls: true
        })
    }

    updateSelectLostBallsYes = () => {
        this.setState({
            lostBall: 'yes',
            selectLostBalls: false,
            selectScore: true
        })
    }

    updateSelectLostBallsNo = () => {
        this.setState({
            lostBall: 'no',
            selectLostBalls: false,
            selectScore: true
        })
    }

    nextHole = async () => {
            let {fairway,score, gir,lostBall} = this.state
            score = Number(score)
            const {round_id, hole} = this.props.round
            this.props.holeUpdate({fairway,score,gir,lostBall})
            axios.post('/round/addHoleToRound',{round_id, hole, fairway,score,gir,lostBall})
            await this.props.totalUpdate()
            const {total_score,total_fairways,total_gir,total_lostball} = this.props.round.roundTotal
            axios.put('round/addRoundTotals', {round_id, total_score, total_fairways, total_gir, total_lostball})
            if (this.props.round.numOfHoles >= this.props.round.hole){
                return this.setState({
                    selectScore: false,
                    selectFairway: true
                })
            } else if (this.props.round.numOfHoles <= this.props.round.hole) { 
                axios
                    .put(`/round/completeround/${round_id}`)
                    .then(res => console.log('round completed'))
                    .catch(err => console.log(err))
                this.setState({
                    roundComplete: true
                })
            }
        }

    choiceFunction = (e) => {
        if (this.state.selectFairway) {
            return(
                <div className="choiceBox">
                    <h1>Fairway?</h1>
                    <div className='bigButton1' value='yes' onClick={this.updateSelectFairwayYes}>
                        <h2>Yes</h2>
                    </div>
                    <div className="bigButton2" value='no' onClick={this.updateSelectFairwayNo}>
                        <h2>No</h2>
                    </div>
                </div>
            )
        } else if (this.state.selectGir) {
            return(
                <div className="choiceBox">
                    <h1>Green In Regulation?</h1>
                    <div className='bigButton1' value='yes' onClick={this.updateSelectGirYes}>
                        <h2>Yes</h2>
                    </div>
                    <div className="bigButton2" value='no' onClick={this.updateSelectGirNo}>
                        <h2>No</h2>
                    </div>
                </div>
            )
        } else if (this.state.selectLostBalls) {
            return(
                <div className="choiceBox">
                    <h1>Lost Balls?</h1>
                    <div className='bigButton1' value='yes' onClick={this.updateSelectLostBallsYes}>
                        <h2>Yes</h2>
                    </div>
                    <div className="bigButton2" value='no' onClick={this.updateSelectLostBallsNo}>
                        <h2>No</h2>
                    </div>
                </div>
            )
        } else if (this.state.selectScore) {
             return(
                <div className="choiceBox">
                    <h1>Score</h1>
                    <input type='tel' name='score' placeholder="Enter Score" onChange={this.updateState}></input>
                    <button onClick={this.nextHole}>Submit</button>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.choiceFunction()}
                {this.state.roundComplete === true &&
                    <Redirect push to='/completedround' />}
                }
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        round:state.round
    }
}

export default connect (mapStateToProps,{totalUpdate, holeUpdate})(EmptyHole)

