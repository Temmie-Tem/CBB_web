// 파일 경로: Gonna_be_OK_Backend/routes/admin.js (최종 수정본)

const express = require('express');
const router = express.Router();

module.exports = function(db) {
  
  // [API 1] 모든 사용자 목록 가져오기
  // README.md의 users 테이블 구조에 맞춰 수정
  router.get('/users', (req, res) => {
    //'id', 'userId', 'name', 'email', 'created_at' 컬럼을 선택합니다.
    const sql = "SELECT id, userId, name, email, createdAt FROM users";
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error('DB 오류 (사용자 목록):', err);
        return res.status(500).json({ message: '서버 내부 오류' });
      }
      res.json(results);
    });
  });

  // [API 2] 모든 게시글 목록 가져오기
  // README.md의 posts 테이블 구조에 맞춰 수정
  router.get('/posts', (req, res) => {
    // 'id', 'userId', 'title', 'status', 'createdAt' 컬럼을 선택합니다.
    // (README에 views 컬럼이 없으므로 제외)
    const sql = "SELECT id, userId, title, status, createdAt FROM posts";
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error('DB 오류 (게시글 목록):', err);
        return res.status(500).json({ message: '서버 내부 오류' });
      }
      res.json(results);
    });
  });

  return router;
};