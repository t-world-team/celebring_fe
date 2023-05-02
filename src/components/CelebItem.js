import React from 'react';

import { Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

const defaultStyle = {
    border: '1px solid #ccc',
    marginRight: '5px',
};

export { Celeb, CelebList }