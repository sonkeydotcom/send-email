const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;

const pass = process.env.pass;
const user = process.env.user;

const transporter = nodemailer.createTransport({
  service: "SMTP",
  host: "mail.privateemail.com",
  port: "465",
  auth: {
    user: user,
    pass: pass,
  },
});

app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.send(req.body);
});

app.post("/email", function (req, res) {
  const { text } = req.body;
  const mailOptions = {
    from: "app@wallstreetmeme.co",
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
      //res.redirect("https://wallstreetmeme.co/404.html");
      res.end();
    }
  });
});

app.listen(port, function () {
  console.log(`App listenig on port ${port}`);
});
