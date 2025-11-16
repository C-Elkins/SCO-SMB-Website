import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, subject, message, agreedToPrivacy } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message || !agreedToPrivacy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SCO SMB Website <noreply@southcoastoffice.com>',
      to: ['support@southcoastoffice.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #153B6B; border-bottom: 2px solid #00A8B5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #153B6B;">Name:</strong> ${name}</p>
            <p><strong style="color: #153B6B;">Email:</strong> ${email}</p>
            ${company ? `<p><strong style="color: #153B6B;">Company:</strong> ${company}</p>` : ''}
            <p><strong style="color: #153B6B;">Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p><strong style="color: #153B6B;">Message:</strong></p>
            <div style="background-color: #ffffff; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d;">
            <p>This message was sent from the SCO SMB website contact form.</p>
            <p>Submission time: ${new Date().toLocaleString()}</p>
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

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}