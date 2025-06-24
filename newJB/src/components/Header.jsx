import React, { useState } from 'react';
import '../css/Header_style.css'; 
import viteLogo from '../assets/Vitejs_logo.png';

function Header() {
    const [isLoggedOut, setIsLoggedOut] = useState(false); 

    const handleLogout = () => {
        alert('로그아웃 되었습니다.'); 
        
        // 이 아래 코드들은 '자동으로 사라지는' 메시지 박스를 만들 때 쓰는 거라,
        // '확인' 버튼을 눌러야 사라지게 하려면 이 부분들은 사용하지 않아야 함.
        // setIsLoggedOut(true); 
        // setTimeout(() => {
        //     setIsLoggedOut(false);
        // }, 3000);
    };

    return (
        <header className='main_header'>
            <div className='header_wrap'>
                <div className='header_logo'>
                     {/* ➕ img src에 위에서 import 한 변수 이름(viteLogo)을 넣어줘! */}
                    <img src={viteLogo} alt="Vite 로고" 
                    style={{ height: '30px', marginRight: '10px', verticalAlign: 'middle' }} /> 
                    <span>상담게시판</span>
                </div>
                <nav className='header_nav'>
                    <ul>
                        <li><a href="#home">Top Page</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">services</a></li>
                        <li><a href="#contact">contact</a></li>
                    </ul>
                </nav>

                <div className='header_user'>
                    <button className='header_logout' onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>

            {/* {isLoggedOut && (
                <div className="logout_form">
                    로그아웃 되었습니다.
                </div>
            )} */}
        </header>
    );
}

export default Header;