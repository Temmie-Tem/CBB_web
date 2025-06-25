# Gonna_be_OK 프로젝트

상담 게시판 웹 애플리케이션을 개발하며 기록을 남기는 저장소입니다.
프론트엔드는 React(Vite) 기반, 백엔드는 Express와 MySQL을 사용합니다.

## 현재까지 완료된 주요 기능

- 회원가입·로그인 화면 및 로직 구축
- 아이디 중복 검사와 입력값 검증
- 게시글 작성·목록·열람 기능 구현 (조회수 증가 포함)
- 댓글 목록 조회 기능 추가
- 이용약관과 개인정보처리방침 등 정적 페이지 작성
- Express 백엔드(API 서버)와 MySQL 연동
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

---

## 데이터베이스 구조 (Database Structure)

데이터베이스 이름: `Gonna_be_OK_DB`

### 1. `users` 테이블
사용자 정보를 저장하는 테이블입니다.

| Column | Data Type | 제약 조건 / 설명 |
| :--- | :--- | :--- |
| `id` | INT | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `userId` | VARCHAR(255) | `NOT NULL`, `UNIQUE` (로그인 시 사용될 ID) |
| `password` | VARCHAR(255) | `NOT NULL` |
| `name` | VARCHAR(255) | `NOT NULL` |
| `email` | VARCHAR(255) | `NOT NULL`, `UNIQUE` |
| `phone_number` | VARCHAR(20) | |
| `birth_date` | DATE | |
| `gender` | ENUM('male', 'female', 'other')| |
| `role` | ENUM('user', 'admin') | `DEFAULT 'user'` (사용자 역할) |
| `created_at` | TIMESTAMP | `DEFAULT CURRENT_TIMESTAMP` |

### 2. `posts` 테이블
게시글 정보를 저장하는 테이블입니다.

| Column | Data Type | 제약 조건 / 설명 |
| :--- | :--- | :--- |
| `id` | INT | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `userId` | INT | `FOREIGN KEY` (users.id 참조) |
| `title` | VARCHAR(255) | `NOT NULL` |
| `content` | TEXT | `NOT NULL` |
| `status`| ENUM('진행 중', '처리완료', '삭제됨') | `DEFAULT '진행 중'` |
| `createdAt` | DATETIME | |
| `updatedAt` | DATETIME | |

### 3. `comments` 테이블
댓글 정보를 저장하는 테이블입니다.

| Column | Data Type | 제약 조건 / 설명 |
| :--- | :--- | :--- |
| `id` | INT | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `postId` | INT | `FOREIGN KEY` (posts.id 참조) |
| `userId` | INT | `FOREIGN KEY` (users.id 참조) |
| `content` | TEXT | `NOT NULL` |
| `createdAt` | TIMESTAMP | `DEFAULT CURRENT_TIMESTAMP` |

### 관계 (Relationships)
- `posts.userId`는 `users.id`를 참조하여 어떤 사용자가 게시글을 작성했는지 나타냅니다. (1:N 관계)
- `comments.postId`는 `posts.id`를 참조하여 어떤 게시글에 달린 댓글인지 나타냅니다. (1:N 관계)
- `comments.userId`는 `users.id`를 참조하여 어떤 사용자가 댓글을 작성했는지 나타냅니다. (1:N 관계)


## 구현된 API 목록

| Method | Endpoint | 설명 |
| ------ | -------- | ---- |
| GET | `/` | 서버 연결 테스트 |
| POST | `/api/signup` | 회원 가입 |
| POST | `/api/check-userid` | 아이디 중복 확인 |
| POST | `/api/login` | 로그인 |
| POST | `/api/posts` | 게시글 작성 (파일 업로드 가능) |
| GET | `/api/posts` | 게시글 목록 조회 |
| GET | `/api/posts/:id` | 개별 게시글 조회 (조회수 증가) |
| GET | `/api/posts/:id/comments` | 게시글 댓글 목록 |

## 추가 자료

프로젝트 진행 상황과 계획은 노션 페이지에서 확인할 수 있습니다.  
<https://www.notion.so/invite/eaa67becda16262ca3fd4b90ca01dbd27fcf45b>
