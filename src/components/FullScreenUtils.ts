// const launchFullScreen = (element: HTMLElement) => {
//     if (element.requestFullscreen) {
//         element.requestFullscreen().catch((error) => {
//             console.error("Error requesting fullscreen:", error);
//         });
//         // } else if (element.mozRequestFullScreen) {
//         //     element.mozRequestFullScreen();
//         // } else if (element.webkitRequestFullscreen) {
//         //     element.webkitRequestFullscreen();
//     }
// };

// export const launchFullScreenDemo = () => {
//     const fullScreenElement = document.documentElement; // the whole page
//     // const videoElement = document.getElementById("videoElement");

//     launchFullScreen(fullScreenElement);
//     // launchFullScreen(videoElement);
// };

export const launchFullScreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
        element.requestFullscreen().catch((error) => {
            console.error("Error requesting fullscreen:", error);
        });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen().catch((error) => {
            console.error("Error requesting fullscreen:", error);
        });
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().catch((error) => {
            console.error("Error requesting fullscreen:", error);
        });
    }
};

