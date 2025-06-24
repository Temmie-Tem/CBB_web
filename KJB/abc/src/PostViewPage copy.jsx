// components/PostViewPage.jsx
import React from 'react';
import './post_view_style.css';

const PostViewPage = ({ post }) => {
  // 관리자 댓글 존재 여부 판단
  const hasAdminReply = post.comments?.some(comment => comment.author === '관리자');

  // 작성자 이름 함수
  const maskAuthor = (name) => {
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name.slice(-1);
  };

  return (
    <div className="post_view_wrapper">
      {/* 게시글 제목 */}
      <h1 className="post_title">{post.title}</h1>

      {/* 게시글 정보 */}
      <div className="post_meta">
        <span className="post_status">
          {hasAdminReply ? '답변 완료' : '답변 대기중'}
        </span>
        <span className="post_author">작성자: {maskAuthor(post.author)}</span>
        <span className="post_date">작성일: {post.date}</span>
        <span className="post_views">조회수: {post.views}</span>
      </div>

      {/* 게시글 본문 */}
      <div className="post_content">
        {post.content}
      </div>

      {/* 댓글 목록 */}
      <div className="comment_section">
        <h3>댓글</h3>
        {post.comments.length > 0 ? (
          <ul>
            {post.comments.map((c, i) => (
              <li key={i}>
                <strong>{c.author}:</strong> {c.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="post_buttons">
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
