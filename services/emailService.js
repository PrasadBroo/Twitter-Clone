const nodemailer = require("nodemailer");
const emailTemplate = require("../templates/verificationEmailTemplate");

module.exports.sendVerificationEmail = async (email, fullname, v_link) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Elon Musk 👻" <paulm431Evansb@rambler.ru>', // sender address
      to: email, // list of receivers
      subject: "Welcome " + fullname, // Subject line
      text: "Verify your email", // plain text body
      html: emailTemplate.sendverificationlink(v_link, fullname), // html body
    });
  } catch (error) {console.log(error)}
};
