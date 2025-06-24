import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../CSS/post_write_page.css";

function PostWritePage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

   // 로그인 상태 확인 및 사용자 이름 세팅
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('제목을 입력하세요.');
    if (!content.trim()) return alert('내용을 입력하세요.');

    console.log('작성자:', username);
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('파일:', file);

    alert('게시글이 작성되었습니다.');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setFile(null);
    alert('작성이 취소되었습니다.');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="banner_title">상담게시판</div>

      <ul className="nav_bar">
        <li><a href="/" className="nav_link">공지사항</a></li>
        <li><a href="/" className="nav_link">기관소개</a></li>
        <li><a href="/" className="nav_link">온라인상담</a></li>
        <li><a href="/" className="nav_link">자료실</a></li>

        <li className="nav_right">
          <Link to="/login">
            <button className="btn_login">로그인</button>
          </Link>
          <Link to="/signup">
            <button className="btn_signup">회원가입</button>
          </Link>
        </li>
      </ul>

      <div className="post_write_wrapper">
        <h1 className="page_title">온라인 상담 게시판</h1>
        <p className="required_note"><span className="required_mark">●</span>는 필수 입력 항목입니다.</p>

        <form onSubmit={handleSubmit}>
          <table className="write_table">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input
                    type="text"
                    className="input_writer"
                    value={username}
                    readOnly
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
                  />
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
            <button type="submit" className="btn_submit">게시글 작성</button>
            <button type="button" className="btn_cancel" onClick={handleCancel}>작성 취소</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostWritePage;
