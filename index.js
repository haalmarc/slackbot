require("dotenv").config();
const { App, ExpressReceiver } = require("@slack/bolt");

const PORT = process.env.PORT || 3000;

// Receiver gir adgang til den underliggende express-appen i bolt
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

(async () => {
  await app.start(PORT);
  console.log(`Bolt-app kjører på port ${PORT}`);
})();

/*
  Slack trenger å verifisere at du er eier av URL-en. Dette trengs bare å sjekkes
  en gang per nye URL, og gjøres via en POST-request.
*/
receiver.router.post("/slack/events", (req, res) => {
  if (req?.body?.challenge) res.send({ challenge });
});

// Boten lytter til eventet melding med innholdet "heisann"
app.message("heisann", async ({ message, say }) => {
  // say() sender en melding til kanalen hvor eventet ble avfyrt.
  await say(`Halla på 'ræ <@${message.user}>!`);
});
