import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/loginpage.css'; // CSS 파일 임포트

function LoginPage() {
  // 1. 아이디, 비밀번호, 에러 메시지를 위한 상태(State) 생성
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. 로그인 버튼 클릭 시 실행될 함수 (지금은 기능 구현 전)
  const handleSubmit = (e) => {
    e.preventDefault(); // form의 기본 제출 동작(새로고침)을 막음

    // 임시 에러 처리 로직 (나중에 API 연동 시 수정)
    if (!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    setError(''); // 성공 시 에러 메시지 초기화
    console.log('로그인 시도:', { userId, password });
    // TODO: 여기에 나중에 백엔드 로그인 API 호출 코드를 추가합니다.
  };

  return (
    // 3. 회원가입 페이지와 동일한 클래스 이름을 사용하여 구조 통일
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
            required
          />
        </div>

        {/* 4. 에러 메시지가 있을 때만 보이도록 설정 */}
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