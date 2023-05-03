import React from 'react';
import { Rate } from 'antd';
import { HeartFilled, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

const EventItem = (props) => {
    let thumbnail = props.thumbnail ? props.thumbnail : 'https://pbs.twimg.com/media/FvFhOr5aYAAA88w?format=jpg';
    let title = props.title ? props.title : '이벤트명입니다. 생일카페 이벤트명입니다.';
    let date = props.date ? props.date : '23.11.01 ~ 23.11.03';
    let location = props.location ? props.location : '장소(카페상호명)';
    let useHeart = props.useHeart ? props.useHeart : false;
    let heart = props.heart ? props.heart : 1;

    return (
        <div className="event-component">
            <Link to={'/event'}>
                <div className="event-image">
                    <img src={thumbnail} alt="thumbnail"/>
                </div>
                <div className="event-content">
                    <span className="event-title">{title}</span>
                    <p className="event-date"><CalendarOutlined/> {date}</p>
                    <p className="event-location"><EnvironmentOutlined/> {location}</p>
                </div>
            </Link>
            {useHeart ?
                <div className="event-like">
                    <Rate 
                        character={<HeartFilled />} 
                        count={1} 
                        defaultValue={heart}
                    />
                </div>
            : null}
        </div>
    );
};

export default EventItem;