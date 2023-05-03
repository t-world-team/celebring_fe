import React from 'react';

import { Tabs } from 'antd';

const onChange = (key) => {
    console.log(key);
};

const itemExample = [
    {
        key: 'tab1',
        label: '탭1',
        children: `Content of Tab Pane 1`,
    },
    {
        key: 'tab2',
        label: '탭2',
        children: `Content of Tab Pane 2`,
    },
];


const TabItem = (props) => {
    const items = props.tabs ? props.tabs : itemExample;

    return (
        <Tabs size='large' defaultActiveKey="1" items={items} onChange={onChange}/>
    );
};

export default TabItem;