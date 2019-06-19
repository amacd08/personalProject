import React, {Component} from 'react'
import {Line, Donut} from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components'

class Chart extends Component {
    constructor(){
    super()
    this.state = {
        fairways: [],
        scores:[],
        dateRange:[],
        lostBalls:[],
        girs: [],
        over_pars: [],
        pars: [],
        under_pars: [],
        coordList: []
    }
  }

  async componentDidMount() {
    let answer = await axios.get('/round/getRoundList')
    if (answer.data) {
        let roundList = answer.data
        console.log(roundList[1])
        let fairways = []
        let scores = []
        let dateRange = []
        let lostBalls = []
        let girs = []
        let over_pars = []
        let pars = []
        let under_pars = []
        for (let i = 0; i < roundList.length; i++){
            fairways.push(roundList[i].total_fairways)
            girs.push(roundList[i].total_gir)
            lostBalls.push(roundList[i].total_lostball)
            dateRange.push(`${roundList[i].date.slice(5,7)} ${roundList[i].date.slice(8,10)}`)
            scores.push(roundList[i].total_score)
            over_pars.push(roundList[i].over_par)
            pars.push(roundList[i].par)
            under_pars.push(roundList[i].under_par)
        }
        this.setState({fairways, scores, dateRange, lostBalls, girs, over_pars, pars, under_pars})
        this.coordList()
        console.log(this.state)
    
      }
    }

    chartData = () => {
        let coordList = []
        if (this.state.score) {
            for (let i = 0; i < this.state.scores.length; i++){
                let coordinate = {
                    x: this.state.dateRange[i],
                    y: this.state.score[i]
                }
                coordList.append(coordinate)
            }
        this.setState({
            coordList
        })
        }
    }
            
            
  
  render(){
      return(
          <ChartBody style={styles.graphContainer}>
              <Line
                   data={this.state}
                   height={400}
                   // width={100}
                   options={{
                       responsive: true,
                       maintainAspectRatio: false,
                       tooltips: false,
                       title: {
                           display: true,
                           text: ''
                       },
                       legend: {
                           display: false
                       },
                       scales: {
                           yAxes:
                               [{
                                   ticks: { beginAtZero: true, },
                                   gridLines: {
                                       display: true,
                                       color: 'rgba(0, 0, 0, 0.1)'
                                   }
                               }],
                           xAxes:
                               [{
                                   gridLines: {
                                       display: true,
                                       color: 'rgba(0, 0, 0, 0.1)'
                                   }
                               }]
                       }
                   }} />
          </ChartBody>

      )
  }

}

const ChartBody = styled.div`
    min-height: 100%;
    min-width: 100%;
    background: #F9F9F9
    `

const styles = {
    graphContainer: {
      border: '1px solid black',
      padding: '15px'
    }
  }
      

export default Chart