import { Button, Modal } from 'antd';
import React, { useState } from 'react';

function prevAfterWord() {
    console.log('prevAfterWord');
}
function nextAfterWord() {
    console.log('nextAfterWord');
}

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
                    <span>2023.03.21</span>
                </div>
            </div>
            <Modal title={date + ' 후기'} open={popupOpen} onOk={closePopup} onCancel={closePopup} centered footer={[
                <Button type="text" onClick={prevAfterWord} >이전</Button>,
                <Button type="text" onClick={nextAfterWord}>다음</Button>
            ]}>
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
            <AfterWord />
            <AfterWord />
            <AfterWord />
        </div>
    );
};

export { AfterWord, AfterWordList };