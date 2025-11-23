import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'SCO SMB - Enterprise Scanning Solution (AMP)',
  description: 'Ultra-fast mobile version of SCO SMB - Professional document scanning for Kyocera & Sharp printers.',
  other: {
    'amp': '',
    'amp-script-src': 'none'
  }
}

export default function AMPHomePage() {
  return (
    <html {...({ amp: '' } as any)}>
      <head>
            <meta charSet="utf-8" />
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <title>SCO SMB - Enterprise Scanning Solution</title>
            <link rel="canonical" href="https://sco-smb.com" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "SCO SMB",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": ["macOS", "Windows"],
                        "description": "Professional document scanning solution for Kyocera & Sharp printers with automatic network discovery, enterprise security, and automatic file organization.",
                        "url": "https://sco-smb.com",
                        "downloadUrl": "https://sco-smb.com/download",
                        "author": {
                            "@type": "Organization",
                            "name": "South Coast Office"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }} />
            <style amp-boilerplate="">
                {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
            </style>
            <noscript>
                <style amp-boilerplate="">
                    {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
                </style>
            </noscript>
            <style amp-custom="">
                {`
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; line-height: 1.6; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
            .hero { background: linear-gradient(135deg, #153B6B 0%, #00A8B5 100%); color: white; padding: 60px 0; text-align: center; }
            .hero h1 { font-size: 2.5rem; margin: 0 0 20px; font-weight: 700; }
            .hero p { font-size: 1.2rem; opacity: 0.9; margin: 0 0 30px; }
            .btn { display: inline-block; padding: 15px 30px; background: #00A8B5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px; }
            .features { padding: 80px 0; background: #fafbfc; }
            .features h2 { text-align: center; font-size: 2.2rem; margin-bottom: 50px; color: #153B6B; }
            .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
            .feature-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .feature-card h3 { color: #153B6B; margin: 0 0 15px; }
            .footer { background: #153B6B; color: white; padding: 40px 0; text-align: center; }
            @media (max-width: 768px) {
              .hero h1 { font-size: 2rem; }
              .hero p { font-size: 1rem; }
              .container { padding: 0 15px; }
            }
          `}
            </style>
        </head><body>
                <section className="hero">
                    <div className="container">
                        <h1>SCO SMB Enterprise Scanning</h1>
                        <p>Professional document scanning for Kyocera & Sharp printers with zero-configuration setup</p>
                        {React.createElement('amp-img', {
                            src: "/screenshots/sco-smb-hero-dashboard.png",
                            alt: "SCO SMB Dashboard",
                            width: "800",
                            height: "600",
                            layout: "responsive"
                        })}
                        <div style={{ marginTop: '30px' }}>
                            <a href="/download" className="btn">Download Free</a>
                            <a href="/trial" className="btn">Start Trial</a>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <div className="container">
                        <h2>Key Features</h2>
                        <div className="feature-grid">
                            <div className="feature-card">
                                <h3>Network Discovery</h3>
                                <p>Automatically finds and configures compatible printers on your network. No manual setup required.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Enterprise Security</h3>
                                <p>Bank-grade encryption and security protocols protect your sensitive documents during transmission.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Smart Organization</h3>
                                <p>Automatic file naming and folder organization based on customizable rules and metadata.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Multi-Protocol Support</h3>
                                <p>Works with SMB, FTP, Email, and cloud storage services for maximum compatibility.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="container">
                        <p>&copy; 2024 South Coast Office. All rights reserved.</p>
                        <p>
                            <a href="/privacy" style={{ color: 'white', marginRight: '20px' }}>Privacy</a>
                            <a href="/terms" style={{ color: 'white', marginRight: '20px' }}>Terms</a>
                            <a href="/contact" style={{ color: 'white' }}>Contact</a>
                        </p>
                    </div>
                </footer>
            </body>
    </html>
  )
}