import './css/App.css';

function App() {
  return (
    // 전체 박스
    <div className="wrap">

      {/* 아이디 및 패스워드 입력란 */}
      <div className="typein">
          <label for="userid">
            아이디
          </label>
          <input id="userid" type="text" placeholder="ID" required></input>
      </div>    
      
      <div className="typein">
          <label for="userpw">
            패스워드
          </label>
          <input id="userpw" type="password" placeholder="PASSWORD" required></input>
      </div>    
      
      <br/>

      {/* 로그인 및 취소 버튼 */}
      <div className='buttons'>
        <button type="submit">로그인</button>
        <button type="reset">취소</button>
      </div>

      <br/>

      <div className="link">아직 회원이 아니시라면 <a href="">회원가입</a></div>
      
    </div>
  );
}

export default App;
