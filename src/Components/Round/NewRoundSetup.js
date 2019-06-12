import React from 'react'
import {Route} from 'react-router-dom'
import NewRoundCourseSelect from './NewRoundCourseSelect'
import NewRoundConfig from './NewRoundConfig'



function NewRoundSetup(){

        return (
            <div>
                <Route exact path='/newround/' component={NewRoundCourseSelect}/>
                <Route path='/newround/step2' component={NewRoundConfig} />
                {/* <Route path='/newround/step3' component={StepThree} /> */}
            </div>
            )
    }

export default NewRoundSetup