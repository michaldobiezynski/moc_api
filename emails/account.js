const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

const sendWelcomeEmail = (email, name) => {
  try {
    client.sendEmail({
      to: email,
      From: "no-reply@miloofcroton.co.uk",
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
      From: "no-reply@miloofcroton.co.uk",
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
      From: "no-reply@miloofcroton.co.uk",
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
  try {
    client.sendEmail({
      From: "no-reply@miloofcroton.co.uk",
      To: "milo_of_croton@outlook.com",
      Subject: "Contact us",
      HtmlBody: "Content: " + content + ". From: " + email,
      TextBody: "Content: " + content + ". From: " + email,
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
