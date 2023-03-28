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
        
        <footer>
           <Footer />
        </footer>
    </body>
   
   {/* <ThemeProvider theme={Theme}>
            <Grid
                container sx={{
                spacing: 0,
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Login></Login>
            </Grid>
            <LoginFooter></LoginFooter>
        </ThemeProvider> */}
   

    
    </>
  )
}

export default App
