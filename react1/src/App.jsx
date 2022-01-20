import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import MyCity from './maps/MyCity/index'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyCity />}></Route>
      </Routes>
    </Router>

  );
}


function MyCity() {
  return (
    <div>
      深入交通
    </div>
  )
}

export default App;
