import React from 'react';

import { Skeleton } from 'antd';

const EventSkeleton = () => {
    return (
        <div className="event-skeleton">
            <Skeleton active={true}/>
        </div>
    );
}

const AvatarSkeleton = () => {
    return (
        <div className="avatar-skeleton">
            <Skeleton.Avatar active={true} shape="circle"/>
            <Skeleton title={false} paragraph={{width: 50, rows: 1}} active={true}/>
        </div>
    )
}

export { EventSkeleton, AvatarSkeleton };