import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {clearUser} from '../redux/userReducer'
import {connect} from 'react-redux'
import Axios from 'axios';
import styled from 'styled-components'



class Nav extends Component{
    constructor() {
        super()
        this.state ={
            displayLinks: false
        }
    }

    navBar = () => {
        this.setState({
            displayLinks: !this.state.displayLinks
        })
    }


    logOut = () => {
        this.props.clearUser()
        Axios.get('/user/logout').then(()=>console.log('user logged out')).catch(err => console.log(err))
    }


    render() {
        return(
        <>
            <NavHeader>
                <LogoBox>
                   <DesktopLogoBox>
                       <LogoText>The Golfer Network</LogoText>
                   </DesktopLogoBox>
                           {this.props.user.loggedIn ?
                                <SmallMobileLogoBox>
                                   <MobileLogoText>TGN</MobileLogoText>
                                </SmallMobileLogoBox>
    
                            :
                                <BigMobileLogoBox>
                                    <BigMobileLogo>The Golfer Network</BigMobileLogo>
                                </BigMobileLogoBox>
                           }
                </LogoBox>
              <ContainerBox>
                      {this.props.user.loggedIn &&
                      <>
                        <Link to='/newround' style={noTextDecoration}><NewRound>New Round</NewRound></Link> 
                        <NewRound onClick={this.navBar}>?</NewRound>
                      </>
                      }
              </ContainerBox>
            </NavHeader>
                    {this.state.displayLinks ?
                        <LinkHeader>
                            <NavBox>
                                    <Link to='/' style={noTextDecoration}><NavLink><h3>Home</h3></NavLink></Link>
                                    <Link to='/courses' style={noTextDecoration}><NavLink><h3>Courses</h3></NavLink></Link>
                                    <Link to='/login' style={noTextDecoration}><NavLink onClick={this.logOut}><h3>Logout</h3></NavLink></Link>
                            </NavBox>
                        </LinkHeader>
                            :  
                              <></>
                        }
        </>
    
        )
    }
} 

function mapStateToProps(state) {
    return {user: state.user}
  }

const NavHeader = styled.nav`
    position: absolute;
    top: 0;
    background: #FAFAFA;
    height: 125px;
    width: 100%;
    display: flex;
    justify-context: space-around;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    `

const LogoBox = styled.div`
    margin-left: 10px;
    width: 60%;
    min-width: 40%
    height: 100%;
    display: flex;
    justify-content: center;
    `
    
const DesktopLogoBox = styled.div`
    margin-top: 25px;
    border-radius: 10px;
    background: #A7F285;
    width: 75%
    min-width: 500px;
    height: 60%
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 4px 1px 1px #888888;
    @media (max-width: 850px) {
        display: none;
        min-width: 200px;
      }
    `
    
const LogoText = styled.h1`
    margin: 0px;
    color: #4B5043;
    font-family: sans-serif;
    font-size: 3em;
    align-items: center;
    
    @media (max-width: 850px) {
        display: none;
        min-width: 200px;
      }
    `

const SmallMobileLogoBox = styled.div`
    border-radius: 10px;
    background: #A7F285;
    width: 50%
    min-width: 150px;
    height: 60%
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 4px 1px 1px #888888;
    @media (min-width: 850px) {
        display: none;
      }
    `
const MobileLogoText = styled.h1`
    margin: 0px;
    color: black;
    font-family: sans-serif;
    font-size: 3em;
    @media (min-width: 850px) {
        display: none;
      }
    `

const BigMobileLogoBox = styled.div`
    border-radius: 10px;
    background: #A7F285;
    width: 80%
    min-width: 300px;
    height: 60%
    margin-top: 25px;
    margin-left: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 4px 1px 1px #888888;
    @media (min-width: 850px) {
        display: none;
      }
    `
const BigMobileLogo = styled.h1`
    font-family: sans-serif;
    font-size: 2em;
    font-weight: bold;
    @media (min-width: 850px) {
        display: none;
      }
    `

const NewRound = styled.div`
    margin: 0px;
    font-family: sans-serif;
    font-size: 1.25em;
    font-weight: bold;
    background: white;
    width: 125px;
    height: 75px;
    display: flex;
    background: #A7F285;
    color: black;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-right: 10px;
    box-shadow: 4px 4px 1px 1px #888888;
    @media (max-width: 850px) {
        width: 100px;
      }
    @media (max-width: 750px) {
        width: 85px;
    }
    @media (max-width: 550px) {
        width: 75px;
    }
    `
const ContainerBox = styled.div`
    display: flex;
    justify-content: space-around;
    `

const LinkHeader = styled.div`
    position: relative;
    top:125px;
    width:100%
    display: flex;
    justify-content: center;
   `
const NavBox = styled.div`
   width: 50%;
   display: flex;
   justify-content: space-around;
   align-items: center;
   background: #A7F285;
   box-shadow: 4px 4px 1px 1px #888888;
   border-radius: 7px;
   @media (max-width: 850px) {
    width: 90%;
   }
   `


const NavLink = styled.div` 
    width: 100px;
    margin-left: 15px;
    display: flex;
    color: black;
    justify-content: center;
    `

const noTextDecoration = {
    textDecoration: 'none'
}
   export default connect(mapStateToProps,{clearUser})(Nav)