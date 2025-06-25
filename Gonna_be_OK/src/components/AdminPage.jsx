// 파일 경로: Gonna_be_OK/src/components/AdminPage.jsx (최종 수정본)

import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import '../CSS/AdminPage.css'; 

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 사용자 목록 가져오기
    axios.get('/api/admin/users')
      .then(response => {
        console.log('받아온 사용자 데이터:', response.data); // 데이터 확인용 로그
        setUsers(response.data);
      })
      .catch(error => console.error('사용자 목록 로딩 실패:', error));

    // 게시글 목록 가져오기
    axios.get('/api/admin/posts')
      .then(response => {
        console.log('받아온 게시글 데이터:', response.data); // 데이터 확인용 로그
        setPosts(response.data);
      })
      .catch(error => console.error('게시글 목록 로딩 실패:', error));
  }, []);

  return (
    <div className="admin-container">
      <h1>관리자 페이지</h1>

      <h2>사용자 관리</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>번호 (id)</th>
            <th>아이디 (userId)</th>
            <th>이름 (name)</th>
            <th>이메일 (email)</th>
            <th>가입일 (created_at)</th>
          </tr>
        </thead>
        <tbody>
          {/* README.md의 users 테이블 구조에 맞춰 수정 */}
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>게시글 관리</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>번호 (id)</th>
            <th>작성자 ID (userId)</th>
            <th>제목 (title)</th>
            <th>상태 (status)</th>
            <th>작성일 (createdAt)</th>
          </tr>
        </thead>
        <tbody>
          {/* README.md의 posts 테이블 구조에 맞춰 수정 */}
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;