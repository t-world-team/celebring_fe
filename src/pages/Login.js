import { Modal } from 'antd';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth-context';

const google = process.env.PUBLIC_URL + '/google_login.png';
const kakao = process.env.PUBLIC_URL + '/kakao_login.png';
const naver = process.env.PUBLIC_URL + '/naver_login.png';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const auth = useContext(AuthContext);

    let location = useLocation();
    let backgroundLocation = location.state?.backgroundLocation;

    if(params.get("token") !== null) {
        auth.login(params.get("token"));
        navigate("/");
    }

    return (
        <Modal
            centered
            open={true}
            onCancel={() => navigate(backgroundLocation.pathname)}
            footer={null}
            className="login-popup-wrap"
          >
            <div className="social-login-wrap">
                <div className="social-title"><h3>CELEBRING</h3></div>
                <div className="social-login">
                    <script src="https://accounts.google.com/gsi/client" async defer></script>
                    <div className="social-login-buttons">
                        <Link to={`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`} className="social-login-button google">
                            <div className="social-login-logo">
                                <img src={google} alt="google login"/>
                            </div>
                            <span>구글로 로그인</span>
                        </Link>
                        <Link to={`${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`} className="social-login-button kakao">
                            <div className="social-login-logo">
                                <img src={kakao} alt="kakao login"/>
                            </div>
                            <span>카카오로 로그인</span>
                        </Link>
                        <Link to={`${process.env.REACT_APP_API_URL}/oauth2/authorization/naver`} className="social-login-button naver">
                            <div className="social-login-logo">
                                <img src={naver} alt="naver login"/>
                            </div>
                            <span>네이버로 로그인</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export { LoginPage };