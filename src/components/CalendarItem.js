import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ConfigProvider, Calendar, Button, Badge } from 'antd';
import { useParams } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import locale from "antd/locale/ko_KR";
import 'dayjs/locale/ko';
import Cake2LineIcon from 'remixicon-react/Cake2LineIcon';
import EventItem from './EventItem';
import { EventSkeletonList } from '../components/SkeletonItem';

const CalendarItem = (props) => {
    const today = new Date();
    const initDate = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월';
    const [dateTitle, setDateTitle] = useState(initDate);
    const params = useParams();

    const anniversary = props.anniversary ? props.anniversary : '2023-01-01';

    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [eventDateList, setEventDateList] = useState();
    const [eventList, setEventList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [isEventLoad, setIsEventLoad] = useState(false);

    let page = 0;
    let pageSize = 10;

    function changeDateTitle(dayjs) {
        let calDate = dayjs.year() + '-' + (dayjs.month() < 9 ? '0' : '') + (dayjs.month()+1);
        setDateTitle(dayjs.year() + '년 ' + (dayjs.month()+1) + '월');
        setMonth(calDate);
    }

    function updateEvents(dayjs) {
        let calDate = dayjs.year() + '-' + (dayjs.month() < 9 ? '0' : '') + (dayjs.month()+1) + '-' + (dayjs.date() < 10 ? '0' : '') + dayjs.date();
        let badge;
        let anniv;

        if (eventDateList) {
            eventDateList.map(event => {
                if(event.day == calDate) {
                    badge = <Badge color='green' count={event.count}/>;
                }
            })
        }
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
        let search = dayjs ? dayjs.year() + '-' + (dayjs.month() < 9 ? '0' : '') + (dayjs.month()+1) + '-' + (dayjs.date() < 10 ? '0' : '') + dayjs.date()
                        : today.getFullYear() + '-' + ('0'+ (today.getMonth() + 1)).slice(-2) + '-' + ('0'+ today.getDate()).slice(-2) ;

        setIsEventLoad(false);
        setDay(search);
        axios.get(`${process.env.REACT_APP_API_URL}/events/${params.id}/calendar?day=${search}&type=day&page=${page}&size=${pageSize}`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) {
                    setEventList(data.content);
                    setIsEventLoad(true);
                    
                } else {
                    setEventList([]);
                    setIsEventLoad(true);
                }
            })
            .catch((error) => {
                console.log(error)
            });  
    }

    useEffect(() => {
        setIsLoad(false);
        let search = month ? month : today.getFullYear() + '-' + ('0'+ (today.getMonth() + 1)).slice(-2);
        axios.get(`${process.env.REACT_APP_API_URL}/events/${params.id}/calendar?day=${search}&type=month&page=${page}`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) {
                    setEventDateList(data);
                } else {
                    setEventDateList([])
                }
                setIsLoad(true);
                showEvents();
            })
            .catch((error) => {
                console.log(error)
                setIsLoad(true);
            });
    }, [params.id, month]);

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
                    <h4>{day}</h4>
                    {eventList ?
                            isEventLoad ? 
                                eventList.map(item => (
                                    <EventItem 
                                        id =  {`${item.eventId}`}
                                        title = {`${item.eventName}`}
                                        date = {`${item.startDate}~${item.endDate}`}
                                        location = {`${item.address}(${item.cafeName})`}
                                        celebs = {`${item.celeb}`}
                                        thumbnail = {`${item.thumbnail[0]}`}
                                    />)) : <></>
                                : <EventSkeletonList count={2} />
                            } 
                </div>
            </ConfigProvider>
        </div>
    );
};

export default CalendarItem;