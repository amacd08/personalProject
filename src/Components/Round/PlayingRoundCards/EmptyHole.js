import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {holeUpdate} from '../../../redux/roundReducer'


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
            score: null
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

    updateSelectGiryNo = () => {
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

    nextHole = () => {
        if (this.props.hole <= this.props.numOfHoles){
            const {fairway,score, gir,lostBall} = this.state
            const {round_id, hole} = this.props.round
            this.props.holeUpdate({fairway,score,gir,lostBall})
            axios.post('/round/addHoleToRound',{round_id, hole, fairway,score,gir,lostBall})
            this.setState({
                selectScore: false,
                selectFairway: true
            })
        }
        else{ 
            this.props.history.push('/')
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
        console.log(this.state.score)
        return(
            <div>
                {this.choiceFunction()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        round:state.round
    }
}

export default connect (mapStateToProps,{holeUpdate})(EmptyHole)

