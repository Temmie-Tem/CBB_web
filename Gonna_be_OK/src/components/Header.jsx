import React from 'react';
import { useState, useEffect } from 'react';
import '../CSS/Header.css';
import { useNavigate } from "react-router-dom";


function Header() {

  // 1. 로그인 상태를 관리할 state 생성
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('loggedInUser');

    useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      // localStorage에 사용자 정보가 있으면, 로그인 상태로 간주
      setIsLoggedIn(true);
      // 저장된 JSON 문자열을 객체로 변환하여 사용자 이름 설정
      setUserName(JSON.parse(userData).name);
    } else {
      // 정보가 없으면 비로그인 상태
      setIsLoggedIn(false);
    }
  }, []); // []를 비워두어 처음 한 번만 실행되도록 설정

  const handleLogout = () => {
    // localStorage에서 사용자 정보를 삭제
    localStorage.removeItem('loggedInUser');
    // 로그인 상태를 false로 변경
    setIsLoggedIn(false);
    setUserName('');
    alert('로그아웃 되었습니다.');
    // 메인 페이지로 이동
    navigate('/main'); 
  };

    const navigate = useNavigate();
    
    return (
        <header className='main_header'>
            <div className='header_wrap'>
                <div className='header_logo'>
                    <img src='./src/img/Vitejs_logo.png' alt="image" />
                    <span>상담게시판</span>
                </div>
                <nav className='header_nav'>
                    <ul>
                        <li><a>Top Page</a></li>
                        <li><a>About Us</a></li>
                        <li><a>Services</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </nav>

                <div className='header_user'>
                    {isLoggedIn ? (
                    <button className="header_login" onClick={handleLogout}>
                        로그아웃
                    </button>
                    ) : (
                    <button className='header_login' onClick={() => navigate('/login')}>
                        로그인
                    </button>
                    )}

                    <button className='header_signup' onClick={() => navigate('/signup')}>
                        회원가입
                    </button>
                </div>
            </div>

        </header>
    )

}

export default Header;