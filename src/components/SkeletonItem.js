import React from 'react';

import { Skeleton } from 'antd';

const EventSkeleton = () => {
    return (
        <div className="event-skeleton">
            <div className="event-content">
                <Skeleton.Input active={true} size={'small'} />
                <Skeleton title={false} paragraph={{width: 100, rows: 3}} active={true}/>
            </div>
            <div className="event-image">
                <Skeleton.Image active={true} />
            </div>
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