import React from 'react';

import { Button, Drawer, Input, Modal } from 'antd';
import { useState } from 'react';
import { MenuOutlined, CloseOutlined, SmileOutlined, SearchOutlined, CalendarOutlined, CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CelebFav } from './CelebItem';
import { LoginPage } from '../pages/Login';

const logo = process.env.PUBLIC_URL + '/celebring.png';

const Menu = () => {
  const [menuOpen, setOpenMenu] = useState(false);
  const [searchOpen, setOpenSearch] = useState(false);
  
  const showMenu = () => {
    setOpenMenu(true);
    setOpenSearch(false);
  };
  const showSearch = () => {
    setOpenSearch(true);
    setOpenMenu(false);
  };
  const onClose = () => {
    setOpenMenu(false);
    setOpenSearch(false);
  };

  
  const [loginOpen, setLoginOpen] = useState(false);

  const loginPopup = () => {
    setOpenMenu(false);
    setLoginOpen(true);
  }

  return (
    <>
      <div className="logo">
        <Link to={'/main'}>
          <img src={logo} alt="logo" onClick={onClose}/>
        </Link>
      </div>
      <div className="header-icon">
        {menuOpen ? 
          <Button type="text" shape="circle" icon={<CloseOutlined/>} onClick={onClose}/> :
          <React.Fragment>
            <Button type="text" shape="circle" icon={<SearchOutlined/>} onClick={showSearch}/>
            <Button type="text" shape="circle" icon={<MenuOutlined/>} onClick={showMenu}/>
          </React.Fragment>
        }
      </div>
      <Drawer 
        placement="top" 
        onClose={onClose} 
        open={menuOpen}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className="login-list">
          <h2 onClick={loginPopup} style={{marginLeft: 15, display: 'inline-block', marginBottom: 30}}>로그인</h2>
          <Modal
            centered
            open={loginOpen}
            onCancel={() => setLoginOpen(false)}
            footer={null}
            className="login-popup-wrap"
          >
            <LoginPage/>
          </Modal>
        </div>
        <div className="menu-list">
          <div className="button-list">
            <Link to="/event/form">
              <Button block size="large" onClick={onClose}><CalendarOutlined/> 이벤트 등록</Button>
            </Link>
            <Link to="/event/form">
              <Button block size="large" onClick={onClose}><SmileOutlined/> 인물/그룹 등록</Button>
            </Link>
          </div>
          <Button type="text" block size="large" style={{textAlign: 'left'}} onClick={showSearch}><SearchOutlined/> 검색</Button>
          <Button type="text" block size="large" style={{textAlign: 'left'}}><CarryOutOutlined/> 이벤트</Button>
          <Link to="/mypage">
            <Button type="text" block size="large" style={{textAlign: 'left'}} onClick={onClose}><UserOutlined/> 마이페이지</Button>
          </Link>
        </div>
      </Drawer>
      
      <Drawer 
        placement="top" 
        onClose={onClose} 
        open={searchOpen}
        bodyStyle={{
          padding: 0,
        }}
        height={'auto'}
      >
        <div className="search">
          <div className="search-input">
            <Input placeholder='검색어를 입력하세요' bordered={false} suffix={<CloseOutlined/>}/>
          </div>
          <div className="search-result">
            <h3>인물</h3>
            <CelebFav name="서은광" thumbnail="https://pbs.twimg.com/media/FufOnvXWwAMb80-?format=jpg" onClick={onClose}/>
            <CelebFav name="육성재" thumbnail="https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg" onClick={onClose}/>
            <h3>그룹</h3>
            <CelebFav name="비투비" onClick={onClose}/>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Menu;