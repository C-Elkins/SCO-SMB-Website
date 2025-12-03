'use client';

import { useEffect } from 'react';

/**
 * Crisp Live Chat Integration
 * 
 * HOW IT WORKS:
 * 1. Sign up at https://crisp.chat (free plan available)
 * 2. Get your website ID from dashboard
 * 3. Replace 'YOUR_WEBSITE_ID' below with your actual ID
 * 4. The chat widget loads automatically on all pages
 * 5. Customize appearance in Crisp dashboard
 * 
 * FEATURES:
 * - Real-time chat with visitors
 * - Email notifications when offline
 * - Mobile apps (iOS/Android) for team
 * - Visitor tracking and analytics
 * - Chatbot automation available
 * - Multi-language support
 * - File sharing
 * - Typing indicators
 * 
 * CUSTOMIZATION:
 * - Colors and branding in dashboard
 * - Position (bottom right/left)
 * - Welcome message
 * - Availability schedule
 * - Auto-replies when offline
 */

export function LiveChat() {
  useEffect(() => {
    // Crisp Chat Configuration
    const CRISP_WEBSITE_ID = 'e40d8881-b491-41b9-b88c-52a2c4781ded';
    
    // Don't load in development if you want
    // if (process.env.NODE_ENV !== 'production') return;

    // Initialize Crisp
    (window as Window & { $crisp?: unknown[]; CRISP_WEBSITE_ID?: string }).$crisp = [];
    (window as Window & { $crisp?: unknown[]; CRISP_WEBSITE_ID?: string }).CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);

    // Optional: Set user data when available
    script.onload = () => {
      // You can set user email/name if logged in
      // window.$crisp.push(['set', 'user:email', ['user@example.com']]);
      // window.$crisp.push(['set', 'user:nickname', ['John Doe']]);
      
      // Set custom data for context
      const crisp = (window as Window & { $crisp?: unknown[] }).$crisp;
      if (crisp) {
        crisp.push(['set', 'session:data', [[
          ['Product', 'SCO SMB'],
          ['Page', window.location.pathname]
        ]]]);
      }
    };

    // Cleanup
    return () => {
      const crispScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (crispScript) {
        crispScript.remove();
      }
      const w = window as Window & { $crisp?: unknown[]; CRISP_WEBSITE_ID?: string };
      delete w.$crisp;
      delete w.CRISP_WEBSITE_ID;
    };
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://crisp.chat and create account
 * 2. Add your website
 * 3. Copy your Website ID from Settings → Setup
 * 4. Replace 'YOUR_WEBSITE_ID' above
 * 5. Add <LiveChat /> to your root layout
 * 6. Customize in Crisp dashboard:
 *    - Settings → Chatbox → Color
 *    - Settings → Chatbox → Position
 *    - Settings → Welcome → Welcome message
 * 
 * ALTERNATIVES:
 * - Tawk.to (free, unlimited agents)
 * - Intercom (paid, powerful features)
 * - Drift (paid, sales-focused)
 * - Tidio (freemium)
 * - LiveChat (paid, enterprise)
 * 
 * FREE TIER LIMITS (Crisp):
 * - 2 operators
 * - Unlimited conversations
 * - Basic chatbot
 * - Email integration
 * - Mobile apps
 */
