// Gonna_be_OK/src/components/SignUpPage.jsx

import React, { useState } from 'react';
import '../CSS/SignUpPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

// --- 상수 정의 ---
const MOCK_REGISTERED_IDS = ['admin', 'test', 'temmie'];

// --- 유효성 검사 규칙 및 메시지 ---
const VALIDATION_RULES = {
  userId: {
    regex: /^[a-z0-9_-]{4,20}$/,
    message: '4~20자의 영문 소문자, 숫자, 밑줄(_), 하이픈(-)만 사용 가능합니다.',
  },
  password: {
    regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
    message: '8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
  },
  email: {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
    message: '올바른 이메일 형식이 아닙니다.',
  },
};

function SignUpPage() {
  // --- 상태(State) 정의 ---
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    birthDate: null,
  });

  const [errors, setErrors] = useState({});

  const [idCheck, setIdCheck] = useState({
    message: '',
    isAvailable: null,
    isChecked: false,
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // --- 핸들러 함수 정의 ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // [정리] 모든 필드에 대해 실시간 유효성 검사를 여기서 처리
    validateField(name, value, formData.password);

    // 아이디가 변경되면 중복 확인 상태 초기화
    if (name === 'userId') {
      setIdCheck({ message: '', isAvailable: null, isChecked: false });
    }
  };
  
  // [추가] 유효성 검사 로직을 별도 함수로 분리
  const validateField = (name, value, password) => {
    let errorMessage = '';
    
    if (VALIDATION_RULES[name]) {
      if (value && !VALIDATION_RULES[name].regex.test(value)) {
        errorMessage = VALIDATION_RULES[name].message;
      }
    } else if (name === 'passwordConfirm') {
      if (value && password !== value) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleIdCheck = () => {
    if (errors.userId || !formData.userId) {
      alert('아이디 형식을 먼저 확인해주세요.');
      return;
    }

    if (MOCK_REGISTERED_IDS.includes(formData.userId)) {
      setIdCheck({ message: '이미 사용 중인 아이디입니다.', isAvailable: false, isChecked: true });
    } else {
      setIdCheck({ message: '사용 가능한 아이디입니다.', isAvailable: true, isChecked: true });
    }
  };
  
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // [정리] 제출 직전에 모든 유효성을 한 번에 확인
    const isFormValid = 
      Object.values(errors).every(error => !error) &&
      Object.entries(formData).every(([key, value]) => key === 'birthDate' || value) &&
      idCheck.isChecked &&
      idCheck.isAvailable &&
      agreements.terms &&
      agreements.privacy;

    if (isFormValid) {
      alert('회원가입이 완료되었습니다!');
      console.log('제출된 데이터:', formData);
    } else {
      alert('입력 항목을 다시 확인해주세요.');
    }
  };

  // --- JSX 렌더링 ---
  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (아이디, 비밀번호 등 입력 필드 JSX는 이전과 동일하게 유지) ... */}

        {/* 아이디 */}
        <div className="input-group">
          {/* ... */}
          {
            errors.userId ? <p className="error-message">{errors.userId}</p> :
            idCheck.message ? <p className={`message ${idCheck.isAvailable ? 'success' : 'error'}`}>{idCheck.message}</p> :
            <p className="info-message">{VALIDATION_RULES.userId.message}</p>
          }
        </div>
        
        {/* 비밀번호 */}
        <div className="input-group">
          {/* ... */}
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="input-group">
          {/* ... */}
          {errors.passwordConfirm && <p className="error-message">{errors.passwordConfirm}</p>}
        </div>
        
        {/* ... */}
        
        <button type="submit" className="submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;