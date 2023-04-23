import path from 'path';
import { SendEmailDto } from './auth.dto';
import { readFileSync } from 'fs';
import mustache from 'mustache';
import { createTransport } from 'nodemailer';
import { GraphQLError } from 'graphql';
import { envVariables } from '~/common/utils/env.util';

export const emailService = {
  sendEmail({ verifyUrl, email, subject, type }: SendEmailDto) {
    try {
      const templatePath = path.join(__dirname, 'templates', `${type}.html`);
      const html = readFileSync(templatePath, 'utf8');

      const { mailerUser, mailerPassword } = envVariables;

      const transporter = createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: mailerUser,
          pass: mailerPassword,
        },
      });

      const info = {
        from: `Application name 👻 ${mailerUser}`,
        to: email,
        subject: subject,
        html: mustache.render(html, { link: verifyUrl }),
      };

      return transporter.sendMail(info);
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message);
      }
    }
  },
};
