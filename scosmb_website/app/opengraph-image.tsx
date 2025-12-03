import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
export const alt = 'SCO SMB - Enterprise Scanning Solution'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #153B6B 0%, #1e4a7f 50%, #00A8B5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            SCO SMB
          </div>
          <div
            style={{
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Enterprise Document Scanning Solution
          </div>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', background: '#00A8B5', borderRadius: '50%' }} />
              Kyocera & Sharp
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', background: '#00A8B5', borderRadius: '50%' }} />
              Zero Config
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', background: '#00A8B5', borderRadius: '50%' }} />
              Enterprise Security
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
