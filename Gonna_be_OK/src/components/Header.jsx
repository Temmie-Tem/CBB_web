import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';

function Header() {
  return (
    <header className="main_header">
      <div className="header_wrap">
        <div className="header_logo">
          <img src="./src/img/Vitejs_logo.png" alt="logo" />
          <span>상담게시판</span>
        </div>

        <nav className="header_nav">
          <ul>
            {/* 메인페이지로 이동되게 변경 */}
            <li><Link to="/">Top Page</Link></li> 
            <li><Link to="/main">About Us</Link></li>
            <li><Link to="/main">Services</Link></li>
            <li><Link to="/main">Contact</Link></li>
          </ul>
        </nav>

        <div className="header_user">
          <Link to="/login" className="header_btn">로그인</Link>
          <Link to="/signup" className="header_btn">회원가입</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
