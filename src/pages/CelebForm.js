import React, { useState } from 'react';

import { Avatar, DatePicker, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ko_KR';
import ImgCrop from 'antd-img-crop';
import dayjs from 'dayjs';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

const CelebForm = (props) => {
    const [form] = Form.useForm();

    const [celebModalOpen, setCelebModalOpen] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
   
    const openCelebModal = () => {
        setCelebModalOpen(true);
    }
    const closeCelebModal = () => {
        setCelebModalOpen(false);
    }

    const [fileList, setFileList] = useState([]);
    
    //const changeImage = ({ fileList: newFileList }) => {
    const changeImage = (info) => {
        console.log(info);
    };

    const validateImage = (file) => {
        // 파일 확장자
        // 파일 용량 확인
        return true;
    }
    
    return ( 
        <div className='form-celeb'>
            <h3>셀럽 추가 요청</h3>
            <div className="celeb-add">
                <Avatar className="celeb-plus-button" size={80} icon={<PlusOutlined/>} onClick={openCelebModal}/>
            </div>
            <div className="celeb-member-add">
                <div className="celeb-member-title">
                    <h4>멤버 추가</h4>
                    <span className="small-text">그룹인 경우 멤버를 추가해주세요.</span>
                </div>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="celeb-member-add-swiper"
                    style={{height: 'auto'}}
                    >
                        {/* {celebs.map(celeb => 
                            <SwiperSlide className="celeb-swiper-item"><CelebAvatar url={celeb.profileImage} name={celeb.name} id={celeb.id} group={group} groupName={celeb.groupName} like={celeb.like} useLike={useLike}/></SwiperSlide>
                        )} */}
                        <SwiperSlide className="celeb-swiper-item">
                            <Avatar className="celeb-plus-button-plain" size={80} icon={<PlusOutlined/>} onClick={openCelebModal}/>
                        </SwiperSlide>
                    </Swiper>
            </div>
            <Modal
                title="셀럽 정보"
                centered
                destroyOnClose
                okText="확인"
                cancelText="취소"
                open={celebModalOpen}
                onCancel={closeCelebModal}
            >
                <Form layout='vertical' form={form}>
                    <div className="celeb-image-upload">
                        <ImgCrop rotationSlider>
                            <Upload
                                action=""
                                listType="picture-circle"
                                onChange={changeImage}
                                beforeUpload={validateImage}
                                maxCount={1}
                                fileList={fileList}
                            >
                                {fileList.length > 1 ? null : 
                                    <React.Fragment>
                                        <PlusOutlined/>
                                    </React.Fragment>
                                }
                            </Upload>
                        </ImgCrop>
                    </div>
                    <Form.Item label='셀럽 이름' name="name" rules={[{required: true, message: '셀럽 이름을 입력하세요'}]}>
                        <Input placeholder='셀럽 이름을 입력하세요'/>
                    </Form.Item>
                    <Form.Item label='데뷔일/생일' name="eventDate" rules={[{required: true, message: '데뷔일 혹은 생일을 선택하세요'}]}>
                        <DatePicker inputReadOnly={true} locale={locale} style={{width: '100%'}} placeholder='데뷔일 혹은 생일을 선택하세요'/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CelebForm;