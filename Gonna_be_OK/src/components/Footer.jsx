// src/components/Footer.jsx
import React from 'react';
import '../CSS/Footer.css'; 

function Footer() {
    return (
        <footer className="main_footer">
            <div className="footer_content_wrapper">
                {/* table식과 유사하게 4개의 div로 의사적인 표의 형태를 생성. */}
                <div className="footer_column">
                    <h3>상담게시판</h3> 
                    <a>사람</a> <a>동물</a> <a>식물</a>
                    {/* 개별적인 요소로 기능하도록 <a>를 활용. 향후 링크삽입 가능. */}
                </div>

                <div className="footer_column">
                    <h3>프로젝트 팀 소개</h3>
                    <ul>
                        <li><a>About Us</a></li>
                        <li><a>Project Team</a></li>
                        <li><a>It's just text</a></li>
                    </ul>
                </div>

                <div className="footer_column">
                    <h3>고객 지원</h3>
                    <ul>
                        <li><a>FAQ</a></li>
                        <li><a>Contact Us</a></li>
                        <li><a>Help</a></li>
                    </ul>
                </div>

                <div className="footer_column">
                    <h3>SNS</h3>
                    <ul>
                        <li><a>Twitter</a></li>
                        <li><a>Facebook</a></li>
                        <li><a>Instagram</a></li>
                    </ul>
                </div>
            </div>

            {/* copyright */}
            <div className="footer_bottom_row">
                <div className="footer_copyright">
                    {new Date().getFullYear()} 뭐든 괜찮겠조. Everything's gonna be OK.
                </div>
            </div>
        </footer>
    );
}

export default Footer;