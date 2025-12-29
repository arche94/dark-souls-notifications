/**
 * Dark Souls Notifications Background Service Worker
 * Handles extension lifecycle and optional settings management
 */

// Extension installation handler
chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === "install") {
      console.log("Dark Souls Notifications extension installed");
      // Future: Could show welcome page or set default settings
    } else if (details.reason === "update") {
      console.log("Dark Souls Notifications extension updated");
    }
  }
);

// Optional: Handle messages from content scripts if needed in the future
chrome.runtime.onMessage.addListener(
  (
    _request: any,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ): boolean => {
    // Future: Handle settings updates, statistics, etc.
    return true; // Keep channel open for async response
  }
);
