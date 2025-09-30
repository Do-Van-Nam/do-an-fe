import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Home from './pages/Home/Home'
import Marketplace from './pages/Marketplace'
import Favourite from './pages/Favourite'
import Rooms from './pages/Rooms/Rooms'
import Problems from './pages/Problems/Problems'
import Statistics from './pages/Statistics/Statistics'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Checklist from './pages/Checklist';
import Message from './pages/Message';
import Budget from './pages/Budget';
import Guests from './pages/Guests';

import api from './api';
import PrivateRoute from './PrivateRoute';

import AppProvider from './AppContext';
import { AppContext } from './AppContext';

function App() {
  const location = useLocation()
  
  return (
    <AppProvider>
      {location.pathname !== '/' && <Header />}
      <Routes >
        <Route path='/' element={<LoginRegister />} />
          <Route path='/home' element={<Home />} />
          <Route path='/manager/rooms' element={<Rooms />} />
          <Route path='/manager/problems' element={<Problems />} />
          <Route path='/manager/statistics' element={<Statistics />} />
          <Route path='/marketplace/*' element={<Marketplace />} />
          <Route path='/checklist' element={<Checklist/>} />
          <Route path='/favourite' element={<Favourite/>} />
          <Route path='/chat' element={<Message/>} />
          <Route path='/guests' element={<Guests/>} />
          <Route path='/budget' element={<Budget/>} />
    

      </Routes>
    </AppProvider>
  );
}

export default App;
