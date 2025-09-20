import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

const API_BASE_URL = 'https://lee-mujin-api-ver10.vercel.app/api/';

const Home = () => {
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
                            <VideoCard key={index} video={video} />
                        ))
                    ) : (
                        <div className="no-videos">해당 카테고리의 영상이 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;