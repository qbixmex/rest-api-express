import envs from './config/envs';
import EmailService from './presentation/email/email.service';
import AppRouter from './presentation/router';
import Server from './presentation/server';

const main = async () => {

  const emailService = new EmailService();

  emailService.sendEmail({
    to: 'daniel.van2024@gmail.com',
    subject: 'This is a test email',
    htmlBody: `
      <h1 style="margin-bottom:8px">Test email</h1>
      <p style="font-size:18px;font-style:italic;">If you can read this, the email was sent successfully. 📧🚀👍</p>
    `,
  });

  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
    public_path: envs.PUBLIC_PATH,
  });
  server.start();
};

(() => main())();
