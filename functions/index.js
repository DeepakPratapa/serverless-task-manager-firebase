/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

const db = admin.firestore();

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable "less secure apps" in your account settings.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cmscschedule@gmail.com',
        pass: 'Qwerty@1234'
    }
});

exports.sendNotification = functions.firestore.document('event_items/{eventItemId}')
    .onCreate(async (snap, context) => {
        const eventItem = snap.data();
        const eventId = eventItem.eventId;
        const dueDate = eventItem.dueDates;
        const reminderIntervals = eventItem.reminderIntervals;
        const notificationMethods = eventItem.notificationMethods;

        if (!notificationMethods.includes('email')) {
            return null;
        }

        const eventDoc = await db.collection('event_titles').doc(eventId).get();
        const event = eventDoc.data();
        const eventName = event.eventName;

        const userDoc = await db.collection('user_info').doc(eventItem.uid).get();
        const user = userDoc.data();
        const email = user.email;

        const reminderDate = new Date(dueDate);
        reminderDate.setHours(reminderDate.getHours() - reminderIntervals);

        const mailOptions = {
            from: 'cmscschedule@gmail.com',
            to: email,
            subject: 'Event Notification',
            text: `You have an upcoming event "${eventName}" due on ${dueDate}. Reminder set for ${reminderIntervals} hours before the due date.`
        };

        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.toString());
            }
            return console.log('Email sent: ' + info.response);
        });
    });


