import React from 'react';
import '../CSS/Banner_style.css';

function Banner() {
    return (
        <div className='main_banner'>
            <img src="./src/img/Banner.png" alt="banner" />
            {/* 폭 1200px, 높이450px 이하의 이미지를 사용하세요. */}
        </div>
    )

}

export default Banner;