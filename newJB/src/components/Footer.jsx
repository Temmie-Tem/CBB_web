// src/components/Footer.jsx
import React from 'react';
import '../css/Footer_style.css'; 

function Footer() {
    return (
        <footer className="main_footer">
            <div className="footer_content_wrapper">
                {/* table식과 유사하게 4개의 div로 의사적인 표의 형태를 생성. */}
                <div className="footer_column">
                    <h3>상담게시판</h3> 
                    <a href="">사람</a> <a href="">동물</a> <a href="">식물</a>
                    {/* 개별적인 요소로 기능하도록 <a>를 활용. 향후 링크삽입 가능. */}
                </div>

                <div className="footer_column">
                    <h3>프로젝트 팀 소개</h3>
                    <ul>
                        <li><a href="#about">about us</a></li>
                        <li><a href="#team">project team</a></li>
                        <li><a href="#none">its just text</a></li>
                    </ul>
                </div>

                <div className="footer_column">
                    <h3>고객 지원</h3>
                    <ul>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">contact us</a></li>
                        <li><a href="#help">help</a></li>
                    </ul>
                </div>

                <div className="footer_column">
                    <h3>SNS</h3>
                    <ul>
                        <li><a href="#twitter">Twitter</a></li>
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#instagram">Instagram</a></li>
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