import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";    // 서버(API) 호출용 HTTP 클라이언트
import { useNavigate } from "react-router-dom";
import "../CSS/BoardList.css";

function BoardList() {
  // === 상태 관리 (State Management) ===
  const [posts, setPosts] = useState([]);   // DB에서 개시글을 받아와 담는 배열
  const [isLoggedIn, setIsLoggedIn] = useState(false);    // 로그인 여부를 확인
  const [isAdmin, setIsAdmin] = useState(false);    // 관리자 권한 여부

  const [currentPage, setCurrentPage] = useState(1);  // 현제 페이지 번호
  const itemsPerPage = 10;    // 페이지 당 개시글 표시 수(10)

  const navigate = useNavigate();

  // === useEffect Hooks ===

  // 컴포넌트 마운트 시 로컬 스토리지에서 로그인 정보 및 관리자 여부 확인
  useEffect(() => {
    const userDataString = localStorage.getItem('loggedInUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);  
      // localStorage에 저장된 로그인 정보를 꺼내 JSON으로 파싱
      setIsLoggedIn(true);
      if (userData.role === 'admin') {
        setIsAdmin(true);
      } // 정보가 있으면 로그인 상태를 true로 하고 계정 역할을 관리자로
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);    // 없으면 로그인, 관리자권한을 false로
    }
  }, []);

  // 서버로부터 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {  // 
      try {
        const res = await axios.get("http://localhost:4000/api/posts"); // axios.get 으로 /api/posts에 요청
        if (res.data.success) {
          const sortedPosts = res.data.posts.sort((a, b) => b.id - a.id);
          setPosts(sortedPosts);  // 성공시 개시글 id 내림차순으로 정렬
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
      navigate('/postwrite'); // 로그인 상태면 개시글 작성 페이지로 이동
    } else {  // 아닐 경우 alert와 함깨 로그인 페이지로 이동
      alert('로그인 후 글쓰기가 가능합니다.');
      navigate('/login');
    }
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
    } // 상담개시판 이니까 상담글의 상담 완료 여부를 지정, 또한, 개시글을 삭제해도 DB에는 남겨야 하니 
    // 상태를 삭제됨 상태로 변경함.
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  // === 데이터 필터링 (useMemo 사용) ===
  const filteredPosts = useMemo(() => {
    if (isAdmin) {
      return posts;
    }
    return posts.filter(post => post.status !== '삭제됨');
  }, [posts, isAdmin]);
  // 관리자 에게는 모든 개시글이 보이고, 일반 이용자 에게는 상태가 삭제됨 인 글이 비표시.


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
    // 한번에 보이는 페이지 넘버는 5개 까지만, 그 이전 페이지,나 이후 페이지들은 ...으로 표기되게 하는 짜증나는 식

    return pageNumbers.map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`pagination_button ${currentPage === num ? "active" : ""}`}
      >
        {num}
      </button>
      // 클릭 시 CurrentPage가 해당 번호로 변경됨 = 해당 페이지를 출력.
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
        {/* 개시글 상위 탭, 정렬 변경 기능 같은건 넣지 않았음 */}

        <table className="board_table_body">
            <tbody>
                {currentItems.length > 0 ? (  // 개시글의 수가 0 을 넘으면 
                    currentItems.map((item) => (
                    <tr key={item.id} onClick={() => handlePostClick(item.id)}>
                        <td style={{ width: "10%" }}>{item.id}</td>
                        <td style={{ width: "40%" }} className="board_title">{item.title}</td>
                        <td style={{ width: "15%" }}>{item.writer}</td>
                        <td style={{ width: "15%" }} className={getStatusClassName(item.status)}>
                          {item.status}
                        </td>
                        <td style={{ width: "20%" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr> // 개시글을 출력, 개시글 번호, 제목, 작성자, 상태, 작성일 
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">게시글이 없습니다.</td>
                    </tr>
                    // 0일 경우 매세지 출력
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
            {/* 첫 페이지로 이동 버튼 */}

            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`pagination_button ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
            >
                이전
            </button>
            {/* 이전 페이지로 이동 버튼 */}

            <div className="pagination_numbers_group">
                {renderPageNumbers()}
            </div>
            {/* 페이지네이션, 페이지 번호 */}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`pagination_button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                다음
            </button>
            {/* 다음 페이지로 이동 버튼 */}

            <button
                onClick={() => setCurrentPage(totalPages)}
                className={`pagination_button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                &gt;&gt;
            </button>
            {/* 끝 페이지로 이동 버튼 */}
        </div>
        
        <div style={{textAlign: 'right', marginTop: '20px'}}>
            <button onClick={handleWriteClick} className="write_button">
                글쓰기
            </button>
            {/* 개시글 작성 버튼 */}
        </div>
    </div>
  );
}

export default BoardList;