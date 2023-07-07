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
import { useLoading } from './hooks/loading-hook';
import { LoadingContext } from './contexts/loading-context';
import CelebForm from './pages/CelebForm';

const loadingImg = process.env.PUBLIC_URL + '/loading.svg';

function App() {
  let location = useLocation();
  let backgroundLocation = location.state?.backgroundLocation;
  const { token, login, logout} = useAuth();
  const { loadingVisible, showLoading } = useLoading();

  return (
    <LoadingContext.Provider
      value={{
        visible: loadingVisible,
        showLoading: showLoading,
      }} >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        {loadingVisible &&
          <div className="loading-wrap">
            <div className="loading-item">
              <img src={loadingImg} alt="loading"/>
            </div>
          </div>
        }
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path="/celeb" element={<Celeb/>} />
            <Route path="/celeb/form" element={<CelebForm/>} />
            <Route path="/character/:id" element={<Character/>} />
            <Route path="/event/:id" element={<Event/>} />
            <Route path="/event/form" element={<EventForm/>} />
            <Route path="/event/form/:id" element={<EventForm/>} />
            <Route path="/mypage" element={<MyPage/>} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
