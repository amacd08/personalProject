import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './course.css'
import {newRound} from '../src/redux/roundReducer'
import DisplayInfo from '../src/Components/Courses/courseInfo/DisplayInfo'
import EnterInfo from '../src/Components/Courses/courseInfo/EnterInfo'


class Course extends Component {
    constructor() {
        super()
        this.state = {
            course_id: '',
            tee: null,
            courseInfo: {
                blue: [],
                white: [],
                red: [],
                par: []
            },
            displayHoles:false
        }
    }

    async componentDidMount () {
        const courseInfo = await axios.get(`/course/getCourseInfo/${this.props.course.course_id}`)
        if (courseInfo.data != 'No Course Info Added Yet') {
            this.setState({
                updateCourseInfo: true
            })
            let blue = []
            let red = []
            let par = []
            let white = []
            courseInfo.data.map(hole => {
                blue.push(hole.blue)
                white.push(hole.white)
                red.push(hole.red)
                par.push(hole.par)
            })
            this.setState({
                courseInfo: {
                    blue: blue,
                    white: white,
                    red: red,
                    par:par
                }
            })
        }
    }

    handleTextUpdate = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    addCourseInfo = () => {
        this.setState({
            addCourseInfo: true,
            displayHoles: false
        })
    }

    
        enterHoleInfo = () => {
            let holes = []
                for (let i = 1; i <=18; i++ ) {
                    let hole = 
                        <div key={i}>
                            <span>Hole {i}
                                <input onChange={this.handleTextUpdate} type='text' placeholder='Length' name={`distance${i}`}></input></span>
                            {!this.state.courseInfo.par[0] && 
                                <span>
                                    <input type='text' onChange={this.handleTextUpdate} placeholder='Par' name={`par${i}`}></input></span>}
                        </div>
                    holes.push(hole)
                }
                return (
                    <form>
                        <select id="tee" name='tee' onChange={this.handleTextUpdate} defaultValue='placeholder'>
                            <option disabled value='placeholder'>Select Tee</option>
                            {!this.state.courseInfo.blue[0] && <option value="blue">Blues</option>}
                            {!this.state.courseInfo.white[0] && <option value="white">Whites</option>}
                            {!this.state.courseInfo.red[0] && <option value="red">Reds</option>}
                        </select>
                        {holes}
                        <button onClick={this.updateCourseInfo}>Update Course Info</button>
                    </form>
                )
        }



    displayHoles = async () => {
        this.setState({
            displayHoles: true
        })

    //     const courseInfo = await axios.get(`/course/getCourseInfo/${this.props.course.course_id}`)
    //         if (courseInfo.data != 'No Course Info Added Yet') {
    //             this.setState({
    //                 updateCourseInfo: true
    //             })
    //             let blue = []
    //             let red = []
    //             let par = []
    //             let white = []
    //             courseInfo.data.map(hole => {
    //                 blue.push(hole.blue)
    //                 white.push(hole.white)
    //                 red.push(hole.red)
    //                 par.push(hole.par)
    //             })
    //             // this.props.newRound()
    //         }
    }


    tableHead = () => {
        let holes = []
        for (let i = 1; i <=18; i++) {
            let th = <th key={i} width='75px'>{i}</th>
            holes.push(th)
        }
        return holes
    }

    render(){
        return (
            <div>
                <Link to='/newround/step2'>
                    <h2>{this.props.course.coursename}</h2>
                    <p>{this.props.course.city}</p>
                </Link>
                    <button onClick={this.addCourseInfo}>Add Course Info</button>
                    <button onClick={this.displayHoles}>Display Course Information</button>
                    {this.state.addCourseInfo && this.enterHoleInfo()}
                    {this.state.displayHoles &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Tee</th>
                                        {this.tableHead()}
                                </tr>
                            </thead>
                        <tbody>
                            <DisplayInfo
                                tee={this.state.courseInfo.par}
                                row={'par' } />
                            <DisplayInfo
                                tee={this.state.courseInfo.par}
                                row={'par'} />
                            <DisplayInfo
                                tee={this.state.courseInfo.blue}
                                row={'blue'} />
                            <DisplayInfo
                                tee={this.state.courseInfo.white}
                                row={'white'} />
                            <DisplayInfo
                                tee={this.state.courseInfo.red}
                                row={'red'} />
                        </tbody>
                    </table>
                }
            </div>
        )
    }
} export default Course




    // enterHoleInfo = (e) => {
    //     let holes = []
    //     for (let i = 1; i <=18; i++) {
    //         let th = <th key={i} width='75px'>{i}</th>
    //         holes.push(th)
    //     }
    //     let teeDistance = (tee) => {
    //         let distance = []
    //         for (let i = 1; i <=18; i++) {
    //             if (!this.state.courseInfo[tee][0]) {
    //                 let entry =  <td key={i}>
    //                                 <input 
    //                                     onChange={this.handleTextUpdate} 
    //                                     type='text' placeholder={tee==='par' ? 'par' : 'distance'} 
    //                                     name={`distance${i}`}>
    //                                 </input>
    //                             </td>
    //                 distance.push(entry)
    //             } else {
    //                     let hole = this.state.courseInfo[tee][i]
    //                     let entry = <td key={i}>{hole}</td>
    //                     distance.push(entry)
    //                 }
    //             } 
    //         return distance
    //     }
    //     return(
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Tee</th>
    //                         {holes}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <th>Par</th>
    //                     {teeDistance('par')}
    //                 </tr>
    //                 <tr>
    //                     <th>Blue</th>
    //                     {this.state.courseInfo.blue && teeDistance('blue')}
    //                 </tr>
    //                 <tr>
    //                     <th>White</th>
    //                     {this.state.courseInfo.white && teeDistance('white')}
    //                 </tr>
    //                 <tr>
    //                     <th>Red</th>
    //                     {this.state.courseInfo.red && teeDistance('red')}
    //                 </tr>
    //             </tbody>
    //         </table>
    //     )
    // }


    
    // displayCourseInfo = (e) => {
    //     let holes = []
    //     for (let i = 1; i <=18; i++) {
    //         let th = <th key={i} width='75px'>{i}</th>
    //         holes.push(th)
    //     }
    //     let teeDistance = (tee) => {
    //         let distance = this.state.courseInfo[tee].map((hole, i) => {
    //             return <td key={i}>{hole}</td>
    //         })
    //         return distance
    //     }
    //     let emptyCourse = (tee) => {
    //         let distance = []
    //         for (let i = 1; i <= 18; i++)
    //             distance.push(<td key={i}></td>)
    //         return distance
    //     }
        
    //     return(
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Tee</th>
    //                         {holes}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <th>Par</th>
    //                     {this.state.courseInfo.par[0] ? teeDistance('par') : emptyCourse()}
    //                 </tr>
    //                 <tr>
    //                     <th>Blue</th>
    //                     {this.state.courseInfo.blue[0] ? teeDistance('blue') : emptyCourse()}
    //                 </tr>
    //                 <tr>
    //                     <th>White</th>
    //                     {this.state.courseInfo.white[0] ? teeDistance('white') : emptyCourse()}
    //                 </tr>
    //                 <tr>
    //                     <th>Red</th>
    //                     {this.state.courseInfo.red[0] ? teeDistance('red') : emptyCourse()}
    //                 </tr>
    //             </tbody>
    //         </table>
    //     )
    // }

    // newRound = () => {
    //     <newRound course_id={this.props.course} />

    // }