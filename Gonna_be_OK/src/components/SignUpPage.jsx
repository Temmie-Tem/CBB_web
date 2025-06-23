import React, { useState, useEffect } from 'react';
import '../CSS/SignUpPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

// --- 정규식 및 가상 데이터 ---
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const userIdRegex = /^[a-z0-9_-]{4,20}$/;
const MOCK_REGISTERED_IDS = ['admin', 'test', 'temmie']; // 이미 등록된 아이디 목록

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
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // [수정] ID 중복 확인 관련 상태를 하나로 통합 관리
  const [idCheck, setIdCheck] = useState({
    message: '',      // 보여줄 메시지
    isAvailable: null, // null: 확인전, true: 사용가능, false: 중복/에러
    isChecked: false,  // 중복 확인 버튼을 눌렀는지 여부
  });

  // --- 핸들러 함수 정의 ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 아이디 입력창이 수정되면, 중복 확인 상태를 초기화
    if (name === 'userId') {
      setIdCheck({ message: '', isAvailable: null, isChecked: false });
    }
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };
  
  // [수정] ID 중복 확인 함수
  const handleIdCheck = () => {
    // 1. 아이디 유효성 검사부터 실행
    if (!userIdRegex.test(formData.userId)) {
      setIdCheck({
        message: '아이디는 4~20자의 영문 소문자, 숫자, 밑줄(_), 하이픈(-)만 사용 가능합니다.',
        isAvailable: false,
        isChecked: true, // 확인은 했지만 실패
      });
      return;
    }

    // 2. 가상 데이터와 비교하여 중복 확인
    if (MOCK_REGISTERED_IDS.includes(formData.userId)) {
      setIdCheck({
        message: '이미 사용 중인 아이디입니다.',
        isAvailable: false,
        isChecked: true,
      });
    } else {
      setIdCheck({
        message: '사용 가능한 아이디입니다.',
        isAvailable: true,
        isChecked: true,
      });
    }
  };

  // [수정] ID 필드에 대한 실시간 유효성 검사 추가
useEffect(() => {
  // 사용자가 입력을 멈춘 후 0.5초 뒤에 검사하도록 설정 (Debouncing)
  const handler = setTimeout(() => {
    // ID 입력란이 비어있지 않고, 중복 확인을 아직 안 한 상태일 때만 실시간 검사
    if (formData.userId && !idCheck.isChecked) {
      if (!userIdRegex.test(formData.userId)) {
        setErrors((prev) => ({ ...prev, userId: '아이디는 4~20자의 영문 소문자, 숫자, 밑줄(_), 하이픈(-)만 사용 가능합니다.' }));
      } else {
        // 정규식을 통과하면 에러 메시지를 지움
        setErrors((prev) => ({ ...prev, userId: '' }));
      }
    } else {
       // 비어있거나 중복 확인이 끝나면 에러 메시지를 지움
       setErrors((prev) => ({ ...prev, userId: '' }));
    }
  }, 500);

  // 컴포넌트가 unmount 되거나, userId가 변경되기 전에 setTimeout을 정리
  return () => {
    clearTimeout(handler);
  };
}, [formData.userId, idCheck.isChecked]);


  // --- 유효성 검사 로직 (useEffect) ---
  
  // 비밀번호, 이메일 등 다른 필드에 대한 실시간 에러 메시지
  useEffect(() => {
    const newErrors = {};

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다.";
    }
    if (formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    setErrors(newErrors);
  }, [formData.password, formData.passwordConfirm, formData.email]);


  // 최종 '가입하기' 버튼 활성화 여부 관리
  useEffect(() => {
    const isOtherInfoValid =
      formData.name.trim() !== '' &&
      passwordRegex.test(formData.password) &&
      formData.password === formData.passwordConfirm &&
      emailRegex.test(formData.email);

    const areRequiredAgreementsChecked = agreements.terms && agreements.privacy;

    // 아이디 중복 확인을 통과했고, 나머지 정보도 유효하면 가입 버튼 활성화
    if (idCheck.isChecked && idCheck.isAvailable && isOtherInfoValid && areRequiredAgreementsChecked) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, agreements, idCheck]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('제출된 데이터:', { ...formData, ...agreements });
      alert('회원가입이 완료되었습니다!');
    } else {
      if (!idCheck.isChecked || !idCheck.isAvailable) {
        alert('아이디 중복 확인을 완료해주세요.');
      } else {
        alert('입력 항목을 다시 확인해주세요.');
      }
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
          <div className="id-check-group">
            <input
              type="text" id="userId" name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
            />
            <button type="button" onClick={handleIdCheck} className="id-check-button">
              아이디 사용 확인
            </button>
    </div>

  {/* [수정된 부분] 메시지 표시 로직 변경 */}
  {
    // 1순위: 실시간 형식 에러가 있으면 에러 메시지를 표시
    errors.userId ? (
      <p className="error-message">{errors.userId}</p>
    ) :
    // 2순위: 중복 확인 결과가 있으면 그 결과를 표시
    idCheck.message ? (
      <p className={`message ${idCheck.isAvailable ? 'success' : 'error'}`}>{idCheck.message}</p>
    ) : (
    // 3순위: 위 두 메시지가 모두 없으면 기본 규칙 안내 메시지를 표시
      <p className="info-message">4~20자의 영문 소문자, 숫자, _, -만 사용 가능합니다.</p>
    )
  }
</div>

          {/* 이름, 생년월일, 비밀번호, 이메일 등 나머지 JSX는 기존과 동일하게 유지 */}
          {/* ... (이하 생략) ... */}
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
              selected={formData.birthDate}
              onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
              dateFormat="yyyy/MM/dd"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              placeholderText="생년월일을 선택하세요"
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