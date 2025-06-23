import PostViewPage from './PostViewPage';

function App() {
  // 테스트용 더미 데이터 만들기
  const samplePost = {
    title: '예시 게시글 제목',
    author: '홍길동',
    date: '2025-06-23',
    views: 123,
    content: '이것은 게시글 내용입니다.',
    isAuthor: true,
    comments: [
      { author: '관리자', content: '안녕하세요. 답변드립니다.' },
      { author: '사용자1', content: '좋은 글이네요!' }
    ]
  };

  return (
    <div>
      <PostViewPage post={samplePost} />
    </div>
  );
}

export default App;
