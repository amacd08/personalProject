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
        <div style={page}>
          <Nav/>
            <PageContainer>
              {router}
              <Footer/>
            </PageContainer>
        </div>
      </HashRouter>
      
  );
}

const page = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
}
const PageContainer = styled.div`
    width: 100%;
    min-height: calc(100% - 125px);
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 125px;
    background: #FAFAFA;

    `
const Content = styled.div`
    width: 100%;
    `

export default App;
