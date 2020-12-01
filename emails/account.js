const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "milo_of_croton@outlook.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};
const sendDeleteEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "milo_of_croton@outlook.com",
    subject: "Sorry to see you go!",
    text:
      `Hi ${name}, I was wondering why you deleted your account and if there is` +
      ` anything I could do to keep you`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail,
};
