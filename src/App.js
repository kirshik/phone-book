import './App.css';
import UserContext from './context/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import ContactList from './components/ContactList';
import { useMemo } from 'react';
import Home from './components/pages/Home';


function App() {


  return (
    <div className="App" >
      <UserContext.Provider value={useMemo(() => ([]), [])}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>

    </div >
  );
}

export default App;
