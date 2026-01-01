const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Your Verify Token from Dablyo/Meta
const VERIFY_TOKEN = "iVhubyPfGBgfkWAO";

// Parse JSON requests
app.use(bodyParser.json());

// GET request for verification
app.get('/api/v1/whatsapp/webhook/omnichannel/889973874207938', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verified!');
        res.status(200).send(challenge); // Important: respond with the hub.challenge
    } else {
        console.log('❌ Verification failed.');
        res.sendStatus(403);
    }
});

// POST request for incoming messages or status updates
app.post('/api/v1/whatsapp/webhook/omnichannel/889973874207938', (req, res) => {
    console.log('📩 Webhook event received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200); // Must respond 200 to acknowledge
});

app.listen(PORT, () => console.log(`🚀 Dablyo Webhook running on port ${PORT}`));
