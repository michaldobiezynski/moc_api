const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: "milo_of_croton@outlook.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
    });
  } catch (error) {
    console.log(error);
  }
};
const sendDeleteEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: "milo_of_croton@outlook.com",
      subject: "Sorry to see you go!",
      text:
        `Hi ${name}, I was wondering why you deleted your account and if there is` +
        ` anything I could do to keep you`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail,
};
