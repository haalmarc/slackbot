# Slackbot

Dette vil beskrive hvordan man setter opp en Slackbot.

## Første kjøring (lokalt)

### Installasjon

Antar at slack-app er korrekt satt opp.

- Lag en `.env` fil og legg inn app credentials
- `npm install`
- Installer ngrok globalt `npm install ngrok -g`

### Verifiser URL

- Sett flagget `VERIFY_NEW_URL` til `true`
  `npm start`
- I annen terminal:
  `ngrok http 3000`
- Hent ut url fra ngrok og verifiser url i Event Subscriptions i Slack-apps.
- Sett flagget `VERIFY_NEW_URL` til `false`.
- `npm start`.

## Andre kjøring

Med URL verifisert lar man ngrok fortsette å kjøre. Ved endringer i kode må man restarte node-server. Om man avslutter ngrok må man på nytt verifisere url som beskrevet over.
