import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import { Analytics } from "@vercel/analytics/react"


const API_BASE_URL = 'https://lee-mujin-api-ver10.vercel.app/api/';

const reloadKakaoAd = () => {
    if (window.kakao_ad_area && typeof window.kakao_ad_area.reloadAll === 'function') {
        console.log('AdFit: window.kakao_ad_area.reloadAll() 호출');
        window.kakao_ad_area.reloadAll();
    } else {
        console.log('AdFit: 새로고침 함수 (window.kakao_ad_area.reloadAll) 준비되지 않음');
    }
};


const Home = () => {
    useEffect(() => {
        if (document.querySelector('script[src*="ba.min.js"]')) {
            console.log('AdFit: 스크립트가 이미 로드되었습니다.');
            return;
        }

        const script = document.createElement("script");
        script.setAttribute("src", "//t1.daumcdn.net/kas/static/ba.min.js");
        script.setAttribute("charset", "utf-8");
        script.setAttribute("async", "true");

        document.body.appendChild(script);
        setTimeout(reloadKakaoAd, 1000);
    }, []);


    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}${activeTab}`);
                if (!response.ok) {
                    throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();

                let videoList = [];

                if (activeTab === 'all') {
                    const allVideos = [];
                    for (const key in data) {
                        if (Array.isArray(data[key])) {
                            allVideos.push(...data[key]);
                        }
                    }
                    videoList = allVideos;
                } else {
                    if (Array.isArray(data)) {
                        videoList = data;
                    } else {
                        console.error(`비디오 목록 API 응답 형식 오류 (탭: ${activeTab}):`, data);
                        throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
                    }
                }

                if (videoList.every(item => item && typeof item === 'object' && 'link' in item)) {
                    setVideos(videoList);
                } else {
                    console.error(`비디오 목록 데이터에 유효하지 않은 항목이 있습니다 (탭: ${activeTab}):`, videoList);
                    throw new Error('데이터에 유효하지 않은 비디오 항목이 포함되어 있습니다.');
                }

            } catch (err) {
                setError(err.message);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [activeTab]);

    useEffect(() => {
        if (!loading) {
            reloadKakaoAd();
        }
    }, [loading, activeTab]);

    const tabs = [
        { name: '전체', key: 'all' },
        { name: '노래', key: 'songs' },
        { name: '출퇴근', key: 'commute' },
        { name: '예능', key: 'entertainment' },
    ];

    return (
        <div className="container">
            <div className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={activeTab === tab.key ? 'active' : ''}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {loading && (
                <div className="loading-message-container">
                    <div className="spinner"></div>
                    <p>로딩중... 시간이 좀 걸릴 수 있습니다</p>
                </div>
            )}

            {error && <div className="error">오류: {error}</div>}

            {!loading && !error && (
                <div className="video-grid">
                    {videos.length > 0 ? (
                        videos.map((video, index) => (
                            <VideoCard key={index} video={video}/>
                        ))
                    ) : (
                        <div className="no-videos">해당 카테고리의 영상이 없습니다.</div>
                    )}
                </div>
            )}
            <h1>' '</h1>
            <div className="ad-container">
                <ins className="kakao_ad_area"
                     data-ad-unit="DAN-CLY0wiy7WxQp6gbK"
                     data-ad-width="320"
                     data-ad-height="100"></ins>
            </div>
            <Analytics />
        </div>
    );
};

export default Home;
