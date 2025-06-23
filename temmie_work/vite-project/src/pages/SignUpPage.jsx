import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import DatePicker from 'react-datepicker'; // DatePicker 컴포넌트 import
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker 스타일 import
import { Link } from 'react-router-dom';

// --- 정규식 정의 ---
//패스워드 정규식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
//이메일 정규식
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// 아이디 정규식: 4~20자, 영문 소문자, 숫자와 일부 특수문자(-, _)만 허용
const userIdRegex = /^[a-z0-9_-]{4,20}$/;

function SignUpPage() {
  // --- 상태(State) 정의 ---

  // 1. 폼 데이터 상태
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '', // 비밀번호 확인 필드 추가
    name: '',            // 이름 필드 추가
    email: '',
    birthDate: null,
  });

  // 2. 에러 메시지 상태
  const [errors, setErrors] = useState({});

  // 3. 약관 동의 상태 (name 속성과 key를 일치시킴)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 4. 최종 제출 버튼 활성화 상태
  const [isFormValid, setIsFormValid] = useState(false);

  // --- 핸들러 함수 정의 ---

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 체크박스 변경 핸들러
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  // --- 유효성 검사 로직 (useEffect) ---

  // 1. 각 필드별 실시간 에러 메시지 관리 useEffect
  useEffect(() => {
    const newErrors = {};

    // 아이디 검사
    if (formData.userId && !userIdRegex.test(formData.userId)) {
    newErrors.userId = "아이디는 4~20자의 영문 소문자, 숫자, 밑줄(_), 하이픈(-)만 사용 가능합니다.";
  }

    // 비밀번호 검사 (정규식)
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다.";
    }

    // 비밀번호 확인 검사
    if (formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    // 이메일 검사 (정규식)
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    setErrors(newErrors);
  }, [formData]);


  // 2. 최종 '가입하기' 버튼 활성화 여부 관리 useEffect
  useEffect(() => {
    const isBasicInfoValid =
      userIdRegex.test(formData.userId) &&
      formData.userId.length >= 4 &&
      formData.name.trim() !== '' &&
      passwordRegex.test(formData.password) &&
      formData.password === formData.passwordConfirm &&
      emailRegex.test(formData.email);

    const areRequiredAgreementsChecked = agreements.terms && agreements.privacy;
    
    // errors 객체에 아무런 에러 메시지가 없는지 확인
    const noErrors = Object.values(errors).every(error => error === undefined || error === "");

    setIsFormValid(isBasicInfoValid && areRequiredAgreementsChecked && noErrors);

  }, [formData, agreements, errors]); // formData, agreements, errors가 바뀔 때마다 실행


  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('제출된 데이터:', { ...formData, ...agreements });
      alert('회원가입이 완료되었습니다!');
    } else {
      alert('입력 항목을 다시 확인해주세요.');
    }
  };


  // --- JSX 렌더링 ---
  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>회원 정보</h2>

          {/* 아이디 */}
          <div className="input-group">
            <label htmlFor="userId">아이디</label>
            <input
              type="text" id="userId" name="userId"
              value={formData.userId} onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
            />
            {errors.userId && <p className="error-message">{errors.userId}</p>}
          </div>

          {/* 이름 */}
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleInputChange}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>생년월일</label>
            <DatePicker
              selected={formData.birthDate} // 현재 선택된 날짜 (state와 연결)
              onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))} // 날짜가 변경되면 state 업데이트
    
              // --- 추천 옵션 ---
              dateFormat="yyyy/MM/dd"         // 입력창에 표시될 날짜 형식
              showYearDropdown                // 연도 선택 드롭다운 표시
              showMonthDropdown               // 월 선택 드롭다운 표시
              dropdownMode="select"           // 연도/월을 스크롤 대신 드롭다운으로 변경
              maxDate={new Date()}            // 선택할 수 있는 최대 날짜를 오늘로 제한 (미래 날짜 선택 방지)
              placeholderText="생년월일을 선택하세요" // 안내 문구
            />
          </div>

          {/* 비밀번호 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password" id="password" name="password"
              value={formData.password} onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password" id="passwordConfirm" name="passwordConfirm"
              value={formData.passwordConfirm} onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.passwordConfirm && <p className="error-message">{errors.passwordConfirm}</p>}
          </div>

          {/* 이메일 */}
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>

        {/* 약관 동의 섹션 */}
        <div className="agreement-section">
          <div className="agreement-item">
            <input type="checkbox" id="terms" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
            <label htmlFor="terms">[필수] 이용약관에 동의합니다.</label>
            <Link to="/terms" target="_blank" rel="noopener noreferrer" className="view-details">자세히</Link>
          </div>
          <div className="agreement-item">
            <input type="checkbox" id="privacy" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} />
            <label htmlFor="privacy">[필수] 개인정보 수집 및 이용에 동의합니다.</label>
            <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="view-details">자세히</Link>
          </div>
          <div className="agreement-item">
            <input type="checkbox" id="marketing" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
            <label htmlFor="marketing">[선택] 마케팅 정보 수신에 동의합니다.</label>
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

export default SignUpPage;