import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="personal-info">
                    <p>© 2025 LeeMujinsite | Developed by <a href="https://github.com/lmwmason" target="_blank" rel="noopener noreferrer">@happy-coding</a></p>
                    <p>Email: <a href="mailto:grassfpv@naver.com">grassfpv@naver.com</a></p>
                </div>
                <div className="mujin-links">
                    <h4>이무진 관련 링크</h4>
                    <ul>
                        <li><a href="https://www.youtube.com/@leemujin" target="_blank" rel="noopener noreferrer">이무진 공식 유튜브</a></li>
                        <li><a href="https://www.instagram.com/morilla_mujin/" target="_blank" rel="noopener noreferrer">이무진 인스타그램</a></li>
                        <li><a href="https://m.cafe.daum.net/LEEMUJIN/_rec" target="_blank" rel="noopener noreferrer">이무진 공식 팬카페</a></li>
                        <li><a href="https://cafe.naver.com/loveleemujin" target="_blank" rel="noopener noreferrer">이무진 네이버 팬카페</a></li>
                        <li><a href="https://namu.wiki/w/%EC%9D%B4%EB%AC%B4%EC%A7%84" target="_blank" rel="noopener noreferrer">이무진 나무위키</a></li>
                        <li><a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%AC%B4%EC%A7%84" target="_blank" rel="noopener noreferrer">이무진 위키백과</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;