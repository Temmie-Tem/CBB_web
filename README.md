# Gonna_be_OK 프로젝트

상담 게시판 웹 애플리케이션을 개발하며 기록을 남기는 저장소입니다.
프론트엔드는 React(Vite) 기반, 백엔드는 Express와 MySQL을 사용합니다.

## 현재까지 완료된 주요 기능

- 회원가입 및 로그인 화면 구현
- 아이디 중복 확인과 입력값 검증 로직 추가
- 게시판 목록 조회, 글 작성·열람 페이지 구성
- 이용약관과 개인정보처리방침 등 정적 페이지 작성
- 회원가입 API를 포함한 Express 백엔드와 DB 연동
- 헤더·푸터·배너 등 기본 레이아웃 정리

## 디렉터리 구조

- `Gonna_be_OK/` : React 프론트엔드 소스 코드
- `Gonna_be_OK_Backend/` : Express 백엔드와 DB 스키마
- `work_fin/`, `test_fin/` : 개인 실습 및 테스트 자료

## 실행 방법

1. **백엔드 서버 실행**
   ```bash
   cd Gonna_be_OK_Backend
   npm install
   node server.js       # 기본 포트 4000
   ```
2. **프론트엔드 개발 서버 실행**
   ```bash
   cd Gonna_be_OK
   npm install
   npm run dev          # 기본 포트 5173
   ```

데이터베이스 초기화는 `Gonna_be_OK_Backend/schema.sql` 파일을 참고하세요.

## 추가 자료

프로젝트 진행 상황과 계획은 노션 페이지에서 확인할 수 있습니다.  
<https://www.notion.so/invite/eaa67becda16262ca3fd4b90ca01dbd27fcf45b>
