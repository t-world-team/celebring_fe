import React, { useState } from "react";

import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const ImageUpload = () => {
    const [fileList, setFileList] = useState([]);
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        
        const image = new Image();
        image.src = src;
        
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    
    return (
        <ImgCrop rotationSlider>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                >
                <Button>업로드</Button>
            </Upload>
        </ImgCrop>
    );
};

export default ImageUpload;