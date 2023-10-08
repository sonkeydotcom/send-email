const bodyParser = require("body-parser");
const express = require("express");
bodyParser;
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  service: "SMTP",
  host: "mail.wallstreetmeme.co",
  port: "465",
  auth: {
    user: "_mainaccount@wallstreetmeme.co",
    pass: "8U4z*CwFY1j2k!",
  },
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send(req.body);
});

app.post("/email", function (req, res) {
  const { text } = req.body;
  const mailOptions = {
    from: "_mainaccount@wallstreetmeme.co",
    to: "annagu.kennedy@gmail.com",
    subject: " Nodemailer",
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.log("Email sent: " + info.response);
      window.location("http://google.com");
    }
  });
});

app.listen(port, function () {
  console.log(`App listenig on port ${port}`);
});
