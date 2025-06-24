import React from 'react';
import PostWriterPage from './components/PostWritePage'; // PostWritePage 컴포넌트 import
import "./css/post_write_page.css";// CSS 파일 import
import './App.css'; // App 전역 스타일 import

function App() {
  return (
    <div className="app-wrapper">
      <PostWriterPage /> {/* PostWritePage 컴포넌트 렌더링 */}
    </div>
  );
}

export default App; // App 컴포넌트 내보내기