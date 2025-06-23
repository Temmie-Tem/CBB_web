import React, { useState, useEffect } from 'react';
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
    validateField(name, value, formData.password);

    if (name === 'userId') {
      setIdCheck({ message: '', isAvailable: null, isChecked: false });
    }
  };
  
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
    
    // [수정] 제출 시점에서 각 항목을 순서대로 검사하여 피드백
    
    // 1. 필수 입력 필드 확인 (이름, 생년월일, 이메일, 비밀번호 등)
    if (!formData.name) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!formData.birthDate) {
      alert('생년월일을 선택해주세요.');
      return;
    }
    if (!formData.email) {
        alert('이메일을 입력해주세요.');
        return;
    }
    if (!formData.password) {
        alert('비밀번호를 입력해주세요.');
        return;
    }
    
    // 2. 형식 유효성(정규식, 비밀번호 일치) 에러 확인
    if (errors.userId) {
        alert(`아이디가 올바르지 않습니다: ${errors.userId}`);
        return;
    }
    if (errors.email) {
        alert(`이메일이 올바르지 않습니다: ${errors.email}`);
        return;
    }
    if (errors.password) {
        alert(`비밀번호가 올바르지 않습니다: ${errors.password}`);
        return;
    }
    if (errors.passwordConfirm) {
        alert(errors.passwordConfirm);
        return;
    }

    // 3. 아이디 중복 확인 여부 검사
    if (!idCheck.isChecked) {
      alert('아이디 사용 확인(중복 확인)을 해주세요.');
      return;
    }
    if (!idCheck.isAvailable) {
      alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.');
      return;
    }

    // 4. 필수 약관 동의 확인
    if (!agreements.terms || !agreements.privacy) {
      alert('필수 이용약관에 동의해주세요.');
      return;
    }

    // 모든 검증을 통과했을 경우
    alert('회원가입이 완료되었습니다!');
    console.log('제출된 데이터:', formData);
  };

    // ▼▼▼ 데이터 손실 경고 기능을 위한 useEffect 추가 ▼▼▼
  useEffect(() => {
    // 사용자가 폼에 무언가 입력했는지 확인하는 함수
    const isFormDirty = Object.values(formData).some(value => {
      // formData의 값이 null이 아니고, 빈 문자열이 아닌 경우 true
      return value !== null && value !== '';
    });

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (e) => {
      // 폼이 dirty 상태일 때만 경고창을 띄움
      if (isFormDirty) {
        e.preventDefault(); // 표준에 따라 필요
        e.returnValue = ''; // 일부 레거시 브라우저를 위해 필요
      }
    };

    // 이벤트 리스너 추가
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 클린업 함수: 컴포넌트가 사라질 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    
    // 이 useEffect는 formData가 변경될 때마다 isFormDirty 값을 다시 계산해야 함
  }, [formData]);

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
            <div className="id-check-group">
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
              />
              <button type="button" onClick={handleIdCheck} className="id-check-button">
                아이디 사용 확인
              </button>
            </div>
            {
              errors.userId ? <p className="error-message">{errors.userId}</p> :
              idCheck.message ? <p className={`message ${idCheck.isAvailable ? 'success' : 'error'}`}>{idCheck.message}</p> :
              <p className="info-message">{VALIDATION_RULES.userId.message}</p>
            }
          </div>

          {/* 이름 */}
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 생년월일 */}
          <div className="input-group">
            <label>생년월일</label>
            <DatePicker
              selected={formData.birthDate}
              onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
              dateFormat="yyyy/MM/dd"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              placeholderText="생년월일을 선택하세요"
              className="date-picker-full-width"
            />
          </div>

          {/* 비밀번호 */}
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
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.passwordConfirm && <p className="error-message">{errors.passwordConfirm}</p>}
          </div>

          {/* 이메일 */}
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

        {/* 최종 제출 버튼 */}
        <button type="submit" className="submit-btn">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;