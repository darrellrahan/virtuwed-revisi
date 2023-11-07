// pages/index.tsx
'use client'

// ... other imports
// import 'youtube'; // Assuming the filename is youtube.d.ts

// ... rest of your component code

import { useEffect } from 'react';
import YouTubePlayer from '@/components/YoutubePlayer';

const IndexPage = () => {
    // let player: any;
    // const btn = document.querySelector('#unmute-button') as HTMLButtonElement



    // function onPlayerError(event: any) {
    //     console.log(event.data);
    // }

    // function onPlayerReady() {
    //     console.log('Hey, I\'m ready');
    //     // Do whatever you want here, like player.playVideo();
    // }

    // function onPlayerStateChange() {
    //     console.log('My state changed');
    // }

    // function unmute() {
    //     player.unMute();
    //     btn.style.display = 'none';
    //     player.playVideo();
    //     launchFullScreen(document.documentElement);
    // }

    // function launchFullScreen(element: any) {
    //     if (element.requestFullScreen) {
    //         element.requestFullScreen();
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen();
    //     } else if (element.webkitRequestFullScreen) {
    //         element.webkitRequestFullScreen();
    //     }
    // }

    // // Event listener for window resize
    // const handleResize = () => {
    //     const videoElement = document.getElementById('video') as HTMLIFrameElement
    //     videoElement.style.width = `${window.innerWidth}px`;
    //     videoElement.style.height = `${window.innerHeight}px`;
    // };

    useEffect(() => {
        // Load the YouTube API
        // const tag = document.createElement('script');
        // tag.src = 'https://www.youtube.com/iframe_api';
        // const firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Replace the 'video' element with an <iframe> and
        // YouTube player after the API code downloads.


        // function onYouTubePlayerAPIReady() {
        //     player = new YT.Player('video', {
        //         events: {
        //             onReady: onPlayerReady,
        //             onStateChange: onPlayerStateChange,
        //             onError: onPlayerError,
        //         },
        //     });
        // }


        // Initial setup for video size
        // handleResize();

        // // Attach event listener for window resize
        // window.addEventListener('resize', handleResize);

        // return () => {
        //     // Cleanup on component unmount
        //     window.removeEventListener('resize', handleResize);
        // };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <button className='btn btn-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3 px-5 cursor-pointer my-auto' id="unmute-button">
                Listen to the Live Streaming Sound
            </button>

            <YouTubePlayer videoId="HqYhkpGgZXc" />
            {/* <iframe
                id="video"
                width="100%"
                height="100%"
                src="//www.youtube.com/embed/TdrUWnZ04HY?rel=0&autoplay=1&controls=0&showinfo=0&enablejsapi=1&mute=1&disablekb=1&iv_load_policy=3&loop=0&origin=https://agyson.github.io"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe> */}
        </div>
    );
};

export default IndexPage;
