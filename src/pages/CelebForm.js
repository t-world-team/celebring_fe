import React, { useState } from 'react';

import { Avatar, DatePicker, Form, Input, Modal, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ko_KR';
import ImgCrop from 'antd-img-crop';
import dayjs from 'dayjs';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import axios from 'axios';

const CelebForm = (props) => {
    const [form] = Form.useForm();

    const [celebModalOpen, setCelebModalOpen] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
   
    const [uploadImageUrl, setUploadImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);
    
    const openCelebModal = () => {
        setCelebModalOpen(true);
    }
    const closeCelebModal = () => {
        setCelebModalOpen(false);
        setFileList([]);
    }

    const changeImage = (info) => {
        setFileList(info.fileList);
    };

    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        let validateSize = true;
        let validateExst = true;

        if(file.size > 3145728) {
            message.error('이미지는 3MB까지만 업로드할 수 있습니다.');
            validateSize = false;
        }
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            message.error('이미지 확장자는 JPG, JPEG, PNG만 업로드할 수 있습니다.');
            validateExst = false;
        }

        if(validateSize && validateExst) {
            const formData = new FormData();
            formData.append("files", file);

            axios.post(`${process.env.REACT_APP_API_URL}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: event => {
                    onProgress({percent: (event.loaded / event.total) * 100});
                }
            })
            .then((response) => {
                if(response.status === 200) {
                    onSuccess("Ok");
                    setUploadImageUrl(response.data[0].url);
                    console.log(uploadImageUrl);
                } else {
                    onError(new Error('업로드 실패'));
                }
            })
            .catch((error) => {
                onError(new Error('업로드 실패'));
            });
        } else {
            setFileList([]);
            onError(new Error('업로드 실패'));
        }
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const openPreviewModal = async (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewOpen(true);
    }

    const closePreviewModal = () => {
        setPreviewImage('');
        setPreviewOpen(false);
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
                                customRequest={uploadImage}
                                listType="picture-circle"
                                onChange={changeImage}
                                maxCount={1}
                                onPreview={openPreviewModal}
                            >
                                {fileList.length >= 1 ? null : 
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
            <Modal
                open={previewOpen}
                centered
                title={null}
                footer={null}
                onCancel={closePreviewModal}
                zIndex="9999"
                width="auto"
            >
                <img style={{width: 'auto'}} src={previewImage}/>
            </Modal>
        </div>
    );
}

export default CelebForm;