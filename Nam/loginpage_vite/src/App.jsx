import './css/App.css';

function App() {
  return (
    <div className="wrap">
      <div className="typein">
          <label for="id">
            아이디
          </label>
          <input id="id" type="text" placeholder="ID" required></input>
      </div>    
      
      <div className="typein">
          <label for="password">
            패스워드
          </label>
          <input id="password" type="password" placeholder="PASSWORD" required></input>
      </div>    
      

      <br/>

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
