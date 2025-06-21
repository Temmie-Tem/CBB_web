import React from "react";

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


    return (
        
        <div className="board_list_container">
            <h2>개시판 목록</h2>

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
                        <tr key={item.id}>
                            {/*  */}

                        </tr>
                    ))}
                </tbody>

            </table>
            {/* // 테이블 구조 */}

            <p>개시판의 개시글이 표시되는 영역</p>
        </div>
    );
}

export default BoardList;