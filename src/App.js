import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router , Route , Routes, Link} from 'react-router-dom';
import Login from './components/login/login.tsx';

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route exact path='/' element={<>Home</>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
