const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const defaultEmailData = { from: "noreply@node-react.com" };

dotenv.config();

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.MAIL_APP_ID}`,
      pass: `${process.env.MAIL_APP_PASSWORD}`
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};
