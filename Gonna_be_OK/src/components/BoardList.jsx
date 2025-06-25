import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ 서버 통신용
import { useNavigate } from "react-router-dom"; // ✅ 게시글 클릭 시 라우팅 가능 (예정)
import "../CSS/BoardList.css"; // ✅ 게시판 스타일

function BoardList() {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지당 표시할 게시글 수

  // ✅ 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/posts");
        if (res.data.success) {
          setPosts(res.data.posts);
        } else {
          alert("게시글 불러오기에 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 불러오기 오류:", err);
        alert("서버 오류로 게시글을 불러올 수 없습니다.");
      }
    };
    fetchPosts();
  }, []);

  // ✅ 페이징 관련 계산
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
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

  return (
    <div className="board_list_container">
      {/* ✅ 헤더 영역 */}
      <table className="board_table_header">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "50%" }}>제목</th>
            <th style={{ width: "15%" }}>작성자</th>
            <th style={{ width: "25%" }}>작성일</th>
          </tr>
        </thead>
      </table>

      {/* ✅ 본문 게시글 출력 */}
      <table className="board_table_body">
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "10%" }}>{item.id}</td>
              <td style={{ width: "50%" }}>{item.title}</td>
              <td style={{ width: "15%" }}>{item.writer}</td>
              <td style={{ width: "25%" }}>
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="board_table_body">
  <tbody>
    {posts.map(post => (
      <tr key={post.id}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.writer}</td>
        <td>{new Date(post.createdAt).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>


      {/* ✅ 페이지네이션 */}
      <div className="pagination_container">
        <div className="pagination_numbers_group">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="pagination_button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="pagination_button"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
