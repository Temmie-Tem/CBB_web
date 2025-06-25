// PostViewPage.jsx

// 리액트 기능 임포트 (useState 추가)
import React, { useState, useEffect } from 'react';   // useEffect 추가.

import { useParams } from 'react-router-dom'; // 게시글 ID 추출용
import axios from '../axios';    // 게시글 API 호출용

// CSS 파일 임포트
import '../CSS/PostViewPage.css';

// PostViewPage 컴포넌트 생성 (파스칼 표기법 준수)
function PostViewPage() {
  // --- 함수 및 변수 선언 영역 ---

  const { id } = useParams(); // URL에서 게시글 ID 추출
  const [post, setPost] = useState(null); // 게시글 데이터 상태 변수

  // (수정됨!) 댓글창의 placeholder 내용을 기억할 상태 변수 생성
  const [commentPlaceholder, setCommentPlaceholder] = useState('댓글을 남겨주세요 :)');

  // [추가] 게시글 데이터 불러오기 (컴포넌트 마운트 시 실행)
  useEffect(() => {
    // axios.get(`http://localhost:4000/api/posts/${id}`)
    axios.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error('게시글 불러오기 실패:', err);
        setPost(null);
      });
  }, [id]);

  // (추가됨!) 댓글창을 클릭했을 때(포커스 되었을 때) 실행될 함수
  const HandleCommentFocus = () => {
    // placeholder 내용을 빈칸으로 변경해서, 안내 문구가 사라지게 함
    setCommentPlaceholder('');
  };

  // 게시글 수정 버튼 핸들러 (기능 구현 필요)
  const HandleEditClick = () => {
    alert('수정 버튼 클릭 (기능 구현 필요)');
  };

  // 게시글 삭제 버튼 핸들러 (기능 구현 필요)
  const HandleDeleteClick = () => {
    alert('삭제 버튼 클릭 (기능 구현 필요)');
  };

  // 댓글 등록 버튼 핸들러 (기능 구현 필요)
  const HandleCommentSubmit = () => {
    alert('댓글 등록 버튼 클릭 (기능 구현 필요)');
  };

  // 목록 이동 버튼 핸들러 (기능 구현 필요)
  const HandleGoToList = () => {
    alert('목록 이동 버튼 클릭 (기능 구현 필요)');
  };


  // [추가] 데이터 로딩 전 대기
  if (!post) return <div>로딩 중 또는 게시글을 찾을 수 없습니다.</div>;

  // --- JSX 렌더링 영역 ---
  return (
    // PostViewPage 전체를 감싸는 고유한 컨테이너
    <div className="PostViewPage_container">

      {/* ... 다른 부분은 그대로 ... */}
      <h1 className="PostViewPage_title">{post.title}</h1>    {/* DB의 개시글 제목을 로드 */}
      <div className="PostViewPage_meta_data">
        {/* [수정] 게시글 번호, 작성자, 작성일, 상태 모두 DB 연동 */}
        <span>번호: {post.id}</span>
        <span>작성자: {post.userId}</span>
        <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="PostViewPage_status"> - {post.status} - </span>
      </div>

      <div className="PostViewPage_content">
        {/* 🔄 [수정] 게시글 본문 내용 출력 */}
        <p>{post.content}</p>
      </div>
      <div className="PostViewPage_action_buttons">
        <button className="PostViewPage_button" onClick={HandleEditClick}>수정</button>
        <button className="PostViewPage_button" onClick={HandleDeleteClick}>삭제</button>
      </div>

      {/* 댓글 섹션 */}
      <div className="PostViewPage_comment_section">
        <h2 className="PostViewPage_comment_header">댓글</h2>
        
        {/* 댓글 작성 영역 */}
        <div className="PostViewPage_comment_write_area">
          {/* (수정됨!) placeholder와 onFocus 속성 추가 */}
          <textarea
            className="PostViewPage_comment_input"
            placeholder={commentPlaceholder}
            onFocus={HandleCommentFocus}
          ></textarea>
          <button className="PostViewPage_button PostViewPage_comment_submit_button" onClick={HandleCommentSubmit}>등록</button>
        </div>

        {/* 댓글 목록 */}
        <ul className="PostViewPage_comment_list">
          {/* 댓글 아이템 예시 1 */}
          <li className="PostViewPage_comment_item">
            <div className="PostViewPage_comment_author">개발자</div>
            <div className="PostViewPage_comment_text">답변 드립니다.</div>
            <div className="PostViewPage_comment_date">2025-06-25</div>
          </li>
          {/* 댓글 아이템 예시 2 */}
          <li className="PostViewPage_comment_item">
            <div className="PostViewPage_comment_author">이용자</div>
            <div className="PostViewPage_comment_text">그게 답이야?</div>
            <div className="PostViewPage_comment_date">2025-06-25</div>
          </li>
        </ul>
      </div>

      {/* 목록 이동 버튼 컨테이너 */}
      <div className="PostViewPage_list_button_container">
        <button className="PostViewPage_button PostViewPage_list_button" onClick={HandleGoToList}>목록</button>
      </div>

    </div>
  );
}

// PostViewPage 컴포넌트 내보내기
export default PostViewPage;