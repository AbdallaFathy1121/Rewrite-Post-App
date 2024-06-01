import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Login from './components/Login/login.jsx';
import Layout from './Pages/layout.jsx';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Layout />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
    </Router>
  );
};

export default App;
