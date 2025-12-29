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

(function () {
  "use strict";

  // Initialize overlay manager
  // DarkSoulsOverlay is loaded from overlay.ts (listed before this script in manifest)
  const overlay = new (
    window as unknown as WindowWithOverlay
  ).DarkSoulsOverlay();
  
  // Inject font-face rules with extension URLs
  function injectFonts(): void {
    // Check if fonts are already injected
    if (document.getElementById("dark-souls-fonts")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "dark-souls-fonts";

    // Get extension URL - works in both Chrome and Edge
    const runtime = window.chrome?.runtime || (window as any).browser?.runtime;
    if (!runtime) {
      console.error("Dark Souls Extension: chrome.runtime not available");
      return;
    }

    const fontBaseUrl = runtime.getURL("assets/fonts/");

    style.textContent = `
            @font-face {
                font-family: 'OptimusPrinceps';
                src: url('${fontBaseUrl}OptimusPrinceps.ttf') format('truetype');
            }
            
            @font-face {
                font-family: 'OptimusPrincepsSemiBold';
                src: url('${fontBaseUrl}OptimusPrincepsSemiBold.ttf') format('truetype');
            }
        `;

    document.head.appendChild(style);
  }

  /**
   * Handle click events on the page
   */
  function setupClickListeners(): void {
    document.addEventListener("click", () => {
      overlay.show();
    })
  }

  // Inject fonts immediately
  injectFonts();
  
  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupClickListeners();
    });
  } else {
    setupClickListeners();
  }
})();
