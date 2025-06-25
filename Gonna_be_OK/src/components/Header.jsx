import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext 훅 임포트
import logoImage from '../img/Vitejs_logo.png'; // 로고 이미지를 import 합니다.
import '../CSS/Header.css'; // CSS 파일 임포트

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth(); // Context에서 상태와 함수 가져오기
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert('로그아웃 되었습니다.');
        navigate('/'); // 로그아웃 후 메인 페이지로 이동
    };

    return (
        <header className="main_header">
            <div className="header_wrap">
                {/* 로고: 클릭하면 메인 페이지로 이동합니다. */}
                <div className="header_logo">
                    <Link to="/">
                        <img src={logoImage} alt="Gonna be OK Logo" />
                        <span>상담게시판</span>
                    </Link>
                </div>

                {/* 네비게이션 메뉴 (기존 메뉴 복원) */}
                <nav className="header_nav">
                    <ul>
                        <li><Link to="/">Top Page</Link></li>
                        <li><Link to="/board">게시판</Link></li>
                        {/* 아래 링크들은 예시이며, 실제 경로에 맞게 수정이 필요할 수 있습니다. */}
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>

                {/* 사용자 메뉴 (로그인/로그아웃) */}
                <div className="header_user">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome_user">{user?.name} 님</span>
                            <button className="header_btn" onClick={handleLogout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <button className="header_btn" onClick={() => navigate('/login')}>로그인</button>
                            <button className="header_btn" onClick={() => navigate('/signup')}>회원가입</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
