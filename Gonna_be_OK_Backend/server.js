// 1. 필요한 모듈들을 불러옵니다.
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // promise 기반의 mysql2 사용
const bcrypt = require('bcrypt');

// 2. Express 앱을 생성합니다.
const app = express();
const PORT = 4000; // 서버가 실행될 포트 번호입니다.

// 3. 미들웨어(Middleware)를 설정합니다.

// [수정] CORS 설정을 하나로 정리합니다.
// 특정 출처(프론트엔드 주소)만 허용하는 것이 보안상 더 좋습니다.
const corsOptions = {
    origin: 'http://localhost:5173', // React 앱이 실행되는 주소
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json()); // 요청 본문(body)을 JSON 형태로 파싱할 수 있게 합니다.


// 4. 데이터베이스 연결 설정을 작성합니다.
const dbConfig = {
    host: '175.209.200.22',      // MariaDB가 설치된 주소
    user: 'admin',              // MariaDB 사용자 이름
    password: 'qwerty',         // MariaDB 접속 비밀번호
    database: 'Gonna_be_OK_DB'
};

// 5. DB 커넥션 풀을 생성합니다.
const pool = mysql.createPool(dbConfig);


// 6. 서버가 잘 작동하는지 확인하기 위한 테스트 API
app.get('/', (req, res) => {
    res.send('Gonna_be_OK 백엔드 서버가 작동 중입니다!');
});

// 7. 로그인 API 엔드포인트
app.post('/api/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE userId = ?';
        const [rows] = await pool.query(sql, [userId]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
        }

        const user = rows[0];
        const isPasswordValid = (password === user.password); // 암호화 미적용 시

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
        }

        res.json({
            success: true,
            message: '로그인 성공!',
            user: {
                userId: user.userId,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Login API error:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});


// 8. 아이디 중복 확인을 위한 API 엔드포인트
app.post('/api/check-userid', async (req, res) => {
    // React에서 보낸 요청의 본문(body)에서 userId를 추출합니다.
    const { userId } = req.body;

    // userId가 요청에 포함되지 않은 경우, 잘못된 요청(400)으로 응답합니다.
    if (!userId) {
        return res.status(400).json({ error: 'userId가 필요합니다.' });
    }

    try {
        // DB에서 해당 userId를 가진 사용자가 몇 명인지 카운트합니다.
        const sql = 'SELECT COUNT(*) as count FROM users WHERE userId = ?';
        const [rows] = await pool.query(sql, [userId]);
        
        // 카운트 결과가 0보다 크면, 이미 아이디가 존재한다는 의미입니다.
        if (rows[0].count > 0) {
            // isAvailable: false는 "사용 불가능" 하다는 의미입니다.
            res.json({ isAvailable: false });
        } else {
            // isAvailable: true는 "사용 가능" 하다는 의미입니다.
            res.json({ isAvailable: true });
        }
    } catch (error) {
        // DB 쿼리 중 에러가 발생하면, 서버 에러(500)로 응답합니다.
        console.error('Database query error:', error);
        res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
    }
});// 9. 회원가입 처리를 위한 API 엔드포인트
app.post('/api/signup', async (req, res) => {
    // birthDate는 이제 'YYYY-MM-DD' 형식의 완벽한 문자열로 들어옵니다.
    const { userId, password, name, email, birthDate } = req.body;
    
    if (!userId || !password || !name || !email) {
        return res.status(400).json({ success: false, message: '필수 입력 항목이 누락되었습니다.' });
    }

    try {
        // [수정] 날짜 형식 변환 로직이 완전히 필요 없어졌습니다.
        
        // 비밀번호 암호화 (나중에 주석 해제)
        // const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const sql = 'INSERT INTO users (userId, password, name, email, birthDate) VALUES (?, ?, ?, ?, ?)';
        
        // 프론트에서 받은 birthDate 문자열을 DB에 그대로 전달합니다.
        // await pool.query(sql, [userId, hashedPassword, name, email, birthDate]);
        await pool.query(sql, [userId, password, name, email, birthDate]); // 암호화 테스트 중이라면 이 코드 사용

        res.status(201).json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: '이미 사용 중인 아이디 또는 이메일입니다.' });
        }
        console.error('Signup API error:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
});

// 서버 시작
app.listen(PORT, async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ 데이터베이스에 성공적으로 연결되었습니다.');
        connection.release();
    } catch (err) {
        console.error('❌ 데이터베이스 연결 실패:', err);
    }
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
