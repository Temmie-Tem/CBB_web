import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage'; // 회원가입 컴포넌트
import TermsPage from './pages/TermsPage';   // 이용약관 컴포넌트
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // 개인정보처리방침 컴포넌트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        {/* 앱의 기본 페이지를 회원가입으로 설정할 경우 */}
        <Route path="/" element={<SignUpPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;