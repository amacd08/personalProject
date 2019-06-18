import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../../Courses/course.css'
import styled from 'styled-components'

class PlayingRoundCard extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render(){
        return(
            
            <TableWrapper>
                <InfoTable className="infoTable" border='0' width='300' height='25'>
                    <thead>
                        <tr>
                            <th><h4>Hole</h4></th>
                            <th><h4>Par</h4></th>
                            <th><h4>Length</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                           <th><h4>{this.props.round.hole}</h4></th>
                           <th><h4>{this.props.round.courseInfo.par[this.props.round.hole -1]}</h4></th>
                           <th><h4>{this.props.round.courseInfo[this.props.round.tee][this.props.round.hole -1]}</h4></th>
                        </tr>
                    </tbody>
                </InfoTable>
            </TableWrapper>
            
        )
    }
}
function mapStateToProps(state){
    return {
        round: state.round,
        user:state.user
    }
}

const TableWrapper = styled.div`
    display: flex
    justify-content: center
    `

const InfoTable = styled.table`
    width: 300px
    height:50px   
    background: #A7F285
    border-radius: 7px;
    box-shadow: 4px 4px 1px 1px #888888;
    `
export default connect(mapStateToProps,{})(PlayingRoundCard)