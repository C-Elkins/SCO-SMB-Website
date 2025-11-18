import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { firstName, lastName, email, company, phone, employees, useCase } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields (firstName, lastName, email, company)' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'SCO SMB Website <noreply@southcoastoffice.com>',
      to: ['support@southcoastoffice.com'],
      replyTo: email,
      subject: `Free Trial Request - ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #153B6B; border-bottom: 2px solid #00A8B5; padding-bottom: 10px;">
            🎯 New Free Trial Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #153B6B; margin-top: 0;">Contact Information</h3>
            <p><strong style="color: #153B6B;">Name:</strong> ${fullName}</p>
            <p><strong style="color: #153B6B;">Email:</strong> ${email}</p>
            <p><strong style="color: #153B6B;">Company:</strong> ${company}</p>
            ${phone ? `<p><strong style="color: #153B6B;">Phone:</strong> ${phone}</p>` : ''}
            ${employees ? `<p><strong style="color: #153B6B;">Company Size:</strong> ${employees}</p>` : ''}
          </div>
          
          ${useCase ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #153B6B;">Use Case</h3>
            <div style="background-color: #ffffff; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${useCase}</div>
          </div>
          ` : ''}
          
          <div style="background-color: #e8f4f8; border-left: 4px solid #00A8B5; padding: 15px; margin: 20px 0;">
            <h3 style="color: #153B6B; margin-top: 0;">Next Steps</h3>
            <ol style="color: #153B6B; margin: 0;">
              <li>Send trial download links and installation instructions</li>
              <li>Schedule setup call within 24 hours</li>
              <li>Provide 30-day trial license key</li>
              <li>Follow up with dedicated support</li>
            </ol>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d;">
            <p>This trial request was submitted from the SCO SMB website.</p>
            <p>Submission time: ${new Date().toLocaleString()}</p>
            <p><strong>Priority:</strong> High - Free Trial Request</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Also send confirmation email to the user
    const confirmationError = await resend.emails.send({
      from: 'SCO SMB Team <noreply@southcoastoffice.com>',
      to: [email],
      subject: 'Your SCO SMB Free Trial Request - Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #00A8B5; margin-bottom: 20px;">
            <h1 style="color: #153B6B; margin: 0;">SCO SMB</h1>
            <p style="color: #00A8B5; margin: 5px 0 0 0;">Enterprise Document Scanning</p>
          </div>
          
          <h2 style="color: #153B6B;">Thank you for your trial request!</h2>
          
          <p>Hi ${firstName},</p>
          
          <p>We've received your free trial request for SCO SMB and are excited to help you streamline your document scanning workflow.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00A8B5;">
            <h3 style="color: #153B6B; margin-top: 0;">What happens next?</h3>
            <ol style="color: #333; padding-left: 20px;">
              <li><strong>Within 24 hours:</strong> Our team will email you download links and installation instructions</li>
              <li><strong>Setup call:</strong> We'll schedule a brief call to ensure smooth installation and answer any questions</li>
              <li><strong>30-day trial:</strong> You'll receive full access to all enterprise features with dedicated support</li>
            </ol>
          </div>
          
          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #153B6B; margin-top: 0;">Your Trial Includes:</h3>
            <ul style="color: #333; padding-left: 20px;">
              <li>Network scanner auto-discovery</li>
              <li>Automatic file organization</li>
              <li>Multi-protocol support (FTP/SMB/WebDAV)</li>
              <li>Advanced security features</li>
              <li>Technical support during trial</li>
            </ul>
          </div>
          
          <p>If you have any immediate questions, feel free to contact us at <a href="mailto:support@southcoastoffice.com" style="color: #00A8B5;">support@southcoastoffice.com</a> or call us at <a href="tel:+15412675114" style="color: #00A8B5;">(541) 267-5114</a>.</p>
          
          <p>Best regards,<br>
          <strong>The SCO SMB Team</strong><br>
          South Coast Office</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d; text-align: center;">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </div>
      `,
    });

    if (confirmationError.error) {
      console.warn('Failed to send confirmation email:', confirmationError.error);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({ 
      success: true,
      message: 'Trial request submitted successfully' 
    });

  } catch (error) {
    console.error('Trial form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}