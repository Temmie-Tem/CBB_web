// components/PostViewPage.jsx
import React from 'react';
import '../CSS/post_view_style.css'; 
// CSS 파일 경로는 그대로 유지.


const PostViewPage = ({ post }) => {
  // 관리자 댓글 존재 여부 판단.
  const hasAdminReply = post.comments?.some(comment => comment.author === '관리자');

  // 작성자 이름 마스킹 함수.
  const maskAuthor = (name) => {
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name.slice(-1);
  };

  return (
    <div className="post_view_wrapper"> {/* 기존 클래스 이름 유지. */}
      {/* 게시글 제목 */}
      <h1 className="post_view_title">{post.title}</h1> {/* 클래스 이름 변경. */}

      {/* 게시글 정보 */}
      <div className="post_view_meta"> {/* 클래스 이름 변경. */}
         {/* 게시글 번호 추가 시작 */}
        {post.id && <span className="post_view_id">번호: {post.id}</span>} {/* 게시글 번호 표시. */}
        {/* 게시글 번호 추가 끝 */}
        <span className="post_view_status"></span>
        <span className="post_view_status"> {/* 클래스 이름 변경. */}
          {hasAdminReply ? '답변 완료' : '답변 진행중'}
        </span>
        <span className="post_view_author">작성자: {maskAuthor(post.author)}</span> {/* 클래스 이름 변경. */}
        <span className="post_view_date">작성일: {post.date}</span> {/* 클래스 이름 변경. */}
      </div>

      {/* 게시글 본문 */}
      <div className="post_view_content"> {/* 클래스 이름 변경. */}
        {post.content}
      </div>

      {/* 댓글 목록 */}
      <div className="post_view_comment_section"> {/* 클래스 이름 변경. */}
        <h3>댓글</h3>
        {post.comments.length > 0 ? (
          <ul>
            {post.comments.map((c, i) => (
              <li key={i}>
                <strong>{c.author}</strong>: {c.content}
                {c.date && <span className="post_view_comment_date"> ({c.date})</span>} {/* 클래스 이름 변경. */}
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글 없음.</p>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="post_view_buttons"> {/* 클래스 이름 변경. */}
        <button onClick={() => alert('목록으로 이동')}>목록</button>
        {post.isAuthor && (
          <>
            <button onClick={() => alert('수정 기능')}>수정</button>
            <button onClick={() => alert('삭제 기능')}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostViewPage;