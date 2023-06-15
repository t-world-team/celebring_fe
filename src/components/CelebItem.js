import React from 'react';

import { HeartFilled } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import { PlusOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const CelebAvatar = (props) => {
    const url = props.url ? props.url : 'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg';
    const name = props.name ? props.name : '비투비';
    const id = props.id ? props.id : null;
    const useLike = props.useLike != null ? props.useLike : false;
    const like = props.like ? props.like : 1;

    return (
        <React.Fragment>
            <Link to={`/character/${id}`}>
                <div className="celeb-avatar">
                    <Avatar size={80} src={url} style={defaultStyle}></Avatar>
                    <span className="celeb-name">{name}</span>
                </div>
            </Link>
            {useLike ?
                <div className="celeb-like">
                    <Rate 
                        character={<HeartFilled />} 
                        count={1} 
                        defaultValue={like}
                        style={{color: mainColor}}
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
    const celebs = props.list ? props.list : [
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
            id: '1',
            group: true,
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
            id: '2',
            celeb: '1',
            group: false,
        }, 
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
            id: '1',
            group: true,
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
            id: '2',
            celeb: '1',
            group: false,
        }, 
        {
            url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg',
            name: '비투비',
            id: '1',
            group: true,
        }, 
        {
            url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg',
            name: '육성재',
            id: '2',
            celeb: '1',
            group: false,
        }, 
    ];
    
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
                <SwiperSlide className="celeb-swiper-item"><CelebAvatar url={celeb.url} name={celeb.name} id={celeb.id} group={celeb.group}/></SwiperSlide>
            )}
            {addPlus && 
                <SwiperSlide className="celeb-swiper-item"><Link to={'/celeb'}><Avatar className="celeb-plus-button" size={80} icon={<PlusOutlined/>} style={defaultStyle}/></Link></SwiperSlide>
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