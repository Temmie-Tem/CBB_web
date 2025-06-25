import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router에서 네비게이트를 인포트 해서 페이지 이동 기능을 쓸 수 있게.

import '../CSS/MainPage.css';
import '../CSS/BoardList.css';  // BoardList.jsx 에도 인포트 되었다. 고로 의미는 없으나 이렇게 오야에 몰아주는 형태도 기능상 문제 없다.

import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import BoardList from './BoardList';
// 페이지 내에 출력할 다른 컴포넌트들을 인포트

function MainPage() {
  const [searchText, setSearchText] = useState(''); 
  // 검색창을 만들기 위해, 검색어를 담는 함수 searchText, 갱신할 함수 setSearchText를 선언, 디폴트값은 빈 문자열.
  const navigate = useNavigate(); // 실제로 네비게이트(페이지 이동)을 사용할 navigate함수를 선언

  // 검색 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    const search_box = /^[가-힣a-zA-Z0-9]{2,15}$/;  //한글, 영문, 숫자 최소 2문자, 최대 15문자 라는 정규표현식
    if (!search_box.test(searchText)) {
      alert('한글 혹은 영문 2~15글자 이내로 입력해 주세요.');   // 정규표현식을 따르지 않은체 제출할 시 alert
      return;
    }
    console.log('검색키워드', searchText);  
    setSearchText('');  // 정규표현식을 따랐을 경우 콘솔에 출력하고 searchText를 디폴트값인 빈 문자열로 되돌린다.
  };

  return (
    <>  {/* 불필요한 최상위 요소 생성을 방지하는 Fragment */}
      <div className='main_content_wrapper'>
        <Header />
        <Banner />

        {/* 검색창 */}
        <div className='search_box'>
          <button className='search_filter_button'>
            <span className='search_filter_text'>카테고리</span>
            <span className='search_filter_icon'>▼</span>
          </button> {/* 버튼으로서 반응만 하고, 실제 리스트박스, 검색 카테고리 지정 기능은 없음 */}
          <form className='search_form' onSubmit={handleSubmit}>
            <input
              type="text"
              className='search_input'
              placeholder='검색어를 입력 하시오.'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            /> {/* 검색어를 입력하면, 입력창 객체 에서 문자를 꺼내 searchText에 해당 문자를 반영 */}
             {/* 검색어 입력 폼 */}
            <button type='submit' className="search_button">검색</button> 
            {/* 실제 검색 기능은 포함되지 않고, 제출해서 폼 내용을 초기화 하는 기능만 한다. */}
          </form>
        </div>
        {/* // 검색창 */}

        <BoardList />
        

        <Footer />
      </div>
    </>
  );
}

export default MainPage;
