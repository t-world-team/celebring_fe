import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { PlusOutlined } from '@ant-design/icons';
import { FreeMode } from 'swiper';
import { Avatar, Button, DatePicker, Form, Input, Modal, Popconfirm, Upload, message } from 'antd';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon';
import PencilLineIcon from 'remixicon-react/PencilLineIcon';

const CelebForm = (props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [celebData, setCelebData] = useState();
    const [memberData, setMemberData] = useState([]);

    const [form] = Form.useForm();

    /* Celeb Add Form Modal */
    const [celebModalOpen, setCelebModalOpen] = useState();
    const [fileList, setFileList] = useState([]);
    const [noFile, setNoFile] = useState(false);

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
        if(info.file.status !== 'removed')
            setFileList(info.fileList);
    };

    // Remove Image
    const removeImage = () => {
        setFileList([]);
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
        if(!fileList || fileList.length === 0) {
            setNoFile(true);
        } else {
            if(fileList[0].status === 'done') {
                setNoFile(false);

                if(values.type === 'C') {
                    setCelebData({name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')});
                } else {
                    const memberArray = [...memberData];
                    if(values.index === undefined || values.index === null) {
                        memberArray.push({name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')});
                    } else {
                        memberArray[values.index] = {name: values.name, profileImage: uploadImageUrl, eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')};
                    }
                    setMemberData(memberArray);
                }
        
                closeCelebModal();
            } else {
                message.warning('이미지 업로드가 완료되지 않았습니다.');
            }
        }
    }

    // Close Celeb Add Form Modal
    const closeCelebModal = () => {
        setUploadImageUrl('');
        setCelebModalOpen(false);
        setNoFile(false);
    }


    /* Image Preview Modal */
    const openPreviewModal = async (file) => {
        const imageUrl = file.thumbUrl ? file.thumbUrl : file.url;
        setPreviewImage(imageUrl);
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
    
    
    /* Delete Avatar */
    const deleteAvatar = (index) => {
        const memberArray = [...memberData];
        memberArray.splice(index, 1);
        setMemberData(memberArray);
    }

    return ( 
        <div className='form-celeb'>
            <h3>셀럽 추가 요청</h3>
            <div className="celeb-add">
                <div className="celeb-avatar-add">
                    <CelebAddAvatar 
                        celebType="C" 
                        name={celebData && celebData.name} 
                        eventDate={celebData && celebData.eventDate}
                        profileImage={celebData && celebData.profileImage}
                        onEdit={openCelebAddModal}
                    />
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
                    <SwiperSlide className="celeb-swiper-item">
                        <CelebAddAvatar 
                            celebType="M" 
                            onEdit={openCelebAddModal}
                        />
                    </SwiperSlide>
                    {memberData.map((member, index) => (
                        <SwiperSlide className="celeb-swiper-item">
                            <div className="celeb-avatar-add">
                                <CelebAddAvatar 
                                    celebType="M" 
                                    name={member.name} 
                                    eventDate={member.eventDate}
                                    profileImage={member.profileImage}
                                    index={index}
                                    onEdit={openCelebAddModal}
                                    onDelete={deleteAvatar}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
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
                            {noFile && <div className="ant-form-item-explain-error">이미지를 업로드 해주세요</div>}
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
                    style={{maxWidth: 400}}
                >
                    <img style={{width: 'auto', maxWidth: 352}} src={previewImage}/>
                </Modal>
            </div>
            <div className="celeb-form-button">
                <Button danger>취소</Button>
                <Button onClick={saveCeleb}>추가 요청</Button>
            </div>
        </div>
    );
}

const CelebAddAvatar = (props) => {
    const celebType = props.celebType;
    const name = props.name;
    const eventDate = props.eventDate;
    const profileImage = props.profileImage;
    const index = props.index;
    const editAvatar = props.onEdit;
    const deleteAvatar = props.onDelete;

    const onEdit = () => {
        editAvatar(celebType, name, eventDate, profileImage, index);
    }

    const onDelete = () => {
        deleteAvatar(index);
    }

    return (
        <div className="celeb-avatar-add-item">
            <Avatar 
                className={celebType === 'C' ? "celeb-plus-button" : "celeb-plus-button-plain"} 
                size={100} 
                icon={<PlusOutlined/>} 
                src={profileImage}
                onClick={onEdit}
            />
            <div className="celeb-info-item">
                <span className="celeb-info-item-name">{name}</span>
                <span className="celeb-info-item-date">{eventDate}</span>
            </div>
            {name ? 
                <div className="celeb-edit-item">
                    <Button type="text" shape="circle" size="small" icon={<PencilLineIcon size="1.2rem"/>} onClick={onEdit}/>
                    {celebType === 'C' ? null : 
                        <Popconfirm title="멤버를 삭제하시겠습니까?" placement="bottom" onConfirm={onDelete} okText="삭제" cancelText="취소">
                            <Button type="text" shape="circle" size="small" icon={<DeleteBinLineIcon size="1.1rem" color="#800"/>}/>
                        </Popconfirm>
                    }
                </div>
                : null
            }
        </div>
    )
}

export default CelebForm;