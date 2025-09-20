// src/components/VideoCard.js
import React from 'react';

const VideoCard = ({ video }) => {
    // YouTube 링크에서 비디오 ID를 추출하는 함수
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeVideoId(video.link);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : 'placeholder.jpg'; // 썸네일이 없을 경우 대체 이미지

    return (
        <a href={video.link} target="_blank" rel="noopener noreferrer" className="video-card">
            <img src={thumbnailUrl} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {/* 현재 API 응답에 upload_date가 없으므로 이 부분은 생략합니다. */}
                {/* <p className="video-date">{video.upload_date}</p> */}
            </div>
        </a>
    );
};

export default VideoCard;