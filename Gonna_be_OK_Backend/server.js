
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
    // React에서 보낸 폼 데이터를 각 변수에 할당합니다.
    const { userId, password, name, email, birthDate } = req.body;

    // 1. 필수 데이터가 모두 있는지 확인합니다.
    if (!userId || !password || !name || !email) {
        return res.status(400).json({ success: false, message: '필수 입력 항목이 누락되었습니다.' });
    }

    try {
        // 2. 비밀번호를 bcrypt를 사용해 암호화합니다.
        //const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // 3. 암호화된 비밀번호를 포함한 사용자 정보를 DB에 INSERT 합니다.
        const sql = 'INSERT INTO users (userId, password, name, email, birthDate) VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [userId, password, name, email, birthDate]);
        
        // 4. 성공적으로 데이터가 삽입되면, 성공 응답(201 Created)을 보냅니다.
        res.status(201).json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' });

    } catch (error) {
        // DB 에러 처리 (특히 아이디/이메일 중복 에러)
        if (error.code === 'ER_DUP_ENTRY') {
            // 409 Conflict: 요청이 서버의 현재 상태와 충돌
            return res.status(409).json({ success: false, message: '이미 사용 중인 아이디 또는 이메일입니다.' });
        }
        
        console.error('Signup API error:', error);
        // 그 외 서버 내부 에러는 500으로 응답
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
});