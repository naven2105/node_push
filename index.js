const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// set static path
app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

const publicVapidKey = 'BHDlk0ZSVfpQaHF9V-AtNPGfA_NKJxvQEHrtRey-aMLecjvMi9O84OdWe7m9KgvB_tgTVaKUgsYGysoo7vPlPww';
const privateVapidKey = 'KWMI7oNPtfN9GVj1l1M88oe_KGQs-hs9ahdV6ADHX7E';

webPush.setVapidDetails(
    "mailto:navenpather@gmail.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
    //Get push subscription object
    const subscription = req.body;

    // send 201 - resource created
    res.status(201).json({});

    // create payLoad
    const payload = JSON.stringify({ title: "Push Test"});

    // pass object into a send notification
    webPush.sendNotification(subscription,payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));