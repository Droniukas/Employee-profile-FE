import React from 'react'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import './App.scss'
import { yellow } from '@mui/material/colors'

function App() {
  return (
    <>
    <body>
        <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' className='img'></img>
        <main>
          <Header />
          <Main />
        </main>
        
        {/* <div style={{position:'absolute', height: '100px', bottom: 0, backgroundColor: 'yellow'}}></div> */}
        <footer>
           <Footer />
        </footer>
    </body>
   
    
    </>
  )
}

export default App
