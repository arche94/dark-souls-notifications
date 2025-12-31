/**
 * Dark Souls "You Died" Overlay Manager
 * Handles injection and management of the overlay on web pages
 */

class DarkSoulsOverlay {
  private overlayId: string = "dark-souls-overlay";
  private overlay: HTMLElement | null = null;
  private isVisible: boolean = false;

  /**
   * Plays the "You Died" sound effect
   */
  private playSound(): void {
    // Get extension URL - works in both Chrome and Edge
    const runtime = window.chrome?.runtime || (window as any).browser?.runtime;
    if (!runtime) {
      console.error("Dark Souls Extension: chrome.runtime not available");
      return;
    }

    const soundUrl = runtime.getURL("assets/sounds/ds-you-died-sfx.mp3");
    const audio = new Audio(soundUrl);

    // Play the sound
    audio.play().catch((error) => {
      console.error("Dark Souls Extension: Failed to play sound", error);
    });
  }

  /**
   * Creates and injects the overlay into the page
   */
  private createOverlay(text: string, color: string = ""): void {
    // Remove existing overlay if present
    this.removeOverlay();

    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = this.overlayId;
    overlay.innerHTML = `
            <div class="ds-overlay-backdrop"></div>
            <div class="ds-overlay-content">
                <div class="ds-text-container">
                    <h1 class="ds-text ${
                      color.length > 0 ? `ds-text-${color}` : ""
                    }" id="ds-text">${text}</h1>
                </div>
            </div>
        `;

    // Append to body
    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.isVisible = true;

    // Play sound effect
    this.playSound();

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add("ds-overlay-visible");
    });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      this.removeOverlay();
    }, 6000);
  }

  /**
   * Removes the overlay from the page
   */
  private removeOverlay(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.classList.remove("ds-overlay-visible");
      this.overlay.classList.add("ds-overlay-hiding");

      // Remove from DOM after fade-out animation
      setTimeout(() => {
        if (this.overlay && this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay);
        }
        this.overlay = null;
        this.isVisible = false;
      }, 500);
    }
  }

  /**
   * Shows the overlay (public API)
   */
  public show(text: string, color: string = ""): void {
    if (!this.isVisible) {
      this.createOverlay(text, color);
    }
  }
}

// Make available globally for content.ts
if (typeof window !== "undefined") {
  (window as any).DarkSoulsOverlay = DarkSoulsOverlay;
}
