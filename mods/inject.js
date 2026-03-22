(function() {
    try {
        // 1. CSS Injection using standard strings
        var style = document.createElement('style');
        style.innerHTML = "" +
            ".tv-focus {" +
            "  outline: 6px solid #ff0050 !important;" +
            "  outline-offset: 2px;" +
            "  background: rgba(255, 255, 255, 0.1) !important;" +
            "  transform: scale(1.02);" +
            "}" +
            "[class*='DivHeaderContainer'], .download-guide { display: none !important; }" +
            "[class*='DivSideNavContainer'] { width: 80px !important; }";
        document.head.appendChild(style);

        // 2. State variables (using var for Tizen 5.5 stability)
        var currentZone = 'video'; 
        var focusIndex = 0;

        // Helper to get elements safely
        var getElements = function() {
            return {
                sidebar: document.querySelectorAll("[data-e2e='nav-item']"),
                video: [document.querySelector('video')],
                actions: document.querySelectorAll("[data-e2e='like-icon'], [data-e2e='comment-icon']")
            };
        };

        var updateFocus = function() {
            var allFocused = document.querySelectorAll('.tv-focus');
            for (var i = 0; i < allFocused.length; i++) {
                allFocused[i].classList.remove('tv-focus');
            }
            
            var zones = getElements();
            var activeList = zones[currentZone];
            
            if (activeList && activeList[focusIndex]) {
                activeList[focusIndex].classList.add('tv-focus');
                if (typeof activeList[focusIndex].scrollIntoView === 'function') {
                    activeList[focusIndex].scrollIntoView({ block: 'center' });
                }
            }
        };

        // 3. Key Handler
        window.addEventListener('keydown', function(e) {
            var zones = getElements();
            var keyCode = e.keyCode;

            if (keyCode === 37) { // LEFT
                if (currentZone === 'video') { currentZone = 'sidebar'; focusIndex = 0; }
                else if (currentZone === 'actions') { currentZone = 'video'; focusIndex = 0; }
            } 
            else if (keyCode === 39) { // RIGHT
                if (currentZone === 'video') { currentZone = 'actions'; focusIndex = 0; }
                else if (currentZone === 'sidebar') { currentZone = 'video'; focusIndex = 0; }
            } 
            else if (keyCode === 38) { // UP
                if (currentZone === 'video') {
                    // Native Scroll Up
                } else if (focusIndex > 0) {
                    focusIndex--;
                }
            } 
            else if (keyCode === 40) { // DOWN
                if (currentZone === 'video') {
                    // Native Scroll Down
                } else if (focusIndex < zones[currentZone].length - 1) {
                    focusIndex++;
                }
            } 
            else if (keyCode === 13) { // OK
                var el = zones[currentZone][focusIndex];
                if (el) el.click();
            } 
            else if (keyCode === 10009) { // RETURN
                if (currentZone !== 'video') {
                    currentZone = 'video';
                    e.preventDefault();
                }
            }

            updateFocus();
        });

        // Set initial focus after a delay to allow TikTok to load
        setTimeout(updateFocus, 4000);

    } catch (err) {
        console.log("TikTok Mod Error: " + err.message);
    }
})();
