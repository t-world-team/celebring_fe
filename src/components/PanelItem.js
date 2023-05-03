import React from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

const { Panel } = Collapse;
const text = '설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명';

const PanelItem = () => {
    const { token } = theme.useToken();

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
            expandIconPosition='end'
            style={{
                background: '#fff',
            }}
            >
            <Panel header="첫번째 설명입니다." key="explain1">
                <p>{text}</p>
            </Panel>
        </Collapse>
    );
};
export default PanelItem;