import React from 'react';
import '../CSS/Header_style.css';

function Header() {
    return (
        <header className='main_header'>
            <div className='header_wrap'>
                <div className='header_logo'>
                    <img src="" alt="image" />
                    <span>상담개시판</span>
                </div>
                <nav className='header_nav'>
                    <ul>
                        <li><a href="#home"></a></li>
                        <li><a href="#about"></a></li>
                        <li><a href="#services"></a></li>
                        <li><a href="#contact"></a></li>
                    </ul>
                </nav>
                <div className='header_user_actions'>
                    <button className='header_login'>
                        로그인
                    </button>
                    <button className='header_signup'>
                        회원가입
                    </button>
                </div>
            </div>
        </header>
    )

}

export default Header;