import React, { useState } from 'react';
import '../CSS/LoginPage.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid = userId.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 회원가입 정보를 localStorage에서 불러와 확인
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (
      registeredUser &&
      registeredUser.userId === userId &&
      registeredUser.password === password
    ) {
      alert('로그인 성공!');
      localStorage.setItem('username', userId);
      navigate('/main');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <div>
        <form className="login_page_wrap" onSubmit={handleSubmit}>
          <div className="type_in">
            <div className="to_type">
              아이디
            </div>
            <input
              className="login_input"
              id="userId"
              type="text"
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="type_in">
            <div className="to_type">
              패스워드
            </div>
            <input
              className="login_input"
              id="password"
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <div className='login_buttons'>
            <button className="login_button" type="submit">로그인</button>
            <button className="login_button" type="reset">
              <a href="http://localhost:5173">취소</a>
            </button>
          </div>

          <br />

          <div className="login_to_signup_link">
            아직 회원이 아니시라면 <a href="http://localhost:5173/signup">회원가입</a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
