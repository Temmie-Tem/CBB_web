import React, { useState } from 'react';
import Pagination from './components/Pagination';

const BoardMainPage = () => {
  const totalPages = 23;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    // 게시글 fetch 등 추가 처리 가능
  };

  return (
    <div>
      {/* 게시판 리스트 등등 */}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BoardMainPage;
