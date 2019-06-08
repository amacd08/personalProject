import React, {Component} from 'react'

class EnterInfo extends Component{
    constructor(){
        super()
        this.state = {

        }

    }
   enterHoleInfo = () => {
       let holes = []
       for (let i = 1; i <=18; i++) {
           let th = <th key={i} width='75px'>{i}</th>
           holes.push(th)
       }
    }
       
   
    teeDistance = (tee) => {
       let distance = []
       for (let i = 1; i <=18; i++) {
           if (!this.props.courseInfo[tee][0]) {
               let entry =  <td key={i}>
                               <input 
                                   onChange={this.handleTextUpdate} 
                                   type='text' placeholder={tee==='par' ? 'par' : 'distance'} 
                                   name={`distance${i}`}>
                               </input>
                           </td>
               distance.push(entry)
           } else {
                   let hole = this.props.courseInfo[tee][i]
                   let entry = <td key={i}>{hole}</td>
                   distance.push(entry)
               }
           } 
       return distance
    }   

    render(){
       return(
            <table>
                <thead>
                    <tr>
                        <th>Tee</th>
                            {this.holes}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Par</th>
                        {this.teeDistance('par')}
                    </tr>
                    <tr>
                        <th>Blue</th>
                        {this.props.courseInfo.blue && this.teeDistance('blue')}
                    </tr>
                    <tr>
                        <th>White</th>
                        {this.props.courseInfo.white && this.teeDistance('white')}
                    </tr>
                    <tr>
                        <th>Red</th>
                        {this.props.courseInfo.red && this.teeDistance('red')}
                    </tr>
                </tbody>
            </table>
        )
    }
} export default EnterInfo