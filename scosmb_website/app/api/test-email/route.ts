import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Resend not configured',
          message: 'RESEND_API_KEY environment variable is not set in Vercel',
          configured: false
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { to, subject, message } = await request.json();

    // Use provided email or default to admin
    const recipientEmail = to || 'admin@southcoastoffice.com';

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'SCO SMB Test <no-reply@sco-smb.com>',
      to: [recipientEmail],
      subject: subject || '🧪 SCO SMB - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #153B6B 0%, #00A8B5 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">✅ Test Email Successful!</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333;">Hi there! 👋</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #153B6B;">
                <strong>🎉 Good news!</strong> Your Resend email integration is working correctly.
              </p>
            </div>

            ${message ? `
              <div style="margin: 20px 0;">
                <p style="color: #153B6B; font-weight: bold; margin-bottom: 10px;">Test Message:</p>
                <div style="background-color: #fff; border-left: 4px solid #00A8B5; padding: 15px; color: #333; white-space: pre-wrap;">${message}</div>
              </div>
            ` : ''}
            
            <div style="margin: 30px 0;">
              <h3 style="color: #153B6B; margin-bottom: 15px;">✨ Features Working:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>✅ Email delivery via Resend API</li>
                <li>✅ HTML template rendering</li>
                <li>✅ Admin authentication</li>
                <li>✅ Environment configuration</li>
              </ul>
            </div>

            <div style="background-color: #e7f6f7; border-left: 4px solid #00A8B5; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #153B6B; font-size: 14px;">
                <strong>💡 Pro Tip:</strong> You can now use this email service for:
              </p>
              <ul style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                <li>Contact form notifications</li>
                <li>License key delivery</li>
                <li>Customer communications</li>
                <li>Trial request confirmations</li>
              </ul>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 12px; margin: 5px 0;">
                <strong>Test Details:</strong><br>
                Sent by: ${session.username}<br>
                Timestamp: ${new Date().toLocaleString()}<br>
                Recipient: ${recipientEmail}
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
            <p style="margin: 0;">SCO SMB Website - Email Test</p>
            <p style="margin: 5px 0 0 0;">Powered by Resend</p>
          </div>
        </div>
      `,
      text: `
SCO SMB - Test Email Successful! ✅

Hi there! This is a test email from your SCO SMB website.

Your Resend email integration is working correctly.

${message ? `Test Message:\n${message}\n\n` : ''}

Features Working:
- Email delivery via Resend API
- HTML template rendering  
- Admin authentication
- Environment configuration

Sent by: ${session.username}
Timestamp: ${new Date().toLocaleString()}
Recipient: ${recipientEmail}

---
SCO SMB Website - Email Test
Powered by Resend
      `.trim()
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send test email',
          details: error,
          configured: true
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully',
      configured: true,
      details: {
        to: recipientEmail,
        subject: subject || 'SCO SMB - Test Email',
        sentBy: session.username,
        timestamp: new Date().toISOString(),
        emailId: data?.id || 'unknown'
      }
    });

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        configured: !!process.env.RESEND_API_KEY
      },
      { status: 500 }
    );
  }
}
