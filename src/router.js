import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import CourseList from './Components/Courses/CourseList'


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/courses' component={CourseList} />
    </Switch>
)
