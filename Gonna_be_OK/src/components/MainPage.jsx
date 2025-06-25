import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../CSS/MainPage.css';
import '../CSS/BoardList.css';

import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import BoardList from './BoardList';

function App() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // ✅ 글쓰기 버튼 클릭 시 로그인 확인
  const handleWriteClick = () => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/login");
    } else {
      try {
        JSON.parse(storedUser); // 유효한 JSON인지 확인
        navigate("/postwrite");
      } catch (e) {
        alert("로그인 정보가 잘못되었습니다.");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      }
    }
  };

  // ✅ 검색 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    const search_box = /^[가-힣a-zA-Z0-9]{2,15}$/;
    if (!search_box.test(searchText)) {
      alert('한글 혹은 영문 2~15글자 이내로 입력해 주세요.');
      return;
    }
    console.log('검색키워드', searchText);
    setSearchText('');
  };

  return (
    <>
      <div className='main_content_wrapper'>
        <Header />
        <Banner />

        {/* 검색창 */}
        <div className='search_box'>
          <button className='search_filter_button'>
            <span className='search_filter_text'>카테고리</span>
            <span className='search_filter_icon'>▼</span>
          </button>
          <form className='search_form' onSubmit={handleSubmit}>
            <input
              type="text"
              className='search_input'
              placeholder='검색어를 입력 하시오.'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type='submit' className="search_button">검색</button>
          </form>
        </div>


        <BoardList />
        <div className="write_button_wrapper" style={{ textAlign: 'right', margin: '20px 10px' }}>
          <button className="write_button" onClick={handleWriteClick}>
            글쓰기
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
