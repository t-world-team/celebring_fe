import React from 'react';

import { Avatar, Button, Popover, Rate } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, TwitterOutlined, ShareAltOutlined, HeartFilled, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AfterWordList } from '../components/AfterwordItem';
import PanelItem from '../components/PanelItem';

const Event = (props) => {
    const url = props.url ? props.url : 'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg';
    let title = props.title ? props.title : '이벤트명입니다. 이벤트명입니다. 이벤트명입니다. 이벤트명입니다. ';
    let date = props.date ? props.date : '2023.11.01 ~ 2023.11.03';
    let location = props.location ? props.location : '장소(카페상호명)';
    let writer = props.writer ? props.writer : true;

    return (
        <div className="detail">
            <div className="detail-icon">
                <Button type="text" size='large' shape="circle"><ShareAltOutlined/></Button>
                <Rate 
                    character={<HeartFilled />} 
                    count={1} 
                    defaultValue={0}
                    style={{fontSize: 24, color: 'red'}}
                />
            </div>
            <div className="detail-header">
                <div className="header-image-centered">
                    <img src="https://pbs.twimg.com/media/FufPZXnWcAYo04i?format=jpg" alt="YookSungJae"/>
                </div>
            </div>
            <div className="detail-body">
                <div className="detail-profile">
                    <Avatar size={100} src={url}></Avatar>
                    <div className="detail-title">
                        <h3>{title}</h3>
                        {writer ?
                        <Popover placement="bottomRight" content={
                            <React.Fragment>
                                <Button type="text"><EditOutlined/> 수정</Button>
                                <Button type="text"><DeleteOutlined/> 삭제</Button>
                            </React.Fragment>
                        } trigger="click">
                            <Button type="text" shape='circle'><MoreOutlined/></Button>
                        </Popover>
                            : null
                        }
                    </div>
                </div>
                <div className="detail-event">
                    <p className="event-date"><CalendarOutlined/> {date}</p>
                    <p className="event-location"><EnvironmentOutlined/> {location}</p>
                    <p className="event-location"><TwitterOutlined/> SNS 링크</p>
                </div>
                <div className="detail-contents">
                    <PanelItem/>
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