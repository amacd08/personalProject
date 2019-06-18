import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import router from './router.js'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import styled from 'styled-components'

function App() {
  return (
      <HashRouter>
        <body style={body}>
          <Nav/>
            <PageContainer>
              {router}
              <Footer/>
            </PageContainer>
        </body>

        
      </HashRouter>
      
  );
}

const body = {
    position: 'relative',
    width: '100vw',
    height: '100vh'  
}
const PageContainer = styled.body`
    width: 100%;
    min-height: calc(100% - 125px);
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    background: #FAFAFA;
    padding-top: 125px;
    `
const Content = styled.div`
    width: 100%;
    `

export default App;
