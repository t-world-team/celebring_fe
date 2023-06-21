import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventItem from '../components/EventItem';

import { Button, Carousel, message } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CalendarItem from '../components/CalendarItem';
import { useParams } from 'react-router-dom';
import { CelebSwiper } from '../components/CelebItem';
import { EventSkeleton } from '../components/SkeletonItem';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

const Character = (props) => {
    const auth = useContext(AuthContext);
    const [isLoad, setIsLoad] = useState(false);
    const [viewList, setViewList] = useState(true);
    const [eventList, setEventList] = useState();
    const params = useParams();
    const [group, setGroup] = useState(false);
    const [subCelebList, setSubCelebList] = useState([]);
    const header = auth.isLoggedIn ? {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    } : null;

    const getEvent = (key) => {
        return eventList[key];
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/events/${params.id}?page=0`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) setEventList(data.content)
            })
            .catch((error) => console.log(error));  
        
        setIsLoad(true);
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/celeb/sub?celebId=${params.id}`,
            headers: header,
        })
        .then((response) => response.data)
        .then((data) => {
            if(data.length > 0) {
                setGroup(true);
                setSubCelebList(data);
            } else {
                setGroup(false);
                setSubCelebList([]);
            }
        })
        .catch((error) => {
            console.log(error);
            message.warning('오류가 발생했습니다.')
        });
    }, [params]);

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
                {group && 
                    <div className="detail-members">
                        <CelebSwiper list={subCelebList} useLike={true} addPlus={false}/>
                    </div>
                }
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
                        { isLoad ? 
                        <>
                            { eventList ? Object.keys(eventList).map((key) => {
                                return (
                                    <EventItem 
                                        id =  {`${getEvent(key).eventId}`}
                                        title = {`${getEvent(key).eventName}`}
                                        date = {`${getEvent(key).startDate}~${getEvent(key).endDate}`}
                                        location = {`${getEvent(key).address}(${getEvent(key).cafeName})`}
                                        celebs = {`${getEvent(key).celeb}`}
                                    />
                                )
                            }) : <div>이벤트가 존재하지 않습니다.</div>}
                        </> : <EventSkeleton /> }
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