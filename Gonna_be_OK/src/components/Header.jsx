import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(userData).name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUserName('');
    alert('로그아웃 되었습니다.');
    navigate('/main');
  };

  return (
    <header className="main_header">
      <div className="header_wrap">
        <div className="header_logo">
          <img src="./src/img/Vitejs_logo.png" alt="logo" />
          <span>상담게시판</span>
        </div>

        <nav className="header_nav">
          <ul>
            <li><Link to="/">Top Page</Link></li>
            <li><Link to="/main">About Us</Link></li>
            <li><Link to="/main">Services</Link></li>
            <li><Link to="/main">Contact</Link></li>
          </ul>
        </nav>

        <div className="header_user">
          {isLoggedIn ? (
            <>
              <span className="welcome_user">{userName} 님</span>
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
}

export default Header;
