import nodemailer from 'nodemailer';

export class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = process.env.EMAIL_FROM;
    }

    newTransport() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD // Use an "App Password" from your Google Account
            }
        });
    }

    async send(template, subject) {
        // In a real app, you would use a template engine like Pug or EJS to render HTML from a file
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>${subject}</h2>
                <p>Hello ${this.firstName},</p>
                <p>You have requested to reset your password. Please click the link below to proceed. This link is valid for 10 minutes.</p>
                <p><a href="${this.url}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Your Password</a></p>
                <p>If you did not request this action, please ignore this email.</p>
                <br>
                <p>Thanks,</p>
                <p>The Hotel Reservation Team</p>
            </div>
        `;

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: `Hello ${this.firstName},\n\nPlease use the following link to reset your password: ${this.url}\n\nIf you did not request this, please ignore this email.`
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for 10 min)');
    }
}