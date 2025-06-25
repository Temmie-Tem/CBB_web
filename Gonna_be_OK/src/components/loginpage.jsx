import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';
import '../CSS/loginpage.css';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userId || !password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        setError('');

        try {
            const response = await axios.post("http://localhost:4000/api/login", {
                userId,
                password,
            });

            if (response.data.success) {
                alert("로그인 성공!");
                login({ userId: response.data.user.userId, name: response.data.user.name });
                navigate("/"); 
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "로그인 중 오류가 발생했습니다. 서버가 켜져 있는지 확인해주세요.";
            setError(errorMessage);
            console.error("로그인 중 오류 발생:", err);
        }
    };

    return (
        <div>
            <Header />
            <div className="auth-container">
                <h1>로그인</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="submit-btn">
                        로그인
                    </button>
                </form>
                <div className="links">
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
