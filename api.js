const { google } = require('googleapis');
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '910751201900-ck00aoimnncvr3iokacme5navep4qlov.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = 
  '1//04eYlnrXgCHibCgYIARAAGAQSNwF-L9Irm1i3TWLhDGXSmNpkx-RrIF3d_1LkO03Mp7vGM_RNI5c66kvaTjsRjlY1x2qpVsKEOl0';

const oauth2Client = new google.auth.OAuth2(
CLIENT_ID,
CLIENT_SECRET,
REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'album-6.png')

async function uploadFile() {
try {

    const response = await drive.files.create({
        requestBody: {
            name: 'album6',
            mimeType: 'image/png'

        },
        media: {
            mimeType: 'image/png',
            body: fs.createReadStream(filePath)
        }
    })

    console.log(response.data);
} catch (error) {
    console.log(error.message)
}
}

uploadFile();

async function deleteFile() {
try {
    const response = await drive.files.delete({
    fileId: '1tcUsEgpITzBr5QW1OtyQGUHAvRNpOIuu',
    });
    console.log(response.data, response.status);
} catch (error) {
    console.log(error.message)
}
}

//deleteFile();

async function generatePublicUrl() {
try{
    const fileID = '14WM3sqcI1RvkTI09jTNwzQ95cwwE7mXp';
    await drive.permissions.create({
    fileId: '1djOQWOuBSt9jkEHMwNeqsECXkNxOPcSa',
    requestBody: {
        role: 'reader',
        type: 'anyone',
    }
    });

    const result = await drive.files.get({
    fileId: '1djOQWOuBSt9jkEHMwNeqsECXkNxOPcSa',
    fields: 'webViewLink, webContentLink'
    });
    console.log(result.data);
} catch (error) {
    console.log(error.message);
}
}

//generatePublicUrl();