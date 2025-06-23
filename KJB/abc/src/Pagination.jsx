// components/Pagination.jsx
import React from 'react';
import '../css/pagination_style.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageGroupSize = 5;

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handlePrevGroup = () => onPageChange(startPage - 1);
  const handleNextGroup = () => onPageChange(endPage + 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination_wrapper">
      <button onClick={handleFirst} disabled={currentPage === 1}>
        «
      </button>

      <button onClick={handlePrevGroup} disabled={startPage === 1}>
        ‹
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button onClick={handleNextGroup} disabled={endPage === totalPages}>
        ›
      </button>

      <button onClick={handleLast} disabled={currentPage === totalPages}>
        »
      </button>
    </div>
  );
};

export default Pagination;
