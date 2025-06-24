import React from 'react';
import '../CSS/PrivacyPolicyPage.css';

function PrivacyPolicyPage() {
  return (

    /* 개인정보 수집 및 이용 전체 */
    <div className="privacy_policy_page_container">
      <h1>개인정보 수집 및 이용</h1>
      <div className="privacy_policy_content_scrool_box">
        <h2>제 1조 (목적)</h2>
        <p>
          이 약관은 [회사명] (이하 "회사")가 제공하는 [서비스명] 관련 제반 서비스의 이용과
          관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
          목적으로 합니다.
        </p>
        <h2>제 2조 (정의)</h2>
        <p>...</p>
        {/* ... 약관 내용 ... */}
      </div>
    </div>
    /* // 개인정보 수집 및 이용 전체 */
  );
}

export default PrivacyPolicyPage;