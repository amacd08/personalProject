import React, {Component} from 'react'
import {Line, Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components'

class Chart extends Component {
    constructor(){
    super()
    this.state = {
        chart: '',
        graph: '',
        chartNames: [],
        dataHolder: [],
        data: {
            datasets:[],
            labels:[1,2,3,4,5,6,7,8]
        },
        donutGraph: []
    }
}
  

   componentDidMount =async () => {
    let answer = await axios.get('/round/getRoundList')
    if (answer.data) {
        let roundList = answer.data
        let fairways = []
        let scores = []
        let dateRange = []
        let lostBalls = []
        let girs = []
        let over_pars = []
        let pars = []
        let under_pars = []
        let CourseLabels = []
        for (let i = 0; i < 8; i++){
            fairways.push(roundList[i].total_fairways)
            girs.push(roundList[i].total_gir)
            lostBalls.push(roundList[i].total_lostball)
            dateRange.push(`${roundList[i].date.slice(0,10)}`)
            scores.push(roundList[i].total_score)
            over_pars.push(roundList[i].over_par)
            pars.push(roundList[i].par)
            under_pars.push(roundList[i].under_par)
        }
        let arrayList = {fairways, girs, lostBalls, scores, over_pars, pars, under_pars}
        this.setState({fairways, scores, dateRange, lostBalls, girs, over_pars, pars, under_pars})
        let dateMax = dateRange[0]
        let dateMin = dateRange[dateRange.length -1]
        let dataHolder = {}
        var chartNames = []
        if (this.state.scores) {
            for (let list in arrayList){
                var coordList = []
                var newDataSets = {}
                for (let i = 0; i < 8 ; i++) {
                    let coordinate = {
                              y: arrayList[`${list}`][i],
                              x: dateRange[i]
                            }
                    coordList.push(coordinate)
                    }
                    chartNames.push(`${list}`)
                    newDataSets = {
                        label: `${list}`,
                        backgroundColor: 'rgb(73,203,190)',
                        borderColor: 'rgb(73,203,190)',
                        lineTension: .04,
                        borderwidth: 1,
                        showLine: true,
                        data: coordList,
                        fill: false
                    }
                dataHolder[`${list}`] = newDataSets
            }
            let total_over_pars = over_pars.reduce((total, num) => {
                return total + num }) 
            let total_pars =  pars.reduce((total, num) => {
                return total + num }) 
            let total_under_pars =  under_pars.reduce((total, num) => {
                return total + num }) 
            let donutGraph = [total_over_pars,total_pars,total_under_pars]
            chartNames.push('holeResults')

        this.setState({
            dataHolder: dataHolder,
            dateRange,
            dateMin,
            dateMax,
            chartNames,
            donutGraph
            })
        }
    }
}

  handleTextUpdate = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
  updateChart = () => {
      if (this.state.chart === 'holeResults') {
          let dGraph = this.state.donutGraph
          let doughnutData = {
              datasets: [{
                  data:[dGraph[0], dGraph[1], dGraph[2]],
                  backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
                  hoverBackgroundCzolor: ['#FF6384','#36A2EB','#FFCE56'
                    ]}],
              labels: ['Holes Over Par', 'Holes with Par', 'Holes Under Par']
          }
        this.setState({
            data: doughnutData,
            graph: 'doughnut'
        })
      } else if (this.state.chart !== 'holeResults') {
      this.setState({
          data: {
              datasets: [this.state.dataHolder[`${this.state.chart}`]],
              labels: this.state.dateRange,
          },
          graph: 'line'
      })
    }
  }

  
  render(){
      console.log(this.state.data)
    let inputs = this.state.chartNames.map((data,i) => {
        return(
            <option key={i} value={data}>{`${data}`}</option>
        )
    })
      return(
        <PageHolder>
            <div>
                <select name="chart" onChange={this.handleTextUpdate} defaultValue='placeholder'>
                   <option disabled value='placeholder'>Select Chart</option>

                    {inputs}
                </select>
                <button onClick={this.updateChart}>Submit</button>
            </div>

          <ChartBody>
              {this.state.graph === 'line' &&
                  <Line
                       data={this.state.data}
                       height={500}
                       width={600}
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
                                       ticks: { beginAtZero: true},
                                       gridLines: {
                                           display: true,
                                           color: 'rgba(0, 0, 0, 0.1)'
                                       }
                                   }],
                               xAxes:
                                   [{
                                        type: 'time',
                                        time: {
                                            unit: 'week',
                                            displayFormats: {day: 'yyyy-mm-dd'},
                                            min: this.state.dateMin,
                                            max: this.state.dateMax
                                       }
                                   }]
                           }
                       }} />
                }
                {this.state.graph === 'doughnut' && 
                    <div>
                        <h2>Holes to Par</h2>
                        <Doughnut 
                        data={this.state.data}
                        height={400}
                        />
                  </div>}
          </ChartBody>
        </PageHolder>

      )
    }
}

const PageHolder = styled.div`
   margin: 0px;
   margin-top: 50px;
   `

const ChartBody = styled.div`
    height:100%;
    width: 500px;
    background: #F9F9F9
    @media (max-width: 500px) {
        max-width: 350px;
      }
    `

const styles = {
    graphContainer: {
      border: '1px solid black',
      padding: '15px'
    }
  }
      

export default Chart