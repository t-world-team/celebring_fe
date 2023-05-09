import React from 'react';

const google = process.env.PUBLIC_URL + '/google_login.png';
const kakao = process.env.PUBLIC_URL + '/kakao_login.png';
const naver = process.env.PUBLIC_URL + '/naver_login.png';

const LoginPage = (props) => {
    return (
        <div className="social-login">
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div className="social-image">
                <img src={google} alt="google login"/>
            </div>
            <div className="social-image">
                <img src={kakao} alt="kakao login"/>
            </div>
            <div className="social-image">
                <img src={naver} alt="naver login"/>
            </div>
        </div>
    )
}

export { LoginPage };