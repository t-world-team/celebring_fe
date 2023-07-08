import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { PlusOutlined } from '@ant-design/icons';
import { FreeMode } from 'swiper';
import { Avatar, Button, DatePicker, Form, Input, Modal, Upload, message } from 'antd';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const CelebForm = (props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [celebData, setCelebData] = useState();
    const [memberData, setMemberData] = useState([]);

    const [form] = Form.useForm();

    /* Celeb Add Form Modal */
    const [celebModalOpen, setCelebModalOpen] = useState();
    const [fileList, setFileList] = useState([]);

    /* Image Preview Modal */
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [uploadImageUrl, setUploadImageUrl] = useState(''); // cloudinary url
    

    /* Celeb Add Form Modal */
    // Modal open
    const openCelebAddModal = (type, name, eventDate, profileImage, index) => {
        if(type === 'M' && (celebData === undefined || celebData === null)) {
            message.warning("셀럽을 먼저 추가해 주세요");
            return false;
        }

        if(profileImage === undefined) {
            setFileList([]);
        } else {
            setFileList([{url: profileImage, status: 'done'}]);
        }
        
        form.setFieldsValue({name: name});
        form.setFieldsValue({eventDate: eventDate ? dayjs(eventDate, 'YYYY-MM-DD') : null});
        form.setFieldsValue({index: index});
        form.setFieldsValue({type: type});
        setCelebModalOpen(true);
    }

    // Validate image
    const validateImage = (file) => {
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

        return (validateSize && validateExst) || Upload.LIST_IGNORE;
    }

    // Change Image
    const changeImage = (info) => {
        setFileList(info.fileList);
    };

    // Remove Image
    const removeImage = () => {
        setFileList('');
    }

    // Select Image > Upload to Cloudinary
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;
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
            } else {
                onError(new Error('업로드 실패'));
            }
        })
        .catch((error) => {
            onError(new Error('업로드 실패'));
        });
    }

    // Confirm > Set Avatar Info
    const setAvatarInfo = (values) => {
        if(values.type === 'C') {
            setCelebData({name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')});
        } else {
            const memberArray = memberData;
            if(values.index === undefined || values.index === null) {
                memberArray.push({name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')});
            } else {
                memberArray[values.index] = {name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')};
            }
            setMemberData(memberArray);
        }

        closeCelebModal();
    }

    // Close Celeb Add Form Modal
    const closeCelebModal = () => {
        setCelebModalOpen(false);
    }


    /* Image Preview Modal */
    const openPreviewModal = async (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewOpen(true);
    }
    const closePreviewModal = () => {
        setPreviewImage('');
        setPreviewOpen(false);
    }

    /* Save Celeb */
    const saveCeleb = async () => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/celeb`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            data: JSON.stringify({
                celeb: celebData,
                members: memberData,
            }),
        })
        .then((response) => {
            if(response.status === 200) {
                message.success(`셀럽 추가 요청이 완료되었습니다.`);
                navigate(`/`);
            } else {
                message.warning(`셀럽 추가 요청에 실패하였습니다.`);
            }
        })
        .catch((error) => {
            message.warning('오류가 발생했습니다.')
        });
    }
    
    return ( 
        <div className='form-celeb'>
            <h3>셀럽 추가 요청</h3>
            <div className="celeb-add">
                <div className="celeb-avatar-add">
                    <div className="celeb-avatar-add-item">
                        <Avatar 
                            className="celeb-plus-button" 
                            size={80} 
                            icon={<PlusOutlined/>} 
                            src={celebData && celebData.profileImage}
                            onClick={celebData ? () => openCelebAddModal('C', celebData.name, celebData.eventDate, celebData.profileImage) : () => openCelebAddModal('C')}
                        />
                        <div className="celeb-info-item">
                            <span>{celebData && celebData.name}</span>
                            <span>{celebData && celebData.eventDate}</span>
                        </div>
                    </div>
                </div>
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
                    {memberData.map((member, index) => (
                        <SwiperSlide className="celeb-swiper-item">
                            <div className="celeb-avatar-add" onClick={() => openCelebAddModal('M', member.name, member.eventDate, member.profileImage, index)}>
                                <div className="celeb-avatar-add-item">
                                    <Avatar 
                                        className="celeb-plus-button"
                                        size={80} 
                                        src={member.profileImage}
                                    />
                                    <div className="celeb-info-item">
                                        <span>{member.name}</span>
                                        <span>{member.eventDate}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className="celeb-swiper-item">
                        <Avatar className="celeb-plus-button-plain" size={80} icon={<PlusOutlined/>} onClick={() => openCelebAddModal('M')}/>
                    </SwiperSlide>
                </Swiper>
                <Modal
                    title="셀럽 정보"
                    centered
                    destroyOnClose={true}
                    open={celebModalOpen}
                    closable={false}
                    maskClosable={false}
                    footer={null}
                >
                    <Form layout='vertical' form={form} onFinish={setAvatarInfo}>
                        <Form.Item name="type" hidden><Input/></Form.Item>
                        <Form.Item name="index" hidden><Input/></Form.Item>
                        <div className="celeb-image-upload">
                            <ImgCrop 
                                rotationSlider
                                modalOk='확인'
                                modalCancel='취소'
                                modalTitle='이미지 편집'
                                beforeCrop={validateImage}
                            >
                                <Upload
                                    customRequest={uploadImage}
                                    listType="picture-circle"
                                    onChange={changeImage}
                                    maxCount={1}
                                    onPreview={openPreviewModal}
                                    onRemove={removeImage}
                                    fileList={fileList}
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
                        <Form.Item className="modal-footer-button">
                            <Button type="default" htmlType='button' onClick={closeCelebModal}>취소</Button>
                            <Button type="primary" htmlType='submit'>확인</Button>
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
            <div className="celeb-form-button">
                <Button danger>취소</Button>
                <Button onClick={saveCeleb}>추가 요청</Button>
            </div>
        </div>
    );
}

export default CelebForm;