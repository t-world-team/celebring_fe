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
import { LoadingContext } from '../contexts/loading-context';

const Character = (props) => {
    const auth = useContext(AuthContext);
    const loading = useContext(LoadingContext);
    const [isLoad, setIsLoad] = useState(false);
    const [viewList, setViewList] = useState(true);
    const [eventList, setEventList] = useState([]);
    const params = useParams();
    const [images, setImages] = useState([]);
    const [groupName, setGroupName] = useState(null);
    const [eventDate, setEventDate] = useState(null);
    const [isCelebLoad, setIsCelebLoad] = useState(false);
    const [group, setGroup] = useState(false);
    const [subCelebList, setSubCelebList] = useState([]);
    const [isMemberLoad, setIsMemberLoad] = useState(false);
    const header = auth.isLoggedIn ? {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    } : null;

    let page = 0;
    let pageSize = 30;

    useEffect(() => {
        loading.showLoading(true);
        if(isLoad && isCelebLoad && isMemberLoad) {
            loading.showLoading(false);
        }
    }, [isLoad, isCelebLoad, isMemberLoad]);

    useEffect(() => {
        setIsLoad(false);
        axios.get(`${process.env.REACT_APP_API_URL}/events/${params.id}?page=${page}&size=${pageSize}`)
            .then((res) => res.data)
            .then((data) => {
                if (!data.empty) {
                    setEventList(data.content)
                } else {
                    setEventList([])
                }
                setIsLoad(true);
            })
            .catch((error) => {
                console.log(error)
                message.warning('오류가 발생했습니다.')
                setIsLoad(true);
            });  
        
    }, [params.id]);

    useEffect(() => {
        setIsCelebLoad(false);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/celeb/${params.id}`,
        })
        .then((response) => response.data)
        .then((data) => {
            setGroupName(data.name);
            setEventDate(data.eventDate);
            setImages(data.imageList);
            setIsCelebLoad(true);
        })
        .catch((error) => {
            console.log(error);
            message.warning('오류가 발생했습니다.')
            setIsCelebLoad(true);
        });
    }, [params.id]);

    useEffect(() => {
        setIsMemberLoad(false);
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
            setIsMemberLoad(true);
        })
        .catch((error) => {
            console.log(error);
            message.warning('오류가 발생했습니다.')
            setIsMemberLoad(true);
        });
    }, [params.id]);

    return (
        <div className="detail">
            <div className="detail-header">
                <div className="header-image-centered">
                    <Carousel>
                        {images.length > 0 ? 
                            images.map(image => <img src={image.imageUrl} alt={groupName + image.seq}/>)
                            : <img src={process.env.PUBLIC_URL + '/no_image.png'} alt="YookSungJae"/>
                        }
                    </Carousel>
                </div>
            </div>
            <div className="detail-celeb">
                <div className="celeb-introduce">
                    <h2>{groupName}</h2>
                    <span className="celeb-date"><CalendarOutlined/> {eventDate}</span>
                </div>
                {group && 
                    <div className="detail-members">
                        <CelebSwiper list={subCelebList} useLike={true} addPlus={false} group={false}/>
                    </div>
                }
            </div>
            <div className="detail-events">
                <div className="detail-title">
                    <h3>이벤트 리스트</h3>
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
                            { eventList ? eventList.map(item => (
                                <EventItem 
                                    id =  {`${item.eventId}`}
                                    title = {`${item.eventName}`}
                                    date = {`${item.startDate}~${item.endDate}`}
                                    location = {`${item.address}(${item.cafeName})`}
                                    celebs = {`${item.celeb}`}
                                    thumbnail = {`${item.thumbnail[0]}`}
                                />
                            )) : <div>이벤트가 존재하지 않습니다.</div>}
                        </> : <EventSkeleton /> }
                    </React.Fragment> :
                    <React.Fragment>
                        <CalendarItem 
                            anniversary = {`${eventDate.substring(5)}`}
                        />
                    </React.Fragment>
                }
            </div>
        </div>
    );
};

export default Character;