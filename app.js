const bodyParser = require("body-parser");
const { config } = require("dotenv");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;

config(); // Correct way to load environment variables

const pass = process.env.PASS; // Use uppercase for environment variable names
const user = process.env.USER;

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: user,
    pass: pass,
  },
});

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome to the email sending service");
});

app.post("/email", function (req, res) {
  const { text } = req.body;
  const mailOptions = {
    from: "app@wallstreetmeme.co",
    to: "annagu.kennedy@gmail.com", // Ideally, use an environment variable or request data
    subject: "Nodemailer",
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
