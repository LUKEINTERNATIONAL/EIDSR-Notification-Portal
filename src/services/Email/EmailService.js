var nodemailer =  require('nodemailer')
var updateEmailStatusService = require('./UpdateEmailStatusService')
var transporter = nodemailer.createTransport({
  host: "mx-10.globemw.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'idsrnotification@linmalawi.org',
    pass: 'lukeinternational'
  }
});

async function sendEmail(to, message, messageIDs) {
  var mailOptions = {
    from: 'idsrnotification@linmalawi.org',
    to: to,
    subject: 'EIDSR Notifications',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      updateEmailStatusService.changeEmailStatus(messageIDs)
    }
  });
}

async function Index(req, res) {
  res.send('Email Service 2')
  var { to, message, messageIDs } = req.body
  sendEmail(to, message, messageIDs)
}

module.exports = { Index }