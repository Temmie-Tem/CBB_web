import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage'; // 회원가입 컴포넌트
import TermsPage from './components/TermsPage';   // 이용약관 컴포넌트
import PrivacyPolicyPage from './components/PrivacyPolicyPage'; // 개인정보처리방침 컴포넌트
import MainPage from './components/MainPage'; //홈페이지
import LoginPage from './components/LoginPage'; //로그인 페이지
import PostWritePage from './components/PostWritePage'; // 게시판
import PostViewPage from './components/PostViewPage'; // 개시글 열람
import AdminPage from './components/AdminPage' //관리자 페이지

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/main" element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/PostWrite' element={<PostWritePage/>}/>
        {/* 앱의 기본 페이지 설정 */}
        <Route path="/" element={<MainPage />} /> 
        <Route path='/posts/:id' element={<PostViewPage />} />  {/* // ✅ 게시글 보기 페이지 라우트 추가 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
