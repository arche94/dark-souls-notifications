# Dark Souls Notifications - Privacy Policy

**Last Updated:** [Date]

## Overview

Dark Souls Notifications is a browser extension that displays Dark Souls "You Died" styled notifications when certain events occur on supported websites (GitHub and Atlassian Jira). This privacy policy explains how the extension handles your data.

## Data Collection and Usage

**We do not collect, store, or transmit any personal data.**

All processing happens locally in your browser. The extension does not:

- Collect any personal information
- Store data on external servers
- Transmit data to third parties
- Use analytics or tracking services
- Access your browsing history beyond what is necessary for functionality

## Permissions Explained

### `webRequest` Permission

**Purpose:** To detect when you change task status in Atlassian Jira by monitoring API requests to Jira's transition endpoints.

**What it does:** The extension intercepts requests to `https://*.atlassian.net/*/transitions` to read the task status change. This data is processed locally and immediately discarded. No data is stored or transmitted.

**Data accessed:** Only the task transition information (status name) from the request body, which is used solely to trigger the notification overlay.

### Host Permissions: `https://*.atlassian.net/*`

**Purpose:** Required for the `webRequest` API to intercept requests to Atlassian Jira domains.

**What it does:** Allows the extension to monitor Jira API calls to detect task status changes. This permission is necessary for the extension to function on Jira websites.

### Content Scripts on All URLs

**Purpose:** To monitor GitHub and Jira pages for events (pull request merges/closes, task completions) by observing DOM changes.

**What it does:** The extension injects scripts that observe page changes on GitHub and Jira to detect when events occur. The scripts only read publicly visible page content to determine event status. No data is extracted or stored.

### Web Accessible Resources

**Purpose:** To load custom fonts and sound effects for the notification overlay.

**What it does:** Makes font files (`.ttf`) and sound files (`.mp3`) accessible to web pages so the overlay can display with the Dark Souls styling and play sound effects. These are static assets bundled with the extension.

## Local Processing

All functionality operates entirely within your browser:

- Event detection happens through DOM observation and API request monitoring
- Notifications are displayed locally
- No data leaves your device
- No external network requests are made (except for the monitored Jira API calls, which are only observed, not modified)

## Third-Party Services

This extension does not integrate with any third-party services, analytics platforms, or data collection services.

## Changes to This Policy

If we make changes to this privacy policy, we will update the "Last Updated" date at the top of this document. For significant changes, we will notify users through the extension's update mechanism.

## Contact

If you have questions about this privacy policy or how the extension handles data, please contact us through the extension's support channels.

---

**Summary:** This extension processes all data locally in your browser. No personal data is collected, stored, or transmitted. All permissions are used solely for the purpose of detecting events on supported websites and displaying notifications.
