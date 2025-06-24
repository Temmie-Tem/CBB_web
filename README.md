# Gonna_be_OK 프로젝트

이 저장소는 상담 게시판 웹 애플리케이션 개발 과정을 모아 둔 것입니다. 프론트엔드는 React와 Vite를 사용하고, 백엔드는 Express와 MySQL을 기반으로 합니다.

## 폴더 구조

- `Gonna_be_OK/` : 메인 React 애플리케이션 소스 코드
- `Gonna_be_OK_Backend/` : Express 서버 및 DB 스키마
- `work_fin/`, `test_fin/` : 각종 실습 및 테스트 파일

## 주요 진행 사항

- 회원가입 페이지와 로그인 페이지 구현
- 아이디 중복 검사, 입력값 유효성 검증 로직 추가
- 게시판 목록과 게시글 작성 화면 작성
- 약관·개인정보 처리 방침 등의 정적 페이지 구성
- 백엔드에서 회원가입 API를 제공하고 MySQL DB와 연동

## 실행 방법

1. **백엔드 서버 실행**
   ```bash
   cd Gonna_be_OK_Backend
   npm install
   node server.js    # 기본 포트 4000
   ```
2. **프론트엔드 개발 서버 실행**
   ```bash
   cd Gonna_be_OK
   npm install
   npm run dev       # 기본 포트 5173
   ```

데이터베이스 초기화는 `Gonna_be_OK_Backend/schema.sql` 파일을 참고하세요.

## 참고 자료

프로젝트 세부 진행 상황은 노션 페이지에서 확인할 수 있습니다.
<https://www.notion.so/invite/eaa67becda16262ca3fd4b90ca01dbd27fcf45b>
