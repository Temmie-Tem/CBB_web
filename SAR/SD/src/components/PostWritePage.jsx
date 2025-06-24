import React, { useState } from 'react';
import "../css/post_write_page.css"; // CSS 파일 import

function PostWritePage() {
  // 상태 정의
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // 로그인 버튼 클릭 시
  const handleLogin = () => {
    alert("로그인 기능은 아직 구현되지 않았습니다.");
  };

  // 회원가입 버튼 클릭 시
  const handleSignup = () => {
    alert("회원가입 기능은 아직 구현되지 않았습니다.");
  };

  // 게시글 작성 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!writer.trim()) {
      alert('작성자를 입력하세요.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    console.log('작성자:', writer);
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('파일:', file);

    alert('게시글이 작성되었습니다.');
  };

  // 작성 취소 버튼 클릭 시
  const handleCancel = () => {
    setWriter('');
    setTitle('');
    setContent('');
    setFile(null);
    alert('작성이 취소되었습니다.');
  };

  // 파일 첨부 변경
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
    <div className="banner_title">상담게시판</div>

      {/* 네비게이션 바 */}
      <ul className="nav_bar">
        <li><a href="/">공지사항</a></li>
        <li><a href="/">기관소개</a></li>
        <li><a href="/">온라인상담</a></li>
        <li><a href="/">자료실</a></li>

        <li className="nav_right">
          <button className="btn_login" onClick={handleLogin}>로그인</button>
          <button className="btn_signup" onClick={handleSignup}>회원가입</button>
          </li>
      </ul>

     <div className ="post_write_wrapper">
      <h1 className="page_title">온라인 상담 게시판</h1>
      <p className="required_note"><span className="required_mark">●</span>는 필수 입력 항목입니다.</p>

    <form onSubmit={handleSubmit}>
      <table className="write_table">
        <tbody>
          <tr>
            <th><span className="required_mark">●</span>작성자</th>
            <td>
              <input
                type="text"
                className="input_writer"
                placeholder="작성자"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th><span className="required_mark">●</span>제목</th>
            <td>
              <input
                type="text"
                className="input_text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th><span className="required_mark">●</span>내용</th>
            <td>
              <textarea
                className="textarea_content"
                placeholder="상담 내용을 입력하세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <input
                type="file"
                className="input_file"
                onChange={handleFileChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="button_group">
        <button className="btn_submit" onClick={handleSubmit}>게시글 작성</button>
        <button className="btn_cancel" onClick={handleCancel}>작성 취소</button>
      </div>
    </form>
    </div>
    </>
  );    
}

export default PostWritePage;