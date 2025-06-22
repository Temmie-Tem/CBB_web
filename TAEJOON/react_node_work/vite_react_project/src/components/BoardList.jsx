import React, { useState } from "react";

function BoardList() {
    // 컴포넌트 "BoardList"를 정의

    const boardItems = Array.from({ length: 15 }, (_, i) => ({
        // 개시판 개시글 목록 임시 개시글 15개 생성.
        // 본 작업시 이하의 규칙을 개정할 필요 있음.
            id: i + 1,
            number: 25 + i, 
            // 개시글 번호 25번 부터
            title: `스마트폰 충원 원인이 무엇인가요 ${i + 1}번째`,   
            // 제목을 15개 전부 쓸 수 없으니 배열로 생성
            status: i % 2 === 0 ? '완료' : '진행중',    
            // 현 시점에서는 홀수와 짝수로 "완료"와 "진행중"을 구분.
            // 본 작업 에서는 열람권자(상담 후 결정)가 "진행중"에서 "완료"로 변환하는 조작을 지정.
            author: '******',
            // 작성자, 현제는 "******"로 하나 본 작업 시에는 유저 아이디(혹은 이름)앞글자 일부+***로 지정
            date: `06.${20 + (i % 5)}`,
            // 작성일, 본 작업 시에는 년-월-일-시-분-초 중 어느정도를 표시할지 상담 후 결정.
        }));

    /* 페이지네이션 상태 관리 */
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    // 페이지 당 표시 건 수
    const totalPages = Math.ceil(boardItems.length / itemsPerPage);
    /* // 페이지네이션 상태 관리 */

    /* 현제 페이지에 표시할 아이탬 계산 */
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = boardItems.slice(indexOfFirstItem, indexOfFirstItem);
    /* 현제 페이지에 표시할 아이탬 계산 */
    
    /* 페이지 번호의 배열을 생성 */
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    /* 페이지 번호의 배열을 생성 */

    
    const renderPageNumbers = () => {
        if (totalPages <= 5) {
            // 페이지 수가 5 이하일 경우 전체 표시
            // 간략한 함수로 구현 가능
            return pageNumbers.map(number => (
                <button 
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`pagination_button ${currentPage === number ? 'active' : ''}`}
                >
                    {number}
                </button>
            ));
        } else {
            // 페이지 수가 5를 넘을 경우 ...을 표시
            // 다소 복잡한 함수가 필요
            let displayPages = [];
            if (currentPage <= 3) {
                // 현제 페이지가 3 이하 일 때
                displayPages = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage >= totalPages -2) {
                // 현제 페이지가 전체페이지 - 2 이상일 때
                displayPages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                // 그 외 경우, 즉, 페이지 수가 많을 때 중간쯤의 페이지에서 앞 뒤로 '...'을 붙이는 경우
                displayPages = [1, '...', currentPage -1, currentPage, currentPage + 1, '...', totalPages];
            }

            return displayPages.map((number, index) => (
                number === '...' ? (
                    <span key={index} className="pagination_ellipsis">
                        ...
                    </span>
                ) : (
                    <button 
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`pagination_button ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                )
            ));
        }
    };

    return (
        
        <div className="board_list_container">
            {/* 테이블 구조 */}
            <table className="board_table">
                <thead>
                    {/* thead관련 자료 찾을 필요 있음 */}
                    <tr>
                        {/* 표 작성을 응용 */}
                        <th>번호</th>
                        <th>제목</th>
                        <th>처리상태</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardItems.map(item => (
                        // 개시글의 배치
                        <tr key={item.id}>
                            {/* key프로퍼티 : React의 리스트 표시에 필수 */}
                            <td>{item.number}</td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>{item.author}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* // 테이블 구조 */}
        </div>
    );
}

export default BoardList;