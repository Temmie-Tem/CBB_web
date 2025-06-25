import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/BoardList.css";

function BoardList() {
  // === 상태 관리 (State Management) ===
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // === useEffect Hooks ===

  // 컴포넌트 마운트 시 로컬 스토리지에서 로그인 정보 및 관리자 여부 확인
  useEffect(() => {
    const userDataString = localStorage.getItem('loggedInUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsLoggedIn(true);
      if (userData.role === 'admin') {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  // 서버로부터 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/posts");
        if (res.data.success) {
          const sortedPosts = res.data.posts.sort((a, b) => b.id - a.id);
          setPosts(sortedPosts);
        } else {
          alert("게시글을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 불러오기 오류:", err);
        const dummyPosts = [
            {id: 1, title: "첫 번째 게시물", writer: "관리자", status: "처리완료", createdAt: "2023-10-27T10:00:00Z"},
            {id: 2, title: "두 번째 게시물 (삭제됨)", writer: "사용자1", status: "삭제됨", createdAt: "2023-10-26T11:30:00Z"},
            {id: 3, title: "세 번째 게시물", writer: "사용자2", status: "진행 중", createdAt: "2023-10-25T15:45:00Z"},
        ];
        setPosts(dummyPosts.sort((a, b) => b.id - a.id));
      }
    };
    fetchPosts();
  }, []);

  // === 이벤트 핸들러 ===
  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate('/PostWritePage');
    } else {
      alert('로그인 후 글쓰기가 가능합니다.');
      navigate('/login');
    }
  };
  
  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  // 상태에 따른 CSS 클래스 반환 함수
  const getStatusClassName = (status) => {
    switch (status) {
      case '진행 중':
        return 'status-in-progress';
      case '처리완료':
        return 'status-completed';
      case '삭제됨':
        return 'status-deleted';
      default:
        return '';
    }
  };

  // === 데이터 필터링 (useMemo 사용) ===
  const filteredPosts = useMemo(() => {
    if (isAdmin) {
      return posts;
    }
    return posts.filter(post => post.status !== '삭제됨');
  }, [posts, isAdmin]);


  // === 페이징 관련 로직 ===
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

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
        <table className="board_table_header">
            <thead>
                <tr>
                    <th style={{ width: "10%" }}>번호</th>
                    <th style={{ width: "40%" }}>제목</th>
                    <th style={{ width: "15%" }}>작성자</th>
                    <th style={{ width: "15%" }}>처리상태</th>
                    <th style={{ width: "20%" }}>작성일</th>
                </tr>
            </thead>
        </table>

        <table className="board_table_body">
            <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                    <tr key={item.id} onClick={() => handlePostClick(item.id)}>
                        <td style={{ width: "10%" }}>{item.id}</td>
                        <td style={{ width: "40%" }} className="board_title">{item.title}</td>
                        <td style={{ width: "15%" }}>{item.writer}</td>
                        
                        {/* 🟡 바로 이 부분입니다! className이 적용되었습니다. */}
                        <td style={{ width: "15%" }} className={getStatusClassName(item.status)}>
                          {item.status}
                        </td>

                        <td style={{ width: "20%" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">게시글이 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>

        <div className="pagination_container">
            <button
                onClick={() => setCurrentPage(1)}
                className={`pagination_button ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
            >
                &lt;&lt;
            </button>
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`pagination_button ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
            >
                이전
            </button>
            <div className="pagination_numbers_group">
                {renderPageNumbers()}
            </div>
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`pagination_button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                다음
            </button>
            <button
                onClick={() => setCurrentPage(totalPages)}
                className={`pagination_button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                &gt;&gt;
            </button>
        </div>
        
        <div style={{textAlign: 'right', marginTop: '20px'}}>
            <button onClick={handleWriteClick} className="write_button">
                글쓰기
            </button>
        </div>
    </div>
  );
}

export default BoardList;