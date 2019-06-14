import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import CourseList from './Components/Courses/CourseList'
import NewCourse from './Components/Courses/NewCourse'
import NewRoundSetup from '../src/Components/Round/NewRoundSetup'
import PlayingRound from './Components/Round/PlayingRound'
import CompletedRound from './Components/Round/CompletedRound'



export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/courses' component={CourseList} />
        <Route path='/newcourse' component={NewCourse} />
        <Route path='/newround' component={NewRoundSetup} />
        <Route path='/playinground' component={PlayingRound} />
        <Route path='/completedround' component={CompletedRound} />

    </Switch>
)
