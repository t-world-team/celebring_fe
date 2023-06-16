import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Swiper from "../components/SwiperItem";
import { CelebList, CelebSwiper } from '../components/CelebItem';
import EventItem from '../components/EventItem';
import { EventSkeleton } from '../components/SkeletonItem';
import { useParams } from 'react-router-dom';

const Main = () => {
    const [isLoad, setIsLoad] = useState(false);
    const [eventList, setEventList] = useState();

    const getEvent = (key) => {
        return eventList[key];
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/events?page=0`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) setEventList(data.content)
            })
            .catch((error) => console.log(error));  

        setIsLoad(true);
    }, []);

    return (
        <React.Fragment>
            <Swiper/>
            <div className="list-celeb">
                <h3>타이틀을 입력하세요</h3>
                <CelebSwiper/>
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
                            />
                        )
                    }) : <div>이벤트가 존재하지 않습니다.</div>}
                </> : <EventSkeleton /> }
            </div>
        </React.Fragment>
    );
};

export default Main;