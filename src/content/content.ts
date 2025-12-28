/**
 * Dark Souls Notifications Content Script
 * Detects form submissions and triggers the overlay
 */

interface DarkSoulsOverlay {
    show(): void;
}

interface WindowWithOverlay extends Window {
    DarkSoulsOverlay: new () => DarkSoulsOverlay;
}

(function() {
    'use strict';

    // Initialize overlay manager
    // DarkSoulsOverlay is loaded from overlay.ts (listed before this script in manifest)
    const overlay = new (window as unknown as WindowWithOverlay).DarkSoulsOverlay();

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            overlay.show();
        });
    } else {
        overlay.show();
    }
})();

