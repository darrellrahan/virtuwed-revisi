import React from 'react';
// import YouTube from 'react-youtube';
import YouTube, { YouTubeProps } from 'react-youtube';

interface YouTubePlayerProps {
    videoId: string;
    height: string | number;
    width: string | number;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, height, width }) => {

    const opts: YouTubeProps['opts'] = {
        // height: `${window.innerHeight}px`,
        // width: `${window.innerWidth}px`,
        height: `${height}px`,
        width: `${width}px`,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            loop: 1,
            controls: 1,
            mute: 0,
            origin: 'https://virtuwed.id',
            rel: 0,
            showinfo: 0,
            disablekb: 1,
            iv_load_policy: 3
        },
    };

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        // event.target.playVideo();
    }

    const onError = (error: any) => {
        console.error('YouTube Player Error:', error);
    };

    return <YouTube opts={opts} videoId={videoId} onReady={onPlayerReady} onError={onError} />;
};

export default YouTubePlayer;