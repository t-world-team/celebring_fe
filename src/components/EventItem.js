import React from 'react';
import { Rate, Card } from 'antd';
import { HeartFilled, EnvironmentOutlined, CalendarOutlined, SmileOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { Meta } = Card;

const EventItem = (props) => {
    let thumbnail = props.thumbnail ? props.thumbnail : '/no_image.png';
    let id = props.id ? props.id : 1;
    let title = props.title ? props.title : '이벤트명입니다. 생일카페 이벤트명입니다.';
    let date = props.date ? props.date : '23.11.01 ~ 23.11.03';
    let location = props.location ? props.location : '장소(카페상호명)';
    let celebs = props.celebs ? props.celebs : ['서은광(비투비)', '이민혁(비투비)'];

    return (
        <Link to={`/event/${id}`}> 
            <div className="event-component">
                <Card
                    hoverable 
                    style={{ width: '100%' }}
                >
                <Meta
                    title={title}
                    description={
                    <Link to={`/event/${id}`}> 
                        <div className="event-content">
                            <p className="event-date"><CalendarOutlined/> {date}</p>
                            <p className="event-location"><EnvironmentOutlined/> {location}</p>
                            <p className="event-celeb"><SmileOutlined /> {String(celebs)}</p>
                        </div>
                        <div className="event-image">
                            <img src={thumbnail} alt="thumbnail"/>
                        </div>
                    </Link>
                    }
                    />
                </Card>
            </div>
        </Link>
        
    );
};

export default EventItem;