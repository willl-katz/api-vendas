import path from 'path';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';

class SendForgotPasswordEmailService {
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const { token } = await UserTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: 'Api Vendas - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
