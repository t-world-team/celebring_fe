import React from 'react';

const google = process.env.PUBLIC_URL + '/google_login.png';
const kakao = process.env.PUBLIC_URL + '/kakao_login.png';
const naver = process.env.PUBLIC_URL + '/naver_login.png';

function oauthLogin(service) {
    //window.open(`http://localhost:8090/login/auth/${service}`, '_blank');
}

const LoginPage = (props) => {
    return (
        <div className="social-login-wrap">
            <div className="social-title"><h3>CELEBRING</h3></div>
            <div className="social-login">
                <script src="https://accounts.google.com/gsi/client" async defer></script>
                <div className="social-login-buttons">
                    <div className="social-login-button google">
                        <div className="social-login-logo">
                            <img src={google} alt="google login" onClick={() => oauthLogin('google')}/>
                        </div>
                        <span>구글로 로그인</span>
                    </div>
                    <div className="social-login-button kakao">
                        <div className="social-login-logo">
                            <img src={kakao} alt="kakao login" onClick={() => oauthLogin('kakao')}/>
                        </div>
                        <span>카카오로 로그인</span>
                    </div>
                    <div className="social-login-button naver">
                        <div className="social-login-logo">
                            <img src={naver} alt="naver login" onClick={() => oauthLogin('naver')}/>
                        </div>
                        <span>네이버로 로그인</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { LoginPage };