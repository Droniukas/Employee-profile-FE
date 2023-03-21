import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='app'>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
};

export default App;
