import AppError from "@shared/errors/AppError";
import nodemailer from "nodemailer";
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";
import { IParseMailTemplate } from "./@types/PropsTemplate";

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    }, (err: any, res) => {
      if (err) {
        throw new AppError('Error occurred. ' + err.message);
      }
      console.log("Message sent: %s", res.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(res));
    });
  }
}
