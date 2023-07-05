import React from 'react';

import { Button, DatePicker, Form, Input } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

import ImageUpload from '../components/ImageUpload';

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};

const CelebForm = (props) => {
    const [form] = Form.useForm();
   
    return ( 
        <div className='form-celeb'>
        <Form layout='vertical' form={form}>
            <Form.Item label='셀럽 이름' name="name" rules={[{required: true, message: '셀럽 이름을 입력하세요'}]}>
                <Input placeholder='셀럽 이름을 입력하세요'/>
            </Form.Item>
            <Form.Item label='데뷔일/생일' name="eventDate" rules={[{required: true, message: '데뷔일 혹은 생일을 선택하세요'}]}>
                <DatePicker inputReadOnly={true} locale={locale} style={{width: '100%'}} placeholder='데뷔일 혹은 생일을 선택하세요'/>
            </Form.Item>
            <Form.Item label='비고' name="note">
                <TextArea rows={2} placeholder='비고'/>
            </Form.Item>
            <Form.Item label="이미지" valuePropName="fileList" getValueFromEvent={normFile} rules={[{required: true, message: '이미지를 선택하세요'}]}>
                <ImageUpload/>
            </Form.Item>
            <Form.Item>
                <div className="form-button">
                    <Button type="default" danger>취소</Button>
                    <Button type="default" htmlType="submit">저장</Button>
                </div>
            </Form.Item>
        </Form>
    </div>
    );
}

export default CelebForm;