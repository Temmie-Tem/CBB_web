import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../CSS/PostWritePage.css';
import axios from 'axios';

function PostWritePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // ✅ 로그인 확인 및 작성자 이름 설정
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      alert("로그인 후 글쓰기가 가능합니다.");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (!user.name) {
        throw new Error("이름 없음");
      }
      setUsername(user.name); // 작성자 input에 표시할 이름 저장
    } catch (e) {
      console.error("로그인 정보 파싱 오류:", e);
      alert("로그인 정보가 잘못되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ 게시글 제출 처리
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return alert('제목을 입력하세요.');
  if (!content.trim()) return alert('내용을 입력하세요.');

  // ✅ localStorage에서 user 정보 파싱
  const storedUser = localStorage.getItem("loggedInUser");
  const user = JSON.parse(storedUser);
  const userId = user.id; // ✅ 숫자형 userId (DB의 PK)

  if (!userId) {
    alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("userId", userId);  // ✅ 숫자 ID 전송
  formData.append("title", title);
  formData.append("content", content);
  if (file) formData.append("file", file);

  try {
    const response = await axios.post("http://localhost:4000/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      alert('게시글이 작성되었습니다.');
      navigate('/main');
    } else {
      alert('게시글 작성 실패');
    }
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    alert("서버 오류로 게시글 작성에 실패했습니다.");
  }
};


  // ✅ 작성 취소
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setFile(null);
    alert('작성이 취소되었습니다.');
    navigate('/main');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
