import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import "./styles/style.scss";

import Main from './pages/Main';
import Character from './pages/Character';
import Event from './pages/Event';
import EventForm from './pages/EventForm';
import MyPage from './pages/MyPage';
import { LoginPage } from './pages/Login';
import Celeb from './pages/Celeb';
import Layout from './pages/Layout';
import { AuthContext } from './contexts/auth-context';
import { useAuth } from './hooks/login-hook';

function App() {
  let location = useLocation();
  let backgroundLocation = location.state?.backgroundLocation;
  const { token, login, logout} = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path="/celeb" element={<Celeb/>} />
          <Route path="/character/:id" element={<Character/>} />
          <Route path="/event/:id" element={<Event/>} />
          <Route path="/event/form" element={<EventForm/>} />
          <Route path="/mypage" element={<MyPage/>} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
