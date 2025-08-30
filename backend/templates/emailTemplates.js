// backend/templates/emailTemplates.js
const getEmailTemplate = (name, email, subject, message) => {
    return {
      text: `You have a new contact form submission:
  
  Name: ${name}
  Email: ${email}
  Subject: ${subject}
  Message: ${message}
  
  This message was sent from your website's contact form.`,
  
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.7;
            color: #2d3748;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%);
            min-height: 100vh;
          }
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
          }
          .email-container {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
                        0 8px 10px -6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .email-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                        0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 30px 25px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(135deg, transparent 45%, #ffffff 45%, #ffffff 55%, transparent 55%);
          }
          .header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
          }
          .content {
            padding: 40px 30px;
          }
          .field {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px dashed #e2e8f0;
            transition: all 0.3s ease;
          }
          .field:hover {
            border-bottom-color: #c7d2fe;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .field-label {
            font-weight: 600;
            color: #4f46e5;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }
          .field-label::before {
            content: '→';
            margin-right: 8px;
            font-size: 16px;
            color: #8b5cf6;
          }
          .field-value {
            color: #2d3748;
            font-size: 16px;
            font-weight: 500;
            padding-left: 15px;
          }
          .message {
            white-space: pre-line;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #8b5cf6;
            font-size: 15px;
            line-height: 1.8;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
          }
          .footer {
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid #edf2f7;
            font-size: 13px;
            color: #718096;
            text-align: center;
            position: relative;
          }
          .footer::before {
            content: '✉️';
            display: block;
            font-size: 24px;
            margin-bottom: 10px;
            opacity: 0.8;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }
          .footer a:hover {
            color: #7c3aed;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            background: #eef2ff;
            color: #4f46e5;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 8px;
            vertical-align: middle;
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 25px 20px;
            }
            .header {
              padding: 25px 20px;
            }
            .header h2 {
              font-size: 24px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="header">
              <h2>New Message Received <span class="badge">New</span></h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">From</span>
                <div class="field-value">${name} &lt;<a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${email}</a>&gt;</div>
              </div>
              <div class="field">
                <span class="field-label">Subject</span>
                <div class="field-value">${subject || '<span style="color: #a0aec0;">No subject provided</span>'}</div>
              </div>
              <div class="field">
                <span class="field-label">Message</span>
                <div class="message">${message}</div>
              </div>
              <div class="footer">
                <p>This message was sent via your website's contact form.</p>
                <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Your Company'}. All rights reserved.</p>
                <p><a href="#" style="color: #4f46e5; text-decoration: none; font-weight: 500;">View in Dashboard</a> • <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">Reply Directly</a></p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
      `
    };
  };
  
  module.exports = { getEmailTemplate };