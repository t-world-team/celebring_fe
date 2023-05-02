import React from 'react';

const AfterWord = (props) => {
    return (
        <div className="aw-item">
            <div className="aw-wrapper">
                <div className="aw-image">
                    <img alt="sek" src="https://pbs.twimg.com/media/FufOmIxWIAA_dNm?format=jpg" />
                </div>
                <div className="aw-detail">
                    <p className="aw-title">후기 제목</p>
                    <span>2023.03.21</span>
                </div>
            </div>
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