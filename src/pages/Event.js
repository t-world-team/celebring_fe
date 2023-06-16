import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Avatar, Button, Popover, Rate } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, HeartFilled, EditOutlined, DeleteOutlined, ZoomInOutlined } from '@ant-design/icons';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { AfterWordList } from '../components/AfterwordItem';
import PanelItem from '../components/PanelItem';
import ShareBoxLineIcon from 'remixicon-react/ShareBoxLineIcon';
import More2FillIcon from 'remixicon-react/More2FillIcon';
import { useParams } from 'react-router-dom';

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const Event = (props) => {
    const params = useParams();
    const [event, setEvent] = useState();
    let writer = props.writer ? props.writer : true;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/events/detail/${params.id}`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) setEvent(data);
                console.log(data)
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="detail">
            <div className="detail-body">
                <div className="detail-profile">
                    <div className="detail-title">
                        <h3>{event?event.eventName : '이벤트명입니다.'}</h3>
                    </div>
                    <div className="detail-btn">
                        <Rate 
                            character={<HeartFilled />} 
                            count={1} 
                            defaultValue={0}
                            value={event&&event.liked}
                            style={{fontSize: 24, color: mainColor}}
                            onChange={(key) => { alert(key) }}
                        />
                        {writer ?
                        <Popover placement="bottomRight" content={
                            <React.Fragment>
                                <Button type="text"><EditOutlined/> 수정</Button>
                                <Button type="text"><DeleteOutlined/> 삭제</Button>
                            </React.Fragment>
                        } trigger="click">
                            <Button type="text" shape='circle' icon={<More2FillIcon/>}/>
                        </Popover>
                            : null
                        }
                    </div>
                </div>
                <div className="detail-event">
                    <p className="event-date"><CalendarOutlined/> {event?`${event.startDate} ~ ${event.endDate}` : '2023.11.01 ~ 2023.11.03'}</p>
                    <div className="event-location">
                        <span><EnvironmentOutlined/> {event? `${event.address}(${event.cafeName})`: '장소(카페상호명)'}</span>
                        <Button type="default"><ZoomInOutlined/> 지도 보기</Button>
                    </div>
                    <p><ClockCircleOutlined /> {event?event.openingTime : '09:00 ~ 20:00'}</p>
                </div>
                <div className="detail-contents">
                    {/* <PanelItem/> */}
                    { event && <TwitterTweetEmbed tweetId={event&&event.twitter} /> }
                </div>
                {/* <div className="detail-after">
                    <h4>후기를 입력하세요</h4>
                    <AfterWordList />
                </div> */}
            </div>
        </div>
    );
};

export default Event;