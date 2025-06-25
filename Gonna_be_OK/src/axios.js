// 회원가입 요청
axios.post("http://localhost:4000/api/signup", {
  userId: "testuser",
  password: "1234",
  name: "홍길동",
  email: "test@example.com",
  birthDate: "2000-01-01"
});
