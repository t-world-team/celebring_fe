import { Modal } from 'antd';
import React, { useState } from 'react';

const AfterWord = (props) => {
    const [popupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    }
    const closePopup = () => {
        setPopupOpen(false);
    }

    const date = props.date ? props.date : 'yyyy.mm.dd';
    return (
        <div className="aw-item">
            <div className="aw-wrapper" onClick={openPopup}>
                <div className="aw-image">
                    <img alt="sek" src="https://pbs.twimg.com/media/FufOmIxWIAA_dNm?format=jpg" />
                </div>
                <div className="aw-detail">
                    <p className="aw-title">후기 제목</p>
                    <span>2023.03.21</span>
                </div>
            </div>
            <Modal title={date + ' 후기'} open={popupOpen} onOk={closePopup} onCancel={closePopup} centered footer={null}>
                <div className="aw-pop-content">
                    <div className="aw-pop-image">
                        <img alt="sek" src="https://pbs.twimg.com/media/FufOmIxWIAA_dNm?format=jpg" />
                    </div>
                    <p>후기 내용 후기 내용 후기 내용 후기 내용 후기 내용 </p>
                </div>
            </Modal>
        </div>
    );
};

const AfterWordList = (props) => {
    return (
        <div className="aw-list">
            <AfterWord />
            <AfterWord />
            <AfterWord />
        </div>
    );
};

export { AfterWord, AfterWordList };