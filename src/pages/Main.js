import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Swiper from "../components/SwiperItem";
import { CelebSwiper } from '../components/CelebItem';
import EventItem from '../components/EventItem';
import { AvatarSkeletonList, EventSkeleton } from '../components/SkeletonItem';
import { AuthContext } from '../contexts/auth-context';
import { LoadingContext } from '../contexts/loading-context';
import { message } from 'antd';

const Main = () => {
    const auth = useContext(AuthContext);
    const loading = useContext(LoadingContext);
    const [isLoad, setIsLoad] = useState(false);
    const [eventList, setEventList] = useState();

    const getEvent = (key) => {
        return eventList[key];
    }

    useEffect(() => {
        setIsLoad(false);
        axios.get(`${process.env.REACT_APP_API_URL}/events?page=0`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) setEventList(data.content)
            })
            .catch((error) => console.log(error));  

        setIsLoad(true);
    }, []);

    const [celebList, setCelebList] = useState([]);
    const [celebLoad, setCelebLoad] = useState(false);

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
                    setCelebList(data);
                }
                setCelebLoad(true);
            })
            .catch((error) => {
                message.warning('오류가 발생했습니다.')
                setCelebLoad(true);
            });
        } else {
            setCelebLoad(true);
        }
    }, []);

    useEffect(() => {
        loading.showLoading(true);
        if(isLoad && celebLoad) {
            loading.showLoading(false);
        }
    }, [isLoad, celebLoad]);

    return (
        <React.Fragment>
            <Swiper/>
            <div className="list-celeb">
                <h3>타이틀을 입력하세요</h3>
                { !auth.isLoggedIn || celebLoad ?
                    <CelebSwiper list={auth.isLoggedIn ? celebList : null}/>
                : <AvatarSkeletonList count={3}/>
                }
            </div>
            <div className="list-event">
                <h3>지금 뜨는 이벤트</h3>
                { isLoad ? 
                <>
                    { eventList ? Object.keys(eventList).map((key) => {
                        return (
                            <EventItem 
                                id =  {`${getEvent(key).eventId}`}
                                title = {`${getEvent(key).eventName}`}
                                date = {`${getEvent(key).startDate}~${getEvent(key).endDate}`}
                                location = {`${getEvent(key).address}(${getEvent(key).cafeName})`}
                                celebs = {`${getEvent(key).celeb}`}
                                thumbnail = {`${getEvent(key).thumbnail[0]}`}
                            />
                        )
                    }) : <div>이벤트가 존재하지 않습니다.</div>}
                </> : <EventSkeleton /> }
            </div>
        </React.Fragment>
    );
};

export default Main;