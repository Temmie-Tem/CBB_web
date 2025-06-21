import { useState } from 'react'
import './App.css'
import './CSS/List_style.css'

function App() {
  const [count, setCount] = useState(0);
  
  const [searchText, setSearchText] = useState('');
  // 검색 텍스트를 보존하기 위한 State를 정의.

  const handleSubmit = (event) => {
    // handlebubmit함수
    event.preventDefault();
    // 폼 전송에 따른 페이지 리프레시를 방지

    console.log('검색키워드', searchText);
    // 확인용(통합 테스트 후 출고시 삭제하는게 좋을것으로 보임.)
    
    setSearchText('');
    // 검색 후 입력란의 텍스트 초기화.
  }

  return (
    <>
      {/* 검색바 전체 */}
      <div className='search_box'>

        {/* 검색 카테고리 선택 버튼*/}
        <button className='search_filter_button'>
          <span className='search_filter_text'>
            카테고리
          </span>
          <span className='search_filter_icon'>
            V
          </span>
        </button>
        {/* // 검색 카테고리 선택 버튼*/}

        {/* 검색 입력창 */}
        <form className='search_form' onSubmit={handleSubmit}>
            {/* onSubmit프로퍼티 : 폼이 송신 되었을 때 실행할 js함수handleSubmit */}
          <input type="text" 
            className='search_input'
            placeholder='검색어를 입력 하시오.'
            value={searchText}
            // staet의 값과 연동
            onChange={(e) => setSearchText(e.target.value)}
            // 입력값이 변동되면 state를 갱신
          />
        </form>
        {/* // 검색 입력창 */}

        {/* 검색버튼 */}
        <button type='submit' className="search_button">
          {/* 검색버튼에 제출 기능 부여 */}
          검색
        </button>
        {/* // 검색버튼 */}
      </div>
      {/* // 검색바 전체 */}

      <h1>Vite Only</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
