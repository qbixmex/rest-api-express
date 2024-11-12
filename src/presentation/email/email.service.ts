import nodemailer from 'nodemailer';
import envs from '../../config/envs';

class EmailService {
  //* ======================= PROPERTIES =======================

  private transporters = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  //* ========================= METHODS =========================

  public async sendEmail(options: SendMailOptions): Promise<boolean> {

    const { to, subject, htmlBody } = options;

    try {

      const sentInformation = await this.transporters.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      console.log(`${"=".repeat(20)} SENT INFORMATION: ${"=".repeat(20)}`);
      console.log(sentInformation);
      console.log("=".repeat(59));

      return true;

    } catch (error) {

      console.error(error);
      return false;

    }

  }
}

type SendMailOptions = {
  to: string;
  subject: string;
  htmlBody: string;
  // TODO: Attachments
};

// TODO: Implement attachments

export default EmailService;