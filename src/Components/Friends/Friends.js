import React, {Component} from 'react'
import {connect} from 'react-redux'


class Friends extends Component {
    constructor() {
        super()
        this.state= {
            friendList = []

        }
    }

    componentDidMount() {
        axios
            .get('/user/getFriends')
            .then(res => {
                this.setState({
                    friendList: res.data
                })

            })
    }

    render() {
         let friendsRendered = this.state.friendList.map((friend,i) => {
             return (
                 <Friend 
                     friend={friend}
                     key={i} />
             )
         })
        return(
            <div>
                <h2> Friend List </h2>
                {friendsRendered}
            </div>

        )
    }
}

function mapStateToProps(state) {
    user: state.user
}

export default connect(mapStateToProps,{})(Friends)