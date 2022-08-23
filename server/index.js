
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const PORT = '8000';
const HOST = '0.0.0.0';

const bingBaseUrl = 'https://www.bing.com/';

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Accept', '*/*');
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', "true");
  next();
});

app.listen(PORT, () => {
  console.log(`Server iniciado em ${PORT}`);
});

app.get('/bing-image', async (req, res) => {
  console.log(req);
  const endpoint = 'HPImageArchive.aspx';
  let data = {};

  await axios(`${bingBaseUrl}${endpoint}`, {
    params: {
        format: "js",
        idx: 0,
        n: 1,
        mkt: "pt-BR",
    },
  }).then(response => {
    data = {
      status: 'SUCCESS',
      url: `${bingBaseUrl}${response.data.images[0].url}`,
      endDate: response.data.images[0].enddate,
      startDate: response.data.images[0].startdate,
    }
  }).catch(err => {
    // TODO: implements error handling
    console.log(err);
  });

  if (data.status == 'ERROR') {
    return res.status(500).send(data);
  }

  return res.status(200).send(data);
});
