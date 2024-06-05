const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;

const pass = process.env.pass; // Environment variables should be uppercase
const user = process.env.user;

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465, // Port should be a number, not a string
  secure: true, // Use SSL
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
  res.send("Welcome to the email sending service");
});

app.post("/email", async function (req, res) { // Added async keyword here
  const { text } = req.body; // Use 'text' to match your frontend data

  const mailOptions = {
    from: "app@wallstreetmeme.co",
    to: "annagu.kennedy@gmail.com",
    subject: "Nodemailer",
    text: text, // Corrected to 'text'
  };

  try {
    const info = await transporter.sendMail(mailOptions); // Await the sendMail function
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
