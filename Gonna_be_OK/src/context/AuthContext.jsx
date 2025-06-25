import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. Provider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 컴포넌트가 처음 렌더링될 때 localStorage에서 사용자 정보를 읽어옴
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('loggedInUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("localStorage에서 사용자 정보를 파싱하는 데 실패했습니다.", error);
            localStorage.removeItem('loggedInUser');
        }
    }, []);

    // 로그인 함수
    const login = (userData) => {
        try {
            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("localStorage에 사용자 정보를 저장하는 데 실패했습니다.", error);
        }
    };

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
    };
    
    // isLoggedIn 값은 user 상태에 따라 동적으로 결정
    const isLoggedIn = !!user;

    const value = { user, isLoggedIn, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. 사용 편의성을 위한 Custom Hook 생성
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
    }
    return context;
};