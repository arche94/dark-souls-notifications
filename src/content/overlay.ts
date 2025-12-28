/**
 * Dark Souls "You Died" Overlay Manager
 * Handles injection and management of the overlay on web pages
 */

class DarkSoulsOverlay {
    private overlayId: string = 'dark-souls-overlay';
    private overlay: HTMLElement | null = null;
    private isVisible: boolean = false;

    /**
     * Creates and injects the overlay into the page
     */
    private createOverlay(): void {
        // Remove existing overlay if present
        this.removeOverlay();

        // Create overlay container
        const overlay = document.createElement('div');
        overlay.id = this.overlayId;
        overlay.innerHTML = `
            <div class="ds-overlay-backdrop"></div>
            <div class="ds-overlay-content">
                <div class="ds-text-container">
                    <h1 class="ds-text-you">YOU DIED</h1>
                </div>
            </div>
        `;

        // Append to body
        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.isVisible = true;

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('ds-overlay-visible');
        });

        // Auto-dismiss after 3 seconds
        // setTimeout(() => {
        //     this.removeOverlay();
        // }, 3000);
    }

    /**
     * Removes the overlay from the page
     */
    private removeOverlay(): void {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.classList.remove('ds-overlay-visible');
            this.overlay.classList.add('ds-overlay-hiding');
            
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
    public show(): void {
        if (!this.isVisible) {
            this.createOverlay();
        }
    }
}

// Make available globally for content.ts
if (typeof window !== 'undefined') {
    (window as any).DarkSoulsOverlay = DarkSoulsOverlay;
}

