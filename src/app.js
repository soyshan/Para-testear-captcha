const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de tener node-fetch instalado

const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://soyshan.github.io',
  methods: 'POST',
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));

app.post('/upload', function (req, res) {
  const params = new URLSearchParams({
    secret: '6LekUzgpAAAAAGpPKUJGokol1hp_NZRFnAIu8N7R',
    response: req.body['g-recaptcha-response'],
    remoteip: req.ip,
  });

  fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        res.json({ captchaSuccess: true });
      } else {
        res.json({ captchaSuccess: false });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ captchaSuccess: false });
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});



