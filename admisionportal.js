mkdir admission-portal
cd admission-portal
npm init -y
npm install express body-parser nodemailer


const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample database (in-memory)
const applications = {};

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'felisila2015@gmail.com',
        pass: '@@Felly33346281'
    }
});

// Route to handle application submission
app.post('/submit-application', (req, res) => {
    const applicationData = req.body;
    const applicationId = Date.now().toString();
    applications[applicationId] = applicationData;

    // Send admission letter via email
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: applicationData.email,
        subject: 'Admission Letter',
        text: `Dear ${applicationData['full-name']},\n\nCongratulations! You have been admitted to Great Value Academy.\n\nYour Application ID: ${applicationId}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });

    res.send(`Application submitted successfully! Your Application ID: ${applicationId}`);
});

// Route to handle downloading admission letter
app.post('/download-letter', (req, res) => {
    const applicationId = req.body['application-id'];
    const applicationData = applications[applicationId];

    if (!applicationData) {
        return res.status(404).send('Application not found');
    }

    const letterContent = `Dear ${applicationData['full-name']},\n\nCongratulations! You have been admitted to Great Value Academy.\n\nYour Application ID: ${applicationId}`;
    const filePath = path.join(__dirname, 'letters', `${applicationId}.txt`);

    fs.writeFile(filePath, letterContent, (err) => {
        if (err) {
            return res.status(500).send('Error generating letter');
        }

        res.download(filePath, 'Admission_Letter.txt', (err) => {
            if (err) {
                console.log(err);
            }

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
});

// Notify admin of new applications
function notifyAdmin(applicationData) {
    const adminEmail = 'admin-email@gmail.com';
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: adminEmail,
        subject: 'New Admission Application',
        text: `A new application has been submitted:\n\nName: ${applicationData['full-name']}\nEmail: ${applicationData.email}\nPhone: ${applicationData['phone-number']}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Admin notified: ' + info.response);
    });
}

// Listening to the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
