import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Popover, Rate, message, Modal, Image } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, HeartFilled, EditOutlined, DeleteOutlined, ZoomInOutlined, PlusSquareOutlined, ExclamationCircleFilled, BlockOutlined } from '@ant-design/icons';
import PanelItem from '../components/PanelItem';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import More2FillIcon from 'remixicon-react/More2FillIcon';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth-context';
const { confirm } = Modal;
const mainColor = process.env.REACT_APP_MAIN_COLOR;

const Event = (props) => {
    const auth = useContext(AuthContext);
    const params = useParams();
    const [event, setEvent] = useState();
    const [likeCount, setLikeCount] = useState();
    const [writer, setWriter] = useState(0);
    const [open, setOpen] = useState(false);
    const [map, setMap] = useState();
    const [mapVisible, setMapVisible] = useState(0);
    
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
    const showDeleteConfirm = () => {
        setOpen(false);
        confirm({
          title: '해당 이벤트를 삭제하시겠습니까?',
          icon: <ExclamationCircleFilled />,
          content: '삭제한 이벤트는 다시 확인할 수 없습니다.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_URL}/events`, 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                data: JSON.stringify({eventId: params.id})
            })
            .then((res) => res.status)
            .then((status) => {
                if(status === 200) {
                    message.success('이벤트가 삭제되었습니다.');
                }
            })
            .catch((error) => {
                message.warning('오류가 발생했습니다.');
            });
            
          },
          onCancel() {
            // message.error('Click on No');
          },
        });
    };

    const toggleEventLike = (number) => {
        if (auth.isLoggedIn) {
            likeEvent(number > 0 ? true : false);
        } else {
            message.warning('로그인이 필요합니다.');
            setLikeCount(0);
        }
    }

    const likeEvent = async (bLike) => {
        let likeMethod = bLike ? 'POST' : 'DELETE';
        
        axios({
            method: likeMethod,
            url: `${process.env.REACT_APP_API_URL}/events/likes`, 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            data: JSON.stringify({eventId: params.id})
        })
        .then((res) => res.status)
        .then((status) => {
            if(status === 200) {
                setLikeCount(bLike ? 1 : 0);
            }
        })
        .catch((error) => {
            setLikeCount(bLike ? 0 : 1);
            message.warning('오류가 발생했습니다.');
        });
    }

    const showMap = () => {
        setMapVisible(mapVisible > 0 ? 0: 1);
    }

    const goMap = () => {
        window.open(`https://map.naver.com/v5/search/${event.address}`, '_blank');
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/events/detail/${params.id}`, 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            }
        })
        .then((res) => res.data)
        .then((data) => {
            if (!data.empty) {
                setEvent(data);
                setLikeCount(data.liked);
                setWriter(data.writer);
                setMap(`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?crs=NHN:128&w=500&h=300&center=${data.mapX},${data.mapY}&level=16&scale=1&markers=type:d|size:mid|pos:${data.mapX} ${data.mapY}|color:red&X-NCP-APIGW-API-KEY-ID=${process.env.REACT_APP_NAVER_MAP_API}`);
            }
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
                            value={likeCount}
                            style={{fontSize: 24, color: mainColor}}
                            onChange={toggleEventLike}
                        />
                        {writer ?
                        <Popover placement="bottomRight" content={
                            <React.Fragment>
                                <Button type="text"><EditOutlined/> 수정</Button>
                                <Button onClick={showDeleteConfirm} type="text"><DeleteOutlined/> 삭제</Button>
                            </React.Fragment>
                        } trigger="click" open={open} onOpenChange={handleOpenChange}>
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
                        <Button type="default" onClick={showMap}><PlusSquareOutlined/></Button>
                    </div>
                    <p className="event-map">
                        { mapVisible ? <img src={map ? map : "error"} onClick={goMap} /> : <></> }
                    </p>
                    <p><ClockCircleOutlined /> {event?event.openingTime : '09:00 ~ 20:00'}</p>
                </div>
                <div className="detail-contents">
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