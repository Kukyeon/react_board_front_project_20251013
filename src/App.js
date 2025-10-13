
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Board from './pages/Board';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/board' element={<Board />}></Route>
        <Route path='/board/write' element={<BoardWrite />}></Route>
        <Route path='/board/:id' element={<BoardDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
