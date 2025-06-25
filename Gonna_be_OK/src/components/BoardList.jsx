import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ 서버 통신용
import { useNavigate } from "react-router-dom"; // ✅ 라우팅
import "../CSS/BoardList.css"; // ✅ 게시판 스타일

function BoardList() {
  // === 상태 관리 (State Management) ===

  // ssaarr 브랜치: 실제 게시글 데이터
  const [posts, setPosts] = useState([]);

  // main 브랜치: 로그인 관련 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // 공통: 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 표시할 게시글 수

  // === Hooks ===
  const navigate = useNavigate();

  // === useEffect Hooks ===

  // main: 컴포넌트 마운트 시 로컬 스토리지에서 로그인 정보 확인
  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(userData).name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ssaarr: 컴포넌트 마운트 시 서버로부터 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/posts");
        if (res.data.success) {
          // 최신 글이 위로 오도록 정렬 (id 내림차순)
          const sortedPosts = res.data.posts.sort((a, b) => b.id - a.id);
          setPosts(sortedPosts);
        } else {
          alert("게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 불러오기 오류:", err);
        alert("서버 오류로 게시글을 불러올 수 없습니다.");
      }
    };
    fetchPosts();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // === 이벤트 핸들러 ===

  // main: 글쓰기 버튼 클릭 시
  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate('/PostWritePage');
    } else {
      alert('로그인 후 글쓰기가 가능합니다.');
      navigate('/login');
    }
  };

  // ssaarr: 게시글 클릭 시 상세 페이지로 이동
  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };


  // === 페이징 관련 로직 ===
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // 페이지 번호 배열 생성 (최대 5개씩 보이도록)
  const renderPageNumbers = () => {
    if (totalPages === 0) return null;
    
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    return pageNumbers.map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`pagination_button ${currentPage === num ? "active" : ""}`}
      >
        {num}
      </button>
    ));
  };


  // === 렌더링 ===
  return (
    <div className="board_list_container">
      <table className="board_table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "50%" }}>제목</th>
            <th style={{ width: "15%" }}>작성자</th>
            <th style={{ width: "25%" }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} onClick={() => handlePostClick(item.id)}>
                <td>{item.id}</td>
                <td className="board_title">{item.title}</td>
                <td>{item.writer}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="board_footer">
        <div className="pagination_container">
            <button
                onClick={() => setCurrentPage(1)}
                className="pagination_button"
                disabled={currentPage === 1}
            >
                &lt;&lt;
            </button>
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="pagination_button"
                disabled={currentPage === 1}
            >
                이전
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="pagination_button"
                disabled={currentPage === totalPages || totalPages === 0}
            >
                다음
            </button>
            <button
                onClick={() => setCurrentPage(totalPages)}
                className="pagination_button"
                disabled={currentPage === totalPages || totalPages === 0}
            >
                &gt;&gt;
            </button>
        </div>

        <button onClick={handleWriteClick} className="write_button">
            글쓰기
        </button>
      </div>
    </div>
  );
}

export default BoardList;
