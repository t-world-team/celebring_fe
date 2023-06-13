import React from 'react';

import { Button, DatePicker, Form, Input, Select } from 'antd';
import ImageUpload from '../components/ImageUpload';

const { RangePicker } = DatePicker;

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};

const celebArray = ['비투비', '서은광', '이민혁', '이창섭', '임현식', '프니엘', '육성재',
                    '인피니트', '김성규', '장동우', '남우현', '이성열', '엘', '이성종', ];
const celebOption = celebArray.map(celeb => {return {label: celeb, value: celeb}}).sort(function(item, compare){
    if(item.label > compare.label) {
        return 1;
    }
    if(item.label < compare.label) {
        return -1;
    }
    return 0;
});

const EventForm = (props) => {
    const [form] = Form.useForm();

    return (
        <div className='form-event'>
            <Form layout='vertical' form={form}>
                <Form.Item label='주인공' required>
                    <Select mode="multiple" allowClear placeholder="셀럽을 선택하세요" options={celebOption}/>
                </Form.Item>
                <Form.Item label='이벤트명' required>
                    <Input placeholder='이벤트명을 입력하세요'/>
                </Form.Item>
                <Form.Item label='기간' required>
                    <RangePicker style={{width: '100%'}} placeholder={['시작일자', '종료일자']}/>
                </Form.Item>
                <Form.Item label='장소' required>
                    <Input placeholder='장소를 입력하세요'/>
                </Form.Item>
                <Form.Item label='운영시간'>
                    <Input placeholder='운영시간을 입력하세요 (예) 10:00 ~ 19:00'/>
                </Form.Item>
                <Form.Item label='트위터 URL'>
                    <Input placeholder='이벤트의 트위터 URL을 입력하세요'/>
                </Form.Item>
                {/* <Form.Item label="대표이미지" valuePropName="fileList" getValueFromEvent={normFile}>
                    <ImageUpload/>
                </Form.Item>
                <Form.Item label="헤더이미지" valuePropName="fileList" getValueFromEvent={normFile}>
                    <ImageUpload/>
                </Form.Item> */}
                <Form.Item>
                    <div className="form-button">
                        <Button type="default" danger>취소</Button>
                        <Button type="default" htmlType="submit">저장</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EventForm;