import React from 'react';

import { Avatar } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, TwitterOutlined } from '@ant-design/icons';
import { AfterWordList } from '../components/AfterwordItem';

const Event = (props) => {
    const url = props.url ? props.url : 'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg';
    let title = props.title ? props.title : '이벤트명입니다. 이벤트명입니다. 이벤트명입니다. 이벤트명입니다. ';
    let date = props.date ? props.date : '2023.11.01 ~ 2023.11.03';
    let location = props.location ? props.location : '장소(카페상호명)';

    return (
        <div className="detail">
            <div className="detail-header">
                <div className="header-image-centered">
                    <img src="https://pbs.twimg.com/media/FufPZXnWcAYo04i?format=jpg" alt="YookSungJae"/>
                </div>
            </div>
            <div className="detail-body">
                <div className="detail-profile">
                    <Avatar size={100} src={url}></Avatar>
                    <h3>{title}</h3>
                </div>
                <div className="detail-event">
                    <p className="event-date"><CalendarOutlined/> {date}</p>
                    <p className="event-location"><EnvironmentOutlined/> {location}</p>
                    <p className="event-location"><TwitterOutlined/> SNS 링크</p>
                </div>
                <div className="detail-contents">
                    <span>내용~~~~~~~~</span>
                </div>
                <div className="detail-after">
                    <h4>후기를 입력하세요</h4>
                    <AfterWordList />
                </div>
            </div>
        </div>
    );
};

export default Event;