// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Essential layout styles */
  html {
    line-height: 1.6;
    -webkit-text-size-adjust: 100%;
    color-scheme: light;
  }
  
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #ffffff;
    color: #1f2937;
  }
  
  /* Header critical styles */
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  /* Hero section critical styles */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #153B6B 0%, #1e4a7f 50%, #00A8B5 100%);
    position: relative;
    overflow: hidden;
  }
  
  .hero-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  /* Typography critical styles */
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: white;
  }
  
  .hero-description {
    font-size: clamp(1.125rem, 2vw, 1.25rem);
    line-height: 1.6;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
  }
  
  /* Button critical styles */
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #00A8B5;
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }
  
  .cta-button:hover {
    background: #008c97;
  }
  
  /* Loading states */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
  
  /* Responsive grid */
  .container-wide {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  /* Hide non-critical content initially */
  .below-fold {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .below-fold.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function CriticalStyles() {
  return (
    <style 
      dangerouslySetInnerHTML={{ __html: criticalCSS }}
      data-critical="true"
    />
  );
}