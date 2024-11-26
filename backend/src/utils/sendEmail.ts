import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  logger.info(`Sending mail to - ${to}`);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Password Reset Request",
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Click the button below to reset your password:</p>
            <a href="${resetLink}" style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            ">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <small>If you did not request a password reset, please ignore this email.</small>
          </div>`,
  };
  logger.info(`Sending mail to - ${email}`);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};
