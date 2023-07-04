import React, { useState } from 'react';

import { ConfigProvider, Calendar, Button, Badge } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import locale from "antd/locale/ko_KR";
import 'dayjs/locale/ko';
import Cake2LineIcon from 'remixicon-react/Cake2LineIcon';
import EventItem from './EventItem';

const eventDateList = 
[
    {
        date: '2023-07-12',
        count: 2
    },
    {
        date: '2023-07-07',
        count: 4
    }
]

const eventList = {
    date: '2023-03-07',
    events: [
        {
            title: '임현식 생일카페1',
            date: '2023-03-07',
            location: 'space',
        },
        {
            title: '임현식 생일카페2',
            date: '2023-03-07',
            location: 'space2',
        },
    ]
};

const CalendarItem = (props) => {
    const today = new Date();
    const initDate = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월';
    const [dateTitle, setDateTitle] = useState(initDate);

    const anniversary = props.anniversary ? props.anniversary : '2023-01-01';

    const eventArea = null;
    const [events, setEventArea] = useState(eventArea);

    function changeDateTitle(dayjs) {
        setDateTitle(dayjs.year() + '년 ' + (dayjs.month()+1) + '월');
    }

    function updateEvents(dayjs) {
        let calDate = dayjs.year() + '-' + (dayjs.month() < 9 ? '0' : '') + (dayjs.month()+1) + '-' + (dayjs.date() < 10 ? '0' : '') + dayjs.date();
        let badge;
        let anniv;

        eventDateList.map(event => {
            if(event.date == calDate) {
                badge = <Badge color='green' count={event.count}/>;
            }
        })
        if(dayjs.year() + '-' + anniversary === calDate) {
            anniv = <Cake2LineIcon style={{fontSize: 32, position: 'absolute', bottom: 10, right: 0}}/>;
        }

        return (
            <React.Fragment>
                {anniv ? anniv : null}
                {badge ? badge : null}
            </React.Fragment>
        );
    }

    function showEvents(dayjs){
        let selectDate = dayjs.year() + '-' + (dayjs.month() < 9 ? '0' : '') + (dayjs.month()+1) + '-' + (dayjs.date() < 10 ? '0' : '') + dayjs.date();
        
        if(selectDate === eventList.date)
        setEventArea(
            <React.Fragment>
                <h4>{selectDate}</h4>
                {eventList.events.map(event => <EventItem title={event.title} date={event.date} location={event.location}/>)}
            </React.Fragment>
        ); else {
            setEventArea(null);
        }
    }

    return (
        <div className="event-calendar">
            <ConfigProvider locale={locale}
                theme={{token:{lineHeightSM: 0.3, lineHeightLG: 2}}}>
                <Calendar 
                    mode='month' 
                    onPanelChange={changeDateTitle}
                    onSelect={showEvents}
                    cellRender={(current) => updateEvents(current)}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                    let change = value.clone();
                    const date = change.$d;

                    return (
                        <div className="calendar-title">
                            <Button type="text" shape="circle" icon={<LeftOutlined/>}
                                onClick={() => {
                                    const changeDate = new Date(date.setMonth(date.getMonth() - 1));
                                    change = change.year(changeDate.getFullYear());
                                    change = change.month(changeDate.getMonth())
                                    onChange(change);
                                    changeDateTitle(change);
                                }}
                            />
                            <h3>{dateTitle}</h3>
                            <Button type="text" shape="circle" icon={<RightOutlined/>}
                                onClick={() => {
                                    const changeDate = new Date(date.setMonth(date.getMonth() + 1));
                                    change = change.year(changeDate.getFullYear());
                                    change = change.month(changeDate.getMonth())
                                    onChange(change);
                                    changeDateTitle(change);
                                }}
                            />
                        </div>
                    )
                }}/>
                <div className="event-list">
                    {events}
                </div>
            </ConfigProvider>
        </div>
    );
};

export default CalendarItem;