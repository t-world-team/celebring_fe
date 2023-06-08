import React, { useEffect, useState } from 'react';

import { CelebAvatar } from '../components/CelebItem';
import { Anchor, Tabs } from 'antd';

const Celeb = (props) => {
    const topRef = React.useRef(null);
    const [targetOffset, setTargetOffset] = useState();
    useEffect(() => {
        setTargetOffset(topRef.current?.clientHeight);
    }, []);

    const celebs = props.list ? props.list : [
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
        }, 
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
        }, 
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
        }, 
    ];

    const anchorItems = [
        {
            key: '1',
            href: '#1',
            title: 'ㄱ',
        },
        {
            key: '2',
            href: '#2',
            title: 'ㄴ',
        },
        {
            key: '3',
            href: '#3',
            title: 'ㄷ',
        },
        {
            key: '4',
            href: '#4',
            title: 'ㄹ',
        },
        {
            key: '5',
            href: '#5',
            title: 'ㅁ',
        },
        {
            key: '6',
            href: '#6',
            title: 'ㅂ',
        }
    ];

    const tabItems = [
        {
            key: 'group',
            label: '그룹',
            children: 
                <React.Fragment>
                    <div style={{padding: 20}}>
                        <Anchor 
                            direction="horizontal" 
                            items={anchorItems} 
                            offsetTop={50}
                            targetOffset={targetOffset}
                            style={{paddingTop: 30, background: '#fff'}}/>
                    </div>
                    <div>
                        <div className="celeb-items" id="1">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="2">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="3">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="4">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="5">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="6">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                    </div>
                </React.Fragment>,
        },
        {
            key: 'solo',
            label: '솔로',
            children: '',
        },
    ];


    return (
        <div className="celeb-list-wrap">
            <div className="celeb-title">
                다양한 셀럽을 만나보세요
            </div>
            <Tabs items={tabItems} ref={topRef}/>
        </div>
    )
}

export default Celeb;