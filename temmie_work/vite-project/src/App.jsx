import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. 상태 변수 정의
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    email: '',
  });

  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // 2. 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. 체크박스 변경 핸들러
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements({
      ...agreements,
      [name]: checked,
    });
  };

  // 4. 실시간 유효성 검사 (useEffect 사용)
  useEffect(() => {
    const { userId, password, email } = formData;
    const { termsOfService, privacyPolicy } = agreements;

    const isInputValid = userId.trim() !== '' && password.trim() !== '' && email.trim() !== '';
    const areRequiredAgreementsChecked = termsOfService && privacyPolicy;

    setIsFormValid(isInputValid && areRequiredAgreementsChecked);
  }, [formData, agreements]);


  // 5. 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (isFormValid) {
      const submissionData = {
        ...formData,
        ...agreements,
      };
      console.log('제출된 데이터:', submissionData);
      alert('회원가입이 완료되었습니다! (콘솔을 확인해주세요)');
      // 추후 백엔드 API 호출 로직 추가
    } else {
      alert('필수 입력 항목과 약관 동의를 모두 완료해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        {/* 회원 정보 입력 섹션 */}
        <div className="form-section">
          <h2>회원 정보</h2>
          <div className="input-group">
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>

        {/* 약관 동의 섹션 */}
        <div className="form-section">
          <h2>약관 동의</h2>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="termsOfService"
              name="termsOfService"
              checked={agreements.termsOfService}
              onChange={handleAgreementChange}
            />
            <label htmlFor="termsOfService">[필수] 이용약관 동의</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="privacyPolicy"
              name="privacyPolicy"
              checked={agreements.privacyPolicy}
              onChange={handleAgreementChange}
            />
            <label htmlFor="privacyPolicy">[필수] 개인정보 수집 및 이용 동의</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={agreements.marketing}
              onChange={handleAgreementChange}
            />
            <label htmlFor="marketing">[선택] 마케팅 정보 수신 동의</label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" disabled={!isFormValid} className="submit-btn">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default App;