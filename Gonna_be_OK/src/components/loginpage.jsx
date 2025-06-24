import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 임포트
import axios from 'axios'; // axios 임포트
import '../CSS/loginpage.css';

function LoginPage() {
  // 1. 입력 값과 에러 메시지를 위한 상태(State)
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 2. 로그인 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // form의 기본 제출 동작(새로고침)을 막음

    // 간단한 프론트엔드 유효성 검사
    if (!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 3. 백엔드 서버로 로그인 요청 전송
      const response = await axios.post('http://localhost:4000/api/login', {
        userId,
        password,
      });

      // 4. 로그인 성공 시 처리
      if (response.data.success) {
        alert(response.data.message); // "로그인 성공!" 메시지 표시

        // 사용자 정보를 localStorage에 저장하여 로그인 상태 유지
        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));

        // 메인 페이지로 이동
        navigate('/main');
      }
    } catch (err) {
      // 5. 로그인 실패 시 처리
      // 서버에서 보낸 에러 메시지가 있다면 그것을 표시, 없다면 기본 메시지 표시
      const errorMessage = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Login API failed:', err);
    }
  };

  return (
    <div className="auth-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력하세요"
            autocomplete="username" // 자동완성 내용을 아이디로 인식되게 함
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autocomplete="password" // 자동완성 내용을 패스워드로 인식되게 함
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="submit-btn">
          로그인
        </button>
      </form>
      <div className="links">
        <Link to="/signup">회원가입</Link>
        <Link to="/find-id">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default LoginPage;