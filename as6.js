$(function() {
    // Sync video playback based on scroll position for a specific video section
    function syncVideoPlayback(videoId, sectionId) {
        const videoElement = $(videoId).get(0);
        const sectionElement = $(sectionId);

        if (!videoElement) {
            console.error("Video element not found:", videoId);
            return;
        }

        $(window).on('scroll', function() {
            const sectionTop = sectionElement.offset().top;
            const sectionHeight = sectionElement.height();
            const windowTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            // Check if the section is in view
            if (windowTop >= sectionTop - windowHeight && windowTop < sectionTop + sectionHeight) {
                // Calculate playback time relative to scroll position in the section
                const maxScroll = sectionHeight + windowHeight;
                const currentScrollPosition = windowTop - sectionTop + windowHeight;
                videoElement.currentTime = videoElement.duration * (currentScrollPosition / maxScroll);
            } else {
                // Pause the video if the section is out of view
                videoElement.pause();
            }
        });
    }

    // Initialize scroll-sync for each video section
    syncVideoPlayback('#video1', '#videoSection1');
    syncVideoPlayback('#video2', '#videoSection2');
});
