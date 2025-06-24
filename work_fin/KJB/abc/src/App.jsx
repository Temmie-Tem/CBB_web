import Header from './Header';
import PostViewPage from './PostViewPage.jsx';
import './Header_style.css';
import './post_view_style.css';
import Footer from './Footer'; 
import './Footer_style.css'; 

// import Banner from './Banner';
// import './Banner_style.css'; 

function App() {
  // 테스트용 더미 데이터 만들기
  const samplePost = {
    id: '123', 
    title: '게시글 제목',
    author: '홍길동의동해번쩍',
    date: '2025-06-23',
    views: 123,
    content: '이것은 게시글 내용입니다.',
    isAuthor: true,
    comments: [
      // 여기에 date 속성 추가!
      { author: '관리자', content: '안녕하세요. 답변드립니다.', date: '2025.06.23' },
      // 다른 사용자 댓글에도 date 속성 추가 (선택 사항)
      { author: '사용자1', content: '좋은 글이네요!', date: '2025.06.23' }
    ]
    
  };

  return (
    <div>
       <div> 
      <Header /> {/* Header 블록을 제일 위에 */}
      
      <PostViewPage post={samplePost} /> {/* 게시글 페이지 블록 바로 아래에 놔주기! */}

      <Footer />
    </div>
      
    </div>
    
  );
}

export default App;
