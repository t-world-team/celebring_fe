import React, { useContext, useState } from 'react';

import { HeartFilled } from '@ant-design/icons';
import { Avatar, Rate, message } from 'antd';
import { PlusOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { AuthContext } from '../contexts/auth-context';
import axios from 'axios';

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const CelebAvatar = (props) => {
    const auth = useContext(AuthContext);
    const url = props.url ? props.url : `${process.env.PUBLIC_URL}/no_image.png`;
    const name = props.name;
    const id = props.id;
    const useLike = props.useLike != null ? props.useLike : false;
    const like = props.like ? props.like : 0;
    const group = props.group != null ? props.group : false;
    const groupName = props.groupName ? props.groupName : '';
    const likeCallback = props.likeCallback;

    const [likeCount, setLikeCount] = useState(like);

    const toggleCelebLike = (number) => {
        if(auth.isLoggedIn) {
            likeCeleb(number > 0 ? true : false);
        } else {
            message.warning('로그인이 필요합니다.');
            setLikeCount(0);
        }
    }

    const likeCeleb = async (bLike) => {
        let likeUrlPath = bLike ? 'like' : 'dislike';
        let likeMethod = bLike ? 'POST' : 'DELETE';

        axios({
            method: likeMethod,
            url: `${process.env.REACT_APP_API_URL}/celeb/${likeUrlPath}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            data: JSON.stringify({celebId: id})
        })
        .then((response) => response.status)
        .then((status) => {
            if(status === 200) {
                setLikeCount(bLike ? 1 : 0);
                if(likeCallback != undefined) likeCallback();
            }
        })
        .catch((error) => {
            setLikeCount(bLike ? 0 : 1);
            message.warning('오류가 발생했습니다.');
        });
    }

    return (
        <React.Fragment>
            <Link to={`/character/${id}`}>
                <div className="celeb-avatar">
                    <Avatar size={80} src={url} style={defaultStyle}></Avatar>
                    <span className="celeb-name">{name}{group && groupName ? `(${groupName})` : null}</span>
                </div>
            </Link>
            {useLike ?
                <div className="celeb-like">
                    <Rate 
                        character={<HeartFilled />} 
                        count={1} 
                        value={likeCount}
                        defaultValue={like}
                        style={{color: mainColor}}
                        onChange={toggleCelebLike}
                    />
                </div>
            : null}
        </React.Fragment>
    );
};

const CelebList = (props) => {
    const celebs = props.list ? props.list : [{url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg'}, {url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg'}];
    return (
        <React.Fragment>
            {celebs.map(celeb => <CelebAvatar url={celeb.url}/>)}
            <Link to={'/celeb'}>
                <Avatar className="celeb-plus-button" size={80} icon={<PlusOutlined/>} style={defaultStyle}/>
            </Link>
        </React.Fragment>
    );
};

const CelebSwiper = (props) => {
    const addPlus = props.addPlus != null ? props.addPlus : true;
    const celebs = props.list ? props.list : [];
    const useLike = props.useLike != null ? props.useLike : false;
    const group = props.group != null ? props.group : true;
    
    return (
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        className="celeb-swiper"
        style={{height: 'auto'}}
        >
            {celebs.map(celeb => 
                <SwiperSlide className="celeb-swiper-item"><CelebAvatar url={celeb.profileImage} name={celeb.name} id={celeb.id} group={group} groupName={celeb.groupName} like={celeb.like} useLike={useLike}/></SwiperSlide>
            )}
            {addPlus && 
                <SwiperSlide className="celeb-swiper-item"><Link to={'/celeb'}><Avatar className="celeb-plus-button" size={80} icon={<PlusOutlined/>}/></Link></SwiperSlide>
            }
        </Swiper>
    )
}


const CelebFav = (props) => {
    let thumbnail = props.thumbnail ? props.thumbnail : 'https://pbs.twimg.com/media/FvFhOr5aYAAA88w?format=jpg';
    let name = props.name ? props.name : '비투비';
    let favorite = props.favorite ? props.favorite : 1;
    let onClick = props.onClick ? props.onClick : null;

    return (
        <div className="celeb-fav">
            <Link to={'/character'} onClick={onClick}>
                <Avatar size={40} src={thumbnail} style={defaultStyle}></Avatar>
                <span className="celeb-fav-name">{name}</span>
            </Link>
            <div className="celeb-fav-like">
                <Rate 
                    character={<StarFilled />} 
                    count={1} 
                    defaultValue={favorite}
                />
            </div>
        </div>
    );
};

const defaultStyle = {
    border: '1px solid #ccc',
    marginRight: '5px',
};

export { CelebAvatar, CelebList, CelebSwiper, CelebFav }