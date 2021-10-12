const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const baseUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://podkaster.herokuapp.com";

const sendActivationEmail = async ({
  to,
  activationCode,
  pendingAccountId,
}) => {
  const url = `${baseUri}/activate/${pendingAccountId}/${activationCode}`;

  const msg = {
    to: to, // Change to your recipient
    from: "vincentofthe@gmail.com", // Change to your verified sender
    subject: "Registration Email",
    html: `<h2 style="color: black;">In order to complete your registration, visit the link below:</h2><a target="_blank" href="${url}">${url}</a>`,
    text: `In order to complete your registration, visit the link below: \n ${url}`,
  };

  return await sgMail.send(msg);
};

module.exports = {
  sendActivationEmail,
};
