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
        

        <Footer />
      </div>
    </>
  );
}

export default App;
