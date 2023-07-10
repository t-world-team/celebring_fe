import React, { useContext, useEffect, useState } from 'react';

import { Button, FloatButton, message } from 'antd';
import TabItem from '../components/TabItem';
import EventItem from '../components/EventItem';
import { CelebAvatar } from '../components/CelebItem';
import { AfterWordList } from '../components/AfterwordItem';
import { AuthContext } from '../contexts/auth-context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AvatarSkeletonList, EventSkeletonList } from '../components/SkeletonItem';
import { CalendarOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const tabReg = [
    {
        key: 'regEvent',
        label: '이벤트',
        children: <EventItem/>,
    },
    {
        key: 'regAfterword',
        label: '후기',
        children: <AfterWordList/>
    },
];

const MyPage = (props) => {
    const auth = useContext(AuthContext);
    const name = props.name ? props.name : '홍길동';

    const [buttonToggle, setTabFav] = useState(true);

    function changeTabFav() {
        setTabFav(false);

    }
    function changeTabReg() {
        setTabFav(true);
    }

    const [celebLike, setCelebLike] = useState(1);
    const [favCelebList, setFavCelebList] = useState([]);
    const [celebLoad, setCelebLoad] = useState(false);

    const [eventLike, setEventLike] = useState(1);
    const [favEventList, setFavEventList] = useState([]);
    const [favEventLoad, setFavEventLoad] = useState(false);
    
    const [eventReg, setEventReg] = useState(1);
    const [regEventList, setRegEventList] = useState([]);
    const [regEventLoad, setRegEventLoad] = useState(false);

    let page = 0;
    let pageSize = 30;

    useEffect(() => {
        setCelebLoad(false);
        if(auth.token) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/celeb/favorite`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((response) => response.data)
            .then((data) => {
                if(data !== null) {
                    setFavCelebList(data);
                    console.log(data);
                    setCelebLoad(true);
                }
            })
            .catch((error) => {
                message.warning('오류가 발생했습니다.')
                setCelebLoad(true);
            });
        }
        setCelebLike(1);
    }, [auth, celebLike]);

    const dislikeCeleb = () => {
        setCelebLike(0);
    }

    useEffect(() => {
        setFavEventLoad(false);
        if(auth.token) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/events/favorite?page=${page}&size=${pageSize}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((response) => response.data)
            .then((data) => {
                if(data !== null) {
                    setFavEventList(data.content);
                    console.log(data.content);
                    setFavEventLoad(true);
                }
            })
            .catch((error) => {
                message.warning('오류가 발생했습니다.')
                setFavEventLoad(true);
            });
        }
        setEventLike(1);
    }, [auth, eventLike]);

    useEffect(() => {
        setRegEventLoad(false);
        if(auth.token) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/events/my?page=${page}&size=${pageSize}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((response) => response.data)
            .then((data) => {
                if(data !== null) {
                    setRegEventList(data.content);
                    console.log(data.content);
                    setRegEventLoad(true);
                }
            })
            .catch((error) => {
                message.warning('오류가 발생했습니다.')
                setRegEventLoad(true);
            });
        }
        setEventLike(1);
    }, [auth, eventLike]);

    const tabFav = [
        {
            key: 'favCeleb',
            label: '인물/그룹',
            children: 
                <div className="celeb-list-wrap">
                    <div className="celeb-items">
                        {favCelebList ?
                            celebLoad ? 
                                favCelebList.map(favCeleb => (
                                    <div className="celeb-item">
                                        <CelebAvatar
                                            url={favCeleb.profileImage}
                                            name={favCeleb.name}
                                            id={favCeleb.id}
                                            group={true}
                                            groupName={favCeleb.groupName}
                                            like={celebLike}
                                            useLike={true}
                                            likeCallback={dislikeCeleb}
                                        />
                                    </div>
                                )) : <AvatarSkeletonList count={6}/>
                            : null
                        }
                    </div>
                </div>,
        },
        {
            key: 'favEvent',
            label: '이벤트',
            children: 
                <div className="event-list-wrap">
                    <div className="event-items">
                        {favEventList ?
                            favEventLoad ? 
                                favEventList.map(item => (
                                    <EventItem 
                                        id =  {`${item.eventId}`}
                                        title = {`${item.eventName}`}
                                        date = {`${item.startDate}~${item.endDate}`}
                                        location = {`${item.address}(${item.cafeName})`}
                                        celebs = {`${item.celeb}`}
                                        thumbnail = {`${item.thumbnail[0]}`}
                                    />
                                )) : <EventSkeletonList count={4} />
                            : null
                        } 
                    </div>
                </div>
        },
    ];

    const tabReg = [
        {
            key: 'regEvent',
            label: '이벤트',
            children: 
                <div className="event-list-wrap">
                    <div className="event-items">
                        {regEventList ?
                            regEventLoad ? 
                                regEventList.map(item => (
                                    <EventItem 
                                        id =  {`${item.eventId}`}
                                        title = {`${item.eventName}`}
                                        date = {`${item.startDate}~${item.endDate}`}
                                        location = {`${item.address}(${item.cafeName})`}
                                        celebs = {`${item.celeb}`}
                                        thumbnail = {`${item.thumbnail[0]}`}
                                    />
                             )) : <EventSkeletonList count={6} />
                            : null
                        } 
                    </div>
                </div>
        },
        // {
        //     key: 'regAfterword',
        //     label: '후기',
        //     children: <AfterWordList/>
        // },
    ];

    return (
        <div className="mypage">
            <FloatButton.Group
                trigger="hover"
                type="primary"
                icon={<PlusOutlined/>}
                style={{position:'absolute'}}
            >
                <FloatButton icon={<Link to="/event/form"><CalendarOutlined /></Link>}/>
                <FloatButton icon={<Link to="/celeb/form"><UsergroupAddOutlined /></Link>}/>
            </FloatButton.Group>
            <div className="mypage-title">
                <p>안녕하세요.</p>
            </div>
            <div className="form-button">
                <Link to={'/'}>
                    <Button size='large' onClick={auth.logout} style={{width: '100%'}}>로그아웃</Button>
                </Link>
                {buttonToggle ? 
                    <Button size='large' onClick={changeTabFav}>등록한 이벤트</Button> :
                    <Button size='large' onClick={changeTabReg}>좋아요 목록</Button>
                }
            </div>
            {buttonToggle ?
                <React.Fragment>
                    <h3>좋아요 목록</h3>
                    <TabItem tabs={tabFav}/>
                </React.Fragment> :
                <React.Fragment>
                    <h3>등록한 이벤트</h3>
                    <TabItem tabs={tabReg}/>
                </React.Fragment>
            }
        </div>
    );
};

export default MyPage;