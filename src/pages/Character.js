import React, { useState } from 'react';
import EventItem from '../components/EventItem';

import { Button } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CalendarItem from '../components/CalendarItem';

const Character = (props) => {
    const [viewList, setViewList] = useState(true);
    return (
        <div className="detail">
            <div className="detail-header">
                <div className="header-image-centered">
                    <img src="https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg" alt="YookSungJae"/>
                </div>
            </div>
            <div className="detail-events">
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