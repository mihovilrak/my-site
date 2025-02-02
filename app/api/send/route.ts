import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend SDK with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  try {
    const { name, email, message } = await request.json();

    // Input validation
    if (!name || !email || !message) {
      return new NextResponse(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('Attempting to send email with data:', { name, email });

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's testing domain
      to: ['mihovil.1978@hotmail.com'],
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    console.log('Resend API response:', data);

    // Only throw error if there's actually an error
    if (data.error) {
      console.error('Resend API error:', data.error);
      throw new Error(data.error.message || 'Failed to send email');
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
