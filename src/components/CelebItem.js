import React from 'react';

import { Avatar, Rate } from 'antd';
import { PlusOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Celeb = (props) => {
    const url = props.url ? props.url : 'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg';
    
    return (
        <Link to={'/character'}>
            <Avatar size={80} src={url} style={defaultStyle}></Avatar>
        </Link>
    );
};

const CelebList = (props) => {
    const celebs = props.list ? props.list : [{url:'https://pbs.twimg.com/profile_images/912222837938589697/_OWluI2j_400x400.jpg'}, {url:'https://pbs.twimg.com/media/FufPaNIWwAMmApz?format=jpg'}];
    return (
        <React.Fragment>
            {celebs.map(celeb => <Celeb url={celeb.url}/>)}
            <Avatar size={80} icon={<PlusOutlined/>} style={defaultStyle}/>
        </React.Fragment>
    );
};

const CelebFav = (props) => {
    let thumbnail = props.thumbnail ? props.thumbnail : 'https://pbs.twimg.com/media/FvFhOr5aYAAA88w?format=jpg';
    let name = props.name ? props.name : '비투비';
    let favorite = props.favorite ? props.favorite : 1;

    return (
        <div className="celeb-fav">
            <Link to={'/character'}>
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

export { Celeb, CelebList, CelebFav }