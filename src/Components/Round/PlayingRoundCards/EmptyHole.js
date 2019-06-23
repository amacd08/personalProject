import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {holeUpdate,totalUpdate} from '../../../redux/roundReducer'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'


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
            const {round_id, hole, tee} = this.props.round
            this.props.holeUpdate({fairway,score,gir,lostBall})
            axios.post('/round/addHoleToRound',{round_id, hole, fairway,score,gir,lostBall})
            await this.props.totalUpdate()
            const {total_score,total_fairways,total_gir,total_lostball, over_par, par, under_par} = this.props.round.roundTotal
            axios.put('round/addRoundTotals', {round_id, total_score, total_fairways, total_gir, total_lostball, over_par, par, under_par})
            if (this.props.round.numOfHoles > this.props.round.roundInfo.fairway.length){
                return this.setState({
                    selectScore: false,
                    selectFairway: true
                })
            } else if (this.props.round.numOfHoles <= this.props.round.roundInfo.fairway.length ) { 
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
                <>
                    <Wrapper>
                        <h1>Fairway?</h1>
                    </Wrapper>
                    <ChoiceBox>
                        <div onClick={this.updateSelectFairwayYes}>
                            <h2>Yes</h2>
                        </div>
                        <div onClick={this.updateSelectFairwayNo}>
                            <h2>No</h2>
                        </div>
                    </ChoiceBox>
                </>
            )
        } else if (this.state.selectGir) {
            return(
                <>
                    <Wrapper>
                        <h1>Green In Regulation?</h1>
                    </Wrapper>
                    <ChoiceBox>
                        <div onClick={this.updateSelectGirYes}>
                            <h2>Yes</h2>
                        </div>
                        <div className="bigButton2" value='no' onClick={this.updateSelectGirNo}>
                            <h2>No</h2>
                        </div>
                    </ChoiceBox>
                </>
            )
        } else if (this.state.selectLostBalls) {
            return(
                <>
                    <Wrapper>
                        <h1>Lost Balls?</h1>
                    </Wrapper>
                    <ChoiceBox>
                        <div  onClick={this.updateSelectLostBallsYes}>
                            <h2>Yes</h2>
                        </div>
                        <div  onClick={this.updateSelectLostBallsNo}>
                            <h2>No</h2>
                        </div>
                    </ChoiceBox>
                </>
            )
        } else if (this.state.selectScore) {
             return(
                <>
                    <Wrapper>
                        <h1>Score</h1>
                    </Wrapper>
                    <ChoiceBox>
                        <EnterHoleInput type='tel' placeholder="Enter Score" name='score' onChange={this.updateState}></EnterHoleInput>
                        <Submit onClick={this.nextHole}>Submit</Submit>
                    </ChoiceBox>
                </>
            )
        }
    }

    render(){
        return(
            <CourseListDiv>
                {this.choiceFunction()}
                {this.state.roundComplete === true &&
                    <Redirect push to='/completedround' />}
            </CourseListDiv>
        )
    }
}

function mapStateToProps(state) {
    return {
        round:state.round
    }
}
const CourseListDiv = styled.div`
    width: 500px;
    display: flex;
    justify-content: center;
    flex-flow:column;
    align-items: center;
    @media (max-width: 500px) {
        width: 320px;
      }
    `
const EnterHoleInput = styled.input` 
    font-size: 1.5em;
    font-family: sans-serif;
    width: 50%
    margin-top: 10px;
    `
const ChoiceBox = styled.div`
    width: 90%
    display: flex;
    align-items: center;
    justify-content: space-between;
    `
const Button = styled.div`
    marign:0px;
    `
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    `
const Submit = styled.button`
    margin: 0px;
    font-family: sans-serif;
    margin-top: 15px;
    font-size: 1.5em;
    width: 150px;
    height: 30px;
    background: #A7F285;
    text-decoration: none;
    border: 0px;
    border-radius: 10px;
    margin-bottom: 10px;
    `



export default connect (mapStateToProps,{totalUpdate, holeUpdate})(EmptyHole)

