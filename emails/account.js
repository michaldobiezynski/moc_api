const sgMail = require("@sendgrid/mail");
const postmark = require("postmark");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const client = new postmark.ServerClient(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  try {
    client.sendEmail({
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
    client.sendEmail({
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
const sendPasswordResetCode = (email, name, passwordResetCode) => {
  try {
    client.sendEmail({
      to: email,
      from: "milo_of_croton@outlook.com",
      subject: "Password Reset",
      text:
        `Hi ${name}, if you requested password reset then please use the code below` +
        ` to reset your password. If it wasn't you then please ignore this email.` +
        `You have 10 minutes to use it: ${passwordResetCode}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendContactUsEmail = (email, content) => {
  console.log(email);
  console.log(content);
  try {
    client.sendEmail({
      From: "no-reply@miloofcroton.co.uk",
      To: "no-reply@miloofcroton.co.uk",
      Subject: "Hello from Postmark",
      HtmlBody: "<strong>Hello</strong> dear Postmark user.",
      TextBody: "Hello from Postmark!",
      MessageStream: "outbound",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendContactUsEmail,
  sendWelcomeEmail,
  sendDeleteEmail,
  sendPasswordResetCode,
};
