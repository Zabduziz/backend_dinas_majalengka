const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "8789b15adca47e7037231b36e28587d2"
    }
})

module.exports = transporter