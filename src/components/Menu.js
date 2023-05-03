import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { MenuOutlined, CloseOutlined, SmileOutlined, SearchOutlined, CalendarOutlined, CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const logo = process.env.PUBLIC_URL + '/celebring.png';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="logo">
        <Link to={'/main'}>
          <img src={logo} alt="logo" onClick={onClick}/>
        </Link>
      </div>
      {open ? 
        <Button type="text" shape="circle" icon={<CloseOutlined/>} onClick={onClose}/> :
        <Button type="text" shape="circle" icon={<MenuOutlined/>} onClick={showDrawer}/>
      }
      <Drawer 
        title="Basic Drawer" 
        placement="top" 
        onClose={onClose} 
        open={open}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className="login-list">
          <h2 style={{marginLeft: 15, display: 'inline-block', marginBottom: 30}}>로그인</h2>
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
          <Button type="text" block size="large" style={{textAlign: 'left'}}><SearchOutlined/> 검색</Button>
          <Button type="text" block size="large" style={{textAlign: 'left'}}><CarryOutOutlined/> 이벤트</Button>
          <Link to="/mypage">
            <Button type="text" block size="large" style={{textAlign: 'left'}} onClick={onClose}><UserOutlined/> 마이페이지</Button>
          </Link>
        </div>
      </Drawer>
    </>
  );
};
export default Menu;