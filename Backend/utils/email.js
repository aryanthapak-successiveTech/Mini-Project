const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    service:"gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

  });

  const mailOptions = {
    from: "aryanthapak.8@gmail.com",
    to: options.email,
    subject: "Request Approved",
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
