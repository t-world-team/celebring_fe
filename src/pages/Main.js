import React from 'react';

import Swiper from "../components/SwiperItem";
import { CelebList } from '../components/CelebItem';
import EventItem from '../components/EventItem';

const Main = () => {
    return (
        <React.Fragment>
            <Swiper/>
            <div className="list-celeb">
                <h3>타이틀을 입력하세요</h3>
                <CelebList/>
            </div>
            <div className="list-event">
                <h3>타이틀을 입력하세요</h3>
                <EventItem/>
                <EventItem/>
                <EventItem/>
                <EventItem/>
            </div>
        </React.Fragment>
    );
};

export default Main;