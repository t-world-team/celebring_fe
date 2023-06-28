import React from 'react';

import { Button, DatePicker, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Search from 'antd/es/input/Search';
import { EnvironmentOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { useLocation, useNavigate } from 'react-router';

const { RangePicker } = DatePicker;

const EventForm = (props) => {
    const auth = useContext(AuthContext);
    const [form] = Form.useForm();
    const [celebOption, setCelebOption] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/celeb/list`,
        })
        .then((response) => response.data)
        .then((celebList) => {
            if(celebList !== null) {
                setCelebOption(celebList.map(celeb => {return {label: celeb.name, value: celeb.id}}).sort(function(item, compare){
                    if(item.label > compare.label) {
                        return 1;
                    }
                    if(item.label < compare.label) {
                        return -1;
                    }
                    return 0;
                }));
            }
        })
        .catch((error) => {
            message.warning('오류가 발생했습니다.')
        });
    }, []);

    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [mapSearchResult, setMapSearchResult] = useState([]);

    const showMapModal = () => {
        setMapModalOpen(true);
    }
    const hideMapModal = () => {
        setMapModalOpen(false);
        setMapSearchResult([]);
    }

    const searchLocal = async (query) => {
        setMapSearchResult([]);
        try {
            const response = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/local?query=${query}`,
            });
            const data = await response.data;
            setMapSearchResult(data.items);
        } catch(error) {
            console.log(error);
        }
    }

    const onClickSubmit = async (values) => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/events`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            data: JSON.stringify(
                {
                    celebId: values.celeb,
                    eventName: values.name,
                    startDate: dayjs(values.date[0]).format('YYYY-MM-DD'),
                    endDate: dayjs(values.date[1]).format('YYYY-MM-DD'),
                    cafeName: values.cafeName,
                    address: values.address,
                    mapX: values.mapX,
                    mapY: values.mapY,
                    openingTime: values.openingTime,
                    twitter: values.twitterUrl
                }
            )
        })
        .then((response) => {
            if(response.status === 200) {
                message.info('등록이 완료되었습니다.');
                //navigate(response.data);
            } else {
                message.warning('등록에 실패하였습니다.');
            }
        })
        .catch((error) => {
            message.warning('오류가 발생했습니다.')
        });
    }

    return (
        <div className='form-event'>
            <Form layout='vertical' form={form} onFinish={onClickSubmit}>
                <Form.Item label='주인공' name="celeb" rules={[{required: true, message: '주인공을 선택하세요'}]}>
                    <Select 
                        mode="multiple" 
                        allowClear 
                        placeholder="셀럽을 선택하세요" 
                        options={celebOption}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    />
                </Form.Item>
                <Form.Item label='이벤트명' name="name" rules={[{required: true, message: '이벤트명을 입력하세요'}]}>
                    <Input placeholder='이벤트명을 입력하세요'/>
                </Form.Item>
                <Form.Item label='기간' name="date" rules={[{required: true, message: '기간을 선택하세요'}]}>
                    <RangePicker locale={locale} style={{width: '100%'}} placeholder={['시작일자', '종료일자']}/>
                </Form.Item>
                <Form.Item label='장소' required>
                    <div className="input-cafe-items">
                        <Form.Item name="cafeName" className="input-cafe" rules={[{required: true, message: '상호명을 입력하세요'}]}>
                            <Input placeholder="상호명을 입력하세요" readOnly/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="default" onClick={showMapModal}>상호 검색</Button>
                        </Form.Item>
                    </div>
                    <Form.Item name="address" rules={[{required: true, message: '주소를 입력하세요'}]}>
                        <Input placeholder='주소를 입력하세요' readOnly/>
                    </Form.Item>
                    <Modal
                        title="상호 검색"
                        centered
                        destroyOnClose
                        open={mapModalOpen}
                        cancelText="닫기"
                        onCancel={hideMapModal}
                        footer={null}
                        // footer={<Button type="default" onClick={hideMapModal}>주소 직접 입력하기</Button>}
                    >
                        <Search placeholder="상호명을 입력해 주세요" allowClear onSearch={searchLocal}/>
                        <div className="local-items">
                            {mapSearchResult.length > 0 ?
                                mapSearchResult.map(item => 
                                    <div className="local-item"
                                        onClick={() => {
                                            form.setFieldsValue({cafeName: item.title.replaceAll(/<[^>]*>?/g, '')});
                                            form.setFieldsValue({address: item.roadAddress});
                                            form.setFieldsValue({mapX: item.mapx});
                                            form.setFieldsValue({mapY: item.mapy});
                                            hideMapModal();
                                        }}
                                    >
                                        <EnvironmentOutlined />
                                        <div className="local-location">
                                            <div dangerouslySetInnerHTML={{__html: item.title}}></div>
                                            <div className="location">{item.roadAddress}</div>
                                        </div>
                                    </div>
                                )
                                : <div className="no-result">검색 결과가 없습니다.</div>
                            }
                        </div>
                    </Modal>
                    <Form.Item name="mapX" hidden><Input/></Form.Item>
                    <Form.Item name="mapY" hidden><Input/></Form.Item>
                </Form.Item>
                <Form.Item label='운영시간' name="openingTime">
                    <Input placeholder='운영시간을 입력하세요 (예) 10:00 ~ 19:00'/>
                </Form.Item>
                <Form.Item label='트위터 URL' name="twitterUrl">
                    <Input placeholder='이벤트의 트위터 URL을 입력하세요'/>
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
};

export default EventForm;