// 1. Inject TV-friendly CSS
const style = document.createElement('style');
style.textContent = `
    /* Hide the sidebar and top header to focus on the video */
        [class*='DivSideNavContainer'], [class*='DivHeaderContainer'] { display: none !important; }
            
                /* Center the video feed and make it take full height */
                    [class*='DivBodyContainer'] { padding: 0 !important; width: 100% !important; max-width: 100% !important; }
                        [class*='DivMainContainer'] { margin-left: 0 !important; }
                            
                                /* Make the video container larger */
                                    [class*='DivItemContainerV2'] { height: 100vh !important; }
                                        
                                            /* Hide annoying "Open App" popups */
                                                [class*='DivAppBanner'], .download-guide { display: none !important; }
                                                `;
                                                document.head.append(style);

                                                // 2. Handle TV Remote Buttons
                                                window.addEventListener('keydown', (e) => {
                                                    switch(e.keyCode) {
                                                            case 13: // 'OK' Button - Toggle Like
                                                                        const likeBtn = document.querySelector("[data-e2e='like-icon']");
                                                                                    if (likeBtn) likeBtn.click();
                                                                                                break;
                                                                                                            
                                                                                                                    case 10009: // 'Return' Button
                                                                                                                                // If in a video, go back to home; if home, exit mod
                                                                                                                                            window.history.back();
                                                                                                                                                        break;

                                                                                                                                                                case 10252: // 'Play/Pause' Button
                                                                                                                                                                            const video = document.querySelector('video');
                                                                                                                                                                                        if (video) video.paused ? video.play() : video.pause();
                                                                                                                                                                                                    break;
                                                                                                                                                                                                                
                                                                                                                                                                                                                        // Up/Down arrows are natively supported by TikTok Web for next/prev video
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            console.log("TikTok TV Mod Loaded!");