import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../CSS/PostWritePage.css';
import axios from 'axios';

function PostWritePage() {
  const navigate = useNavigate();
  
  // === 상태 관리 (State Management) ===
  const [userName, setUserName] = useState(''); // 변수명 'userName'으로 통일
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // === useEffect Hooks ===

  // 컴포넌트 마운트 시 로그인 상태를 확인하고 작성자 이름을 설정합니다.
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    // ssaarr 브랜치의 안정적인 로그인 확인 로직을 채택합니다.
    if (!storedUser) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (!user || !user.name) {
        throw new Error("사용자 정보가 올바르지 않습니다.");
      }
      setUserName(user.name); // 'userName' 상태를 업데이트합니다.
    } catch (e) {
      console.error("로그인 정보 파싱 오류:", e);
      alert("로그인 정보가 잘못되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("loggedInUser"); // 잘못된 정보는 삭제합니다.
      navigate("/login");
    }
  }, [navigate]);

  // === 이벤트 핸들러 ===

  // 게시글 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    // ssaarr 브랜치의 서버 전송 로직을 채택합니다.
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id; // 로그인한 사용자의 고유 ID

    if (!userId) {
      alert("사용자 ID를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    // FormData를 사용하여 서버에 데이터를 전송합니다.
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert('게시글이 성공적으로 작성되었습니다.');
        navigate('/'); // 게시판 목록 페이지로 이동
      } else {
        alert('게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
      alert("서버 오류로 게시글 작성에 실패했습니다.");
    }
  };

  // 작성 취소
  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")) {
        setTitle('');
        setContent('');
        setFile(null);
        navigate('/'); // 게시판 목록으로 이동
    }
  };

  // 파일 선택 시 상태 업데이트
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  // === 렌더링 ===
  return (
    <>
      <Header />
      <div className="post_write_wrapper">
        <h1 className="page_title">온라인 상담 게시판</h1>
        <p className="required_note">
          <span className="required_mark">●</span>는 필수 입력 항목입니다.
        </p>

        <form onSubmit={handleSubmit}>
          <table className="write_table">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>
                  <input
                    type="text"
                    className="input_writer"
                    value={userName}
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
                  ></textarea>
                </td>
              </tr>
              <tr>
                  <th>첨부파일</th>
                  <td>
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
      <Footer />
    </>
  );
}

export default PostWritePage;
