import React from 'react';

import { Skeleton } from 'antd';

const EventSkeleton = () => {
    return (
        <div className="event-skeleton">
            <Skeleton active={true}/>
        </div>
    );
}

const EventSkeletonList = (props) => {
    const count = props.count;
    const getSkeleton = () => {
        const skeletonList = [];
        for(let i=0; i<count; i++) {
            skeletonList.push(<EventSkeleton />);
        }
        return skeletonList;
    }

    for(let i=0;i<count;i++){
        
    }

    return (
        <React.Fragment>{getSkeleton()}</React.Fragment>
    )
}

const AvatarSkeleton = () => {
    return (
        <div className="avatar-skeleton">
            <Skeleton.Avatar active={true} shape="circle"/>
            <Skeleton title={false} paragraph={{width: 50, rows: 1}} active={true}/>
        </div>
    )
}

const AvatarSkeletonList = (props) => {
    const count = props.count;
    const getSkeleton = () => {
        const skeletonList = [];
        for(let i=0;i<count;i++){
            skeletonList.push(<AvatarSkeleton/>);
        }
        return skeletonList;
    }

    for(let i=0;i<count;i++){
        
    }

    return (
        <React.Fragment>{getSkeleton()}</React.Fragment>
    )
}

export { EventSkeleton, EventSkeletonList, AvatarSkeleton, AvatarSkeletonList };