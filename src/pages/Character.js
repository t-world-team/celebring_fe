import React, { useState } from 'react';
import EventItem from '../components/EventItem';

import { Button, Carousel } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CalendarItem from '../components/CalendarItem';
import { useParams } from 'react-router-dom';
import { CelebSwiper } from '../components/CelebItem';

const Character = (props) => {
    const [viewList, setViewList] = useState(true);
    const params = useParams();
    const group = params.id === 'btob' ? true : false;

    return (
        <div className="detail">
            <div className="detail-header">
                <div className="header-image-centered">
                    <Carousel>
                        <img src="https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg" alt="YookSungJae"/>
                        <img src="https://pbs.twimg.com/media/FufOmIxWIAA_dNm?format=jpg" alt="SeoEunKwang"/>
                        <img src="https://pbs.twimg.com/media/FufO8USX0AItfEw?format=jpg" alt="LeeChangSub"/>
                    </Carousel>
                </div>
            </div>
            <div className="detail-events">
                {group && <div className="detail-members"><CelebSwiper addPlus={false}/></div>}
                <div className="detail-title">
                    <h2>(그룹명) 이벤트 리스트</h2>
                    <div className="button-group">
                        <Button type="text" shape="circle" icon={<UnorderedListOutlined/>}
                            onClick={() => setViewList(true)} />
                        <Button type="text" shape="circle" icon={<CalendarOutlined/>}
                            onClick={() => setViewList(false)} />
                    </div>
                </div>
                {viewList ? 
                    <React.Fragment>
                        <EventItem/>
                        <EventItem/>
                        <EventItem/>
                        <EventItem/>
                    </React.Fragment> :
                    <React.Fragment>
                        <CalendarItem/>
                    </React.Fragment>
                }
            </div>
        </div>
    );
};

export default Character;