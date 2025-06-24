import { useState, useEffect } from 'react';  
// 로그인 페이지로 이동
import '../CSS/MainPage.css'
import '../CSS/BoardList.css'
import BoardList from './BoardList'; 
// 개시판
import Header from './Header';
// 헤더
import Banner from './Banner';
// 배너
import Footer from './Footer'
// 푸터
import { useNavigate } from 'react-router-dom';
// 네비게이트 기능을 위한 훅


function App() {
  const [searchText, setSearchText] = useState('');
  // 검색 텍스트를 보존하기 위한 State를 정의.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 상태를 보존하기 위한 State를 정의.
  const navigate = useNavigate();
  // useNavigate 훅을 사용하여 페이지 이동 기능을 정의.

  const handleSubmit = (event) => {
    // handlebubmit함수
    event.preventDefault();
    // 폼 전송에 따른 페이지 리프레시를 방지

    // =======================================
    // 검색어 유효성 검사
    const search_box = /^[가-힣a-zA-Z0-9]{2,15}$/;
    // 한글, 영문, 2~15자 정규식

    if (!search_box.test(searchText)){
      alert('한글 혹은 영문 2~15글자 이내로 입력해 주세요.');
      return;
    }
    // =======================================

    console.log('검색키워드', searchText);
    // 확인용(통합 테스트 후 출고시 삭제하는게 좋을것으로 보임.)
    
    setSearchText('');
    // 검색 후 입력란의 텍스트 초기화.

  };

  const handleWriteClick = () => {
    // 게시글 작성 버튼 클릭 핸들러
    if (isLoggedIn) {
      // 로그인 상태일 때
      navigate('/PostWritePage');
      // 게시글 작성 페이지로 이동
    } else {
      // 로그인 상태가 아닐 때
      alert('로그인 후 글쓰기가 가능합니다.');
      navigate('/login');
      // 로그인 페이지로 이동
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    // 로컬 스토리지에서 사용자 이름을 가져옴
    setIsLoggedIn(!!username);
    // 사용자 이름이 존재하면 로그인 상태를 true로 설정, 아니면 false로 설정

  }, []);

  return (
    <>
    <div className='main_content_wrapper'>
      {/* 전체 컨텐츠 조정용 클라스 삽입 */}

      <Header />
      <Banner />

      {/* 검색바 전체 */}
      <div className='search_box'>
        {/* 검색 카테고리 선택 버튼*/}
        <button className='search_filter_button'>
          <span className='search_filter_text'>
            카테고리
          </span>
          <span className='search_filter_icon'>
            ▼
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
            // state의 값과 연동
            onChange={(e) => setSearchText(e.target.value)}
            // 입력값이 변동되면 state를 갱신
          />
        {/* // 검색 입력창 */}

        {/* 검색버튼 */}
        <button type='submit' className="search_button">
          {/* 검색버튼에 제출 기능 부여 */}
          검색
        </button>
        {/* // 검색버튼 */}

        </form>

      </div>
    
      {/* // 검색바 전체 */}

      <BoardList />
      {/* 개시글 목록 */}

    <Footer />
    </div>    
  </>
  )
}

export default App
