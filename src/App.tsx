import './App.scss';

import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" Component={HomePage} />
      </Routes>
    </>
  );
};

export default App;
