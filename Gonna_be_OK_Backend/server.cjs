const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // 업로드 파일 정적 제공

// ✅ 업로드 디렉토리 없으면 생성
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '_' + file.originalname.replace(/\s/g, ''))
});
const upload = multer({ storage });

const dbConfig = {
  host: '175.209.200.22',
  user: 'admin',
  password: 'qwerty',
  database: 'Gonna_be_OK_DB',
};
const pool = mysql.createPool(dbConfig);

// 서버 연결 확인
app.get('/', (req, res) => {
  res.send('Gonna_be_OK 백엔드 서버가 작동 중입니다!');
});



app.listen(PORT, () => {
  (async () => {
    try {
      const conn = await pool.getConnection();
      console.log('✅ DB 연결 성공');
      conn.release();
    } catch (err) {
      console.error('❌ DB 연결 실패:', err);
    }

    console.log(`✅ 서버 http://localhost:${PORT} 에서 실행 중`);
  })();
});


/* ========== 기존 회원 관련 API ========== */

app.post('/api/signup', async (req, res) => {
  const { userId, password, name, email, birthDate } = req.body;
  if (!userId || !password || !name || !email)
    return res.status(400).json({ success: false, message: '필수 입력 항목 누락' });

  try {
    const sql = 'INSERT INTO users (userId, password, name, email, birthDate) VALUES (?, ?, ?, ?, ?)';
    await pool.query(sql, [userId, password, name, email, birthDate]);
    res.status(201).json({ success: true, message: '회원가입 성공' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ success: false, message: '아이디/이메일 중복' });
    console.error('Signup API error:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

app.post('/api/check-userid', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId가 필요합니다.' });

  try {
    const sql = 'SELECT COUNT(*) as count FROM users WHERE userId = ?';
    const [rows] = await pool.query(sql, [userId]);
    res.json({ isAvailable: rows[0].count === 0 });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'DB 오류 발생' });
  }
});

app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const sql = 'SELECT id, userId, name, password FROM users WHERE userId = ?';
    const [rows] = await pool.query(sql, [userId]);

    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ success: false, message: '아이디 또는 비밀번호 오류' });
    }

    const user = rows[0];

      // 👉 프론트에 보내주는 응답 형식이 이거!
      res.json({
      success: true,
      message: '로그인 성공!',
      user: {
        id: user.id,             // ✅ 숫자형 PK
        userId: user.userId,     // 사용자 입력 ID
        name: user.name          // 사용자 이름
      }
    });
  } catch (err) {
    console.error('Login API error:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});


/* ✅ 게시글 저장 API 추가 시작 */
// 게시글 작성 라우터
app.post('/api/posts', upload.single('file'), async (req, res) => {
  try {
    console.log("🔥 req.body:", req.body);
    console.log("📎 req.file:", req.file);
    
    const { userId, title, content } = req.body;
    const file = req.file;

    // 빠진 필드 검사
    if (!userId || !title || !content) {
      console.error("❌ 누락된 필드 있음:", { userId, title, content });
      return res.status(400).json({ success: false, message: '필수 정보 누락' });
    }

    console.log("✅ 게시글 작성 요청 받음:", { userId, title, content, file });

    if (!userId || !title || !content) {
      return res.status(400).json({ success: false, message: '필수 정보가 누락되었습니다.' });
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const [result] = await pool.execute(
      'INSERT INTO posts (userId, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [userId, title, content, createdAt, updatedAt]
    );

    res.json({ success: true, postId: result.insertId });
  } catch (error) {
    console.error("❌ 게시글 작성 오류:", error);
    res.status(500).json({ success: false, message: '서버 오류', error: error.message });
  }
});

/* ✅ 게시글 저장 API 추가 끝 */

// ✅ 게시글 목록 불러오기 API
app.get('/api/posts', async (req, res) => {
  try {
    const sql = `
      SELECT p.id,
      u.name AS writer,
      p.status,
      p.title,
      p.content,
      p.createdAt
      FROM posts p
      JOIN users u
      ON p.userId = u.id
      ORDER BY p.createdAt DESC
    `;
    const [rows] = await pool.query(sql);
    res.json({ success: true, posts: rows });
  } catch (error) {
    console.error('게시글 목록 조회 오류:', error);
    res.status(500).json({ success: false, message: '게시글 목록 조회 실패' });
  }
});

// 개별 게시글 조회 API
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // ➊ 게시글 조회 (viewCount 컬럼 포함)
    // users 테이블과 LEFT JOIN 해서 name 컬럼(userName)도 같이 조회
    const [rows] = await pool.query(
      `SELECT 
        p.id,
        p.userId,
        u.name   AS userName,
        p.title,
        p.content,
        p.createdAt,
        p.updatedAt,
        p.viewCount,
        p.status
      FROM posts p
      LEFT JOIN users u
        ON p.userId = u.id
      WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = rows[0];

    // ➋ 조회수 1 증가
    await pool.query(
      `UPDATE posts SET viewCount = viewCount + 1 WHERE id = ?`,
      [id]
    );
    post.viewCount += 1;

    // ➌ 결과 반환
    res.json(post);
  } catch (err) {
    console.error('게시글 조회 오류:', err);
    res.status(500).json({ message: 'Server error' });
  }
});