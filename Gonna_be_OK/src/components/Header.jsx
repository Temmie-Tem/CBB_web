import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';
// 헤더 스타일

function Header() {   //본 컴포넌트를 선언
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 여부를 확인하기위한 함수(setIsLoggedIn). 디폴트값은 "false"즉 비 로그인
  const [userName, setUserName] = useState(''); // 로그인 한 유저의 이름을 저장할 변수(setUserName). 디폴트값은 빈 문자열
  const navigate = useNavigate(); // 경로 변경(흔히 말하는 페이지 이동) 을 위한 navigate함수

  useEffect(() => {
  const userData = localStorage.getItem('loggedInUser');  // 브라우저의 localStorage에서 loggedInUser로 저장된 데이터를 userData에 할당.
  try {
    const parsed = JSON.parse(userData);
    setIsLoggedIn(true);
    setUserName(parsed.name);
  } catch (e) {
    setIsLoggedIn(false);
    setUserName('');
  } 
  // 넘겨받은 userData를 JSON으로 파싱 시도. 
  // 성공하면(로그인 해서 사용자의 이름을 전달받을 시)isLoggedIn을 true로 변경, userName을 넘겨받은 사용자 이름으로 설정
  // 간단히 말해 로그인 유저의 이름을 저장.

}, []); // effect는 한 번만(마운트 시) 실행


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUserName('');
    alert('로그아웃 되었습니다.');
    navigate('/main');
  };  // 로그아웃 기능, 로그아웃 후 alert 출력, 메인페이지로 이동.

  return (
    <header className="main_header">
      <div className="header_wrap">
        <div className="header_logo">
          <img src="./src/img/Vitejs_logo.png" alt="logo" />
          <span>상담게시판</span>
        </div>
          {/* 헤더의 좌측, 로고와 사이트명의 출력 */}

        <nav className="header_nav">
          <ul>
            <li><Link to="/">Top Page</Link></li>
            <li><Link to="/main">About Us</Link></li>
            <li><Link to="/main">Services</Link></li>
            <li><Link to="/main">Contact</Link></li>
          </ul>
        </nav>
        {/* 단순히 메인페이지로 이동시키는 기능으로 통일한 텍스트 */}

        <div className="header_user">
          {isLoggedIn ? ( 
            // 로그인 상태 인지 아닌지를 확인
            <>
              <span className="welcome_user">{userName} 님</span>
              <button className="header_btn" onClick={handleLogout}>로그아웃</button>
            </>
            // true(로그인 상태)일 경우 출력할 버튼
          ) : (
            <>
              <button className="header_btn" onClick={() => navigate('/login')}>로그인</button> {/* 로그인 페이지로 이동하는 버튼 */}
              <button className="header_btn" onClick={() => navigate('/signup')}>회원가입</button>  {/* 회원가입 페이지로 이동하는 버튼 */}
            </>
            // false(비 로그인 상태)일 경우 출력할 버튼
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
