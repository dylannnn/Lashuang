// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const formidable = require("formidable");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    console.log(req);
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        res.redirect(303, snapshot.ref);
    });
});

// https://firebase.google.com/docs/functions/gcp-storage-events
// exports.uploadImage = functions.https.onRequest((req, res) => {
//     var form = new formidable.IncomingForm();
//     return new Promise((resolve, reject) => {
//         form.parse(req, function (err, fields, files) {
//             var file = files.fileToUpload;
//             if (!file) {
//                 reject('no file to upload, please choose a file.');
//                 return;
//             }
//             console.info(`about to upload file as a json: ${file.type}`);
//             var filePath = file.path;
//             console.log(`File path: ${filePath}`);

//             var bucket = gcs.bucket('bucket-name');
//             return bucket.upload(filePath, {
//                 destination: file.name
//             }).then(() => {
//                 resolve();  // Whole thing completed successfully.
//             }).catch((err) => {
//                 reject(`Failed to upload: ${JSON.stringify(err)}`);
//             });
//         });
//     }).then(() => {
//         res.status(200).send('Yay!');
//         return null
//     }).catch(err => {
//         console.error(`Error while parsing form: ${err}`);
//         res.status(500).send(`Error while parsing form: ${err}`);
//     });
// });