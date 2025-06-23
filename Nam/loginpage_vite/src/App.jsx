import React, { useState } from 'react';
import './css/App.css';
import Footer from './components/Footer';

function App() {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');


  const isFormValid = userId.trim() !== '' && password.trim() !== '';

  // 아이디, 비밀번호 둘 중 하나라도 공백 시 alert 메시지
  const handleSubmit = (e) => {
  e.preventDefault();
  if (!isFormValid) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }
  };


  return (
     
    <div>

      {/* // 전체 박스(footer 제외)  */}
      {/* 아이디 및 패스워드 입력란 */}
      <form className="wrap" onSubmit={handleSubmit}>
        <div className="typeIn">
            <label htmlFor="userId">
              아이디
            </label>
            <input id="userId" type="text" placeholder="ID" value={userId} onChange={(e) => setUserId(e.target.value)}></input>
        </div>    
        
        <div className="typeIn">
            <label htmlFor="password">
              패스워드
            </label>
            <input id="password" type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>    
        
        <br/>

        {/* 로그인 및 취소 버튼 */}
        <div className='buttons'>
          <button type="submit">로그인</button>
          <button type="reset">취소</button>
        </div>

        <br/>

        <div className="link">아직 회원이 아니시라면 <a href="">회원가입</a></div>
      </form>

      <Footer/>
    </div>

  );
}

export default App;
