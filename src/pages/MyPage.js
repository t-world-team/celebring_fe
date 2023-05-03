import React, { useState } from 'react';

import { Button } from 'antd';
import TabItem from '../components/TabItem';
import EventItem from '../components/EventItem';
import { CelebFav } from '../components/CelebItem';
import { AfterWordList } from '../components/AfterwordItem';

const tabFav = [
    {
        key: 'celeb',
        label: '인물/그룹',
        children: <CelebFav />,
    },
    {
        key: 'event',
        label: '이벤트',
        children: <EventItem useHeart={true}/>,
    },
];
const tabReg = [
    {
        key: 'event',
        label: '이벤트',
        children: <EventItem/>,
    },
    {
        key: 'afterword',
        label: '후기',
        children: <AfterWordList/>
    },
];

const MyPage = (props) => {
    const name = props.name ? props.name : '홍길동';

    const [buttonToggle, setTabFav] = useState(true);

    function changeTabFav() {
        setTabFav(false);
    }
    function changeTabReg() {
        setTabFav(true);
    }

    return (
        <div className="mypage">
            <div className="mypage-title">
                <p><strong>{name}</strong>님 안녕하세요.</p>
            </div>
            <div className="form-button">
                <Button size='large'>회원정보 수정</Button>
                {buttonToggle ? 
                    <Button size='large' onClick={changeTabFav}>등록한 이벤트/후기</Button> :
                    <Button size='large' onClick={changeTabReg}>좋아요 목록</Button>
                }
            </div>
            {buttonToggle ?
                <React.Fragment>
                    <h3>좋아요 목록</h3>
                    <TabItem tabs={tabFav}/>
                </React.Fragment> :
                <React.Fragment>
                    <h3>등록한 이벤트/후기</h3>
                    <TabItem tabs={tabReg}/>
                </React.Fragment>
            }
        </div>
    );
};

export default MyPage;