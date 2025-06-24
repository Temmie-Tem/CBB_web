import React from 'react';
import '../CSS/Header.css';
import { useNavigate } from "react-router-dom";

function Header() {

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
                    <button className='header_login' onClick={() => navigate('/login')}>
                        로그인
                    </button>
                    <button className='header_signup' onClick={() => navigate('/signup')}>
                        회원가입
                    </button>
                </div>
            </div>

        </header>
    )

}

export default Header;