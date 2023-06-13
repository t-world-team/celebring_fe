import React, { useEffect, useState } from 'react';

import { CelebAvatar } from '../components/CelebItem';
import { Anchor, Tabs } from 'antd';

const Celeb = (props) => {
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

    const wordArray = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
                        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const anchorItems = wordArray.map(word => {return {key: word, href: '#' + word, title : word}});

    const tabItems = [
        {
            key: 'group',
            label: '그룹',
            children: 
                <React.Fragment>
                    <div className="celeb-anchor">
                        <Anchor 
                            direction="horizontal" 
                            items={anchorItems} 
                            offsetTop={60}
                            targetOffset={95}
                            style={{ background: '#fff' }}
                        />
                    </div>
                    <div style={{paddingTop: 20}}>
                        <div className="celeb-items" id="ㄱ">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="ㄴ">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="ㄷ">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="ㄹ">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="ㅁ">
                            {celebs.map(celeb => 
                                <div className="celeb-item">
                                    <CelebAvatar useLike={true} url={celeb.url} name={celeb.name}/>
                                </div>
                            )}
                        </div>
                        <div className="celeb-items" id="ㅂ">
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
            <Tabs items={tabItems}/>
        </div>
    )
}

export default Celeb;