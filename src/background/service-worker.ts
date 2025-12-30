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

chrome.webRequest.onBeforeRequest.addListener(
  (details: chrome.webRequest.WebRequestBodyDetails) => {
    if (details.url.includes("/transitions")) {
      const decodedBody = JSON.parse(
        new TextDecoder().decode(
          details.requestBody?.raw?.[0]?.bytes as ArrayBuffer
        )
      );
      chrome.tabs.sendMessage(details.tabId, {
        type: "jira-task-status-change",
        status: decodedBody?.transition?.name || "",
      });
    }
  },
  { urls: ["https://*.atlassian.net/*"] },
  ["requestBody"]
);
