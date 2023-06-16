import React, { useContext, useEffect, useState } from 'react';

import { CelebAvatar } from '../components/CelebItem';
import { Anchor, Tabs, message } from 'antd';
import axios from 'axios';
import { AuthContext } from '../contexts/auth-context';

let groupCelebList;
let soloCelebList;

const Celeb = (props) => {
    const [getCeleb, setGetCeleb] = useState(false);
    const auth = useContext(AuthContext);
    const header = auth.isLoggedIn ? {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    } : null;

    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/celeb/list/consonant`,
            headers: header,
        })
        .then((response) => response.data)
        .then((data) => {
            if(data !== null) {
                console.log(data);
                groupCelebList = data.group;
                soloCelebList = data.solo;
                setGetCeleb(true);
            }
        })
        .catch((error) => message.warning('오류가 발생했습니다.'));
    }, [getCeleb]);

    const wordArray = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '기타'];

    const groupAnchorItems = wordArray.map(word => {return {key: 'group' + word, href: '#group' + word, title : word}});
    const soloAnchorItems = wordArray.map(word => {return {key: '#solo' + word, href: '#solo' + word, title : word}});

    const tabItems = [
        {
            key: 'group',
            label: '그룹',
            children: 
                <React.Fragment>
                    <div className="celeb-anchor">
                        <Anchor 
                            direction="horizontal" 
                            items={groupAnchorItems} 
                            offsetTop={60}
                            targetOffset={95}
                            style={{ background: '#fff' }}
                        />
                    </div>
                    <div style={{paddingTop: 20}}>
                        <div className="celeb-items">
                            {getCeleb && groupCelebList.map(group => 
                                <React.Fragment>
                                    {group.list.map((celeb, index) => 
                                        <div className="celeb-item" id={index === 0 ? `group${group.key}` : null}>
                                            <CelebAvatar useLike={true} url={celeb.profileImage} name={celeb.name} id={celeb.id} like={celeb.like}/>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </div>    
                    </div>
                </React.Fragment>,
        },
        {
            key: 'solo',
            label: '솔로',
            children: 
                <React.Fragment>
                    <div className="celeb-anchor">
                        <Anchor 
                            direction="horizontal" 
                            items={soloAnchorItems} 
                            offsetTop={60}
                            targetOffset={95}
                            style={{ background: '#fff' }}
                        />
                    </div>
                    <div style={{paddingTop: 20}}>
                        <div className="celeb-items">
                            {getCeleb && soloCelebList.map(solo => 
                                <React.Fragment>
                                    {solo.list.map((celeb, index) => 
                                        <div className="celeb-item" id={index === 0 ? `solo${solo.key}` : null}>
                                            <CelebAvatar useLike={true} url={celeb.profileImage} name={celeb.name} id={celeb.id} like={celeb.like}/>
                                        </div>
                                    )} 
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </React.Fragment>,
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