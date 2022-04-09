require("dotenv").config();
const { App } = require("@slack/bolt");
const VERIFY_NEW_URL = false;

/*
  For lokal kjøring med ngrok lages en url som peker på en port. Porten brukt i bolt-app 
  må derfor være lik den som ble satt opp med ngrok.
*/
const PORT = process.env.PORT || 3000;

if (VERIFY_NEW_URL) {
  verifyNewUrl();
} else {
  // Boten trenger noen hemmelige credentials for å få tilgang til Slack API.
  const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET, // Hent SigningSecret fra Basic Information
    token: process.env.SLACK_BOT_TOKEN, // Hent Bot User OAuth Token fra OAuth & Permissions
  });

  (async () => {
    await app.start(PORT);

    console.log(`Bolt-app kjører på port ${PORT}`);
  })();

  // Boten lytter til eventet melding med innholdet "heisann"
  app.message("heisann", async ({ message, say }) => {
    // say() sender en melding til kanalen hvor eventet ble avfyrt.
    await say(`Halla på 'ræ <@${message.user}>!`);
  });
}

/*
  Slack trenger å verifisere at du er eier av URL-en. Dette trengs bare å sjekkes
  en gang per nye URL, og gjøres via en POST-request.
*/
function verifyNewUrl() {
  const express = require("express");
  const expressApp = express();
  expressApp.use(express.json());

  expressApp.listen(PORT, () => {
    console.log(`Express-app kjører på port ${PORT}`);
  });

  expressApp.post("/slack/events", (req, res) => {
    const { challenge } = req?.body;

    if (challenge) res.send({ challenge });
  });
}
