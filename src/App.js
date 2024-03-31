import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Demo from './components/Demo';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
