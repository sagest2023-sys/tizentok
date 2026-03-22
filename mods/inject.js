(function() {
    try {
        console.log("TizenTok: Initializing...");

        // 1. Create CSS for TV (No backticks!)
        var style = document.createElement('style');
        style.innerHTML = "" +
            "/* Hide Desktop Bloat */ " +
            "[class*='DivSideNavContainer'], [class*='DivHeaderContainer'], .download-guide { display: none !important; } " +
            "[class*='DivMainContainer'] { margin-left: 0 !important; width: 100% !important; } " +
            "/* TV Focus Indicator */ " +
            ".tv-focus { outline: 8px solid #ff0050 !important; outline-offset: -8px; }";
        document.head.appendChild(style);

        // 2. Navigation Logic
        window.addEventListener('keydown', function(e) {
            var keyCode = e.keyCode;
            
            // Tizen 5.5 KeyCodes: 38 (Up), 40 (Down), 13 (Enter/OK)
            if (keyCode === 40) { // DOWN -> Next Video
                window.scrollBy(0, window.innerHeight);
                e.preventDefault();
            } 
            else if (keyCode === 38) { // UP -> Prev Video
                window.scrollBy(0, -window.innerHeight);
                e.preventDefault();
            }
            else if (keyCode === 13) { // OK -> Like
                var likeBtn = document.querySelector('[data-e2e="like-icon"]');
                if (likeBtn) likeBtn.click();
            }
        });

        console.log("TizenTok: Loaded Successfully");
    } catch (err) {
        // This prevents the whole TV app from crashing if there's an error
        console.error("TizenTok Error: " + err.message);
    }
})();
