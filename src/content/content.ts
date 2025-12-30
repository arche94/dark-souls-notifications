/**
 * Dark Souls Notifications Content Script
 * Detects form submissions and triggers the overlay
 */

import $ from "jquery";

interface DarkSoulsOverlay {
  show(text: string): void;
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

  function handleJiraTaskCompleted(): void {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes as NodeList)) {
          if (!(node instanceof Element)) continue;

          const $node = $(node);
          const $found = $node.find(
            "button[data-testid='issue-field-status.ui.status-view.status-button.status-button']"
          );

          if ($found.length > 0) {
            if ($found[0]?.textContent.trim().toLowerCase() === "done") {
              overlay.show("TASK COMPLETED");
            }
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    chrome.runtime.onMessage.addListener((message: any) => {
      if (message.type === "jira-task-status-change") {
        if (message.status.trim().toLowerCase() === "done") {
          overlay.show("TASK COMPLETED");
        }
      }
    });
  }

  // Inject fonts immediately
  injectFonts();

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      handleJiraTaskCompleted();
    });
  } else {
    handleJiraTaskCompleted();
  }
})();
