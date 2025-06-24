
// 1. 필요한 모듈들을 불러옵니다.
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // promise 기반의 mysql2 사용
const bcrypt = require('bcrypt');

// 2. Express 앱을 생성합니다.
const app = express();
const PORT = 4000; // 서버가 실행될 포트 번호입니다. React 앱(5173)과 달라야 합니다.

// 3. 미들웨어(Middleware)를 설정합니다.
app.use(cors()); // CORS 정책을 허용하여 React 앱 요청을 받을 수 있게 합니다.
app.use(express.json()); // 요청 본문(body)을 JSON 형태로 파싱할 수 있게 합니다.

// 4. 데이터베이스 연결 설정을 작성합니다.
const dbConfig = {
    host: '175.209.200.22',       // MariaDB가 설치된 주소 (보통 localhost)
    user: 'admin',            // MariaDB 사용자 이름
    password: 'qwerty', // MariaDB 접속 비밀번호 (본인 것으로 교체!)
    database: 'Gonna_be_OK_DB'
};

// 5. DB 커넥션 풀을 생성합니다.
// 매번 새로운 연결을 만드는 대신, 기존 연결을 재사용하여 성능을 향상시킵니다.
const pool = mysql.createPool(dbConfig);


// 6. 서버가 잘 작동하는지 확인하기 위한 테스트 API
app.get('/', (req, res) => {
    res.send('Gonna_be_OK 백엔드 서버가 작동 중입니다!');
});


// 7. Express 서버를 시작합니다.
app.listen(PORT, async () => {
    try {
        // 서버 시작 시 DB 연결 테스트
        const connection = await pool.getConnection();
        console.log('✅ 데이터베이스에 성공적으로 연결되었습니다.');
        connection.release(); // 연결을 즉시 반환하여 다른 요청이 사용할 수 있도록 함
    } catch (err) {
        console.error('❌ 데이터베이스 연결 실패:', err);
    }
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});


/* ======== 테스트 단계 암호화 생략 ========= */

// server.js 파일 상단에 bcrypt를 불러왔는지 확인합니다.
//const bcrypt = require('bcrypt');
//const saltRounds = 10; // 암호화 복잡도 설정

// 9. 회원가입 처리를 위한 API 엔드포인트
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
});