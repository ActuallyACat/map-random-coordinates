import * as express from 'express';

// @TODO - The applicable endpoints can be template types
const BASE_PATH = '/api';
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.post(`${BASE_PATH}/points`, (req, res, next) => {
  const longWidth = Math.abs(req.body.topLeft.lng - req.body.topRight.lng)
  const latWidth = Math.abs(req.body.topRight.lat - req.body.bottomRight.lat)
  const randomPoints: { lat: number, lng: number }[] = [];

  for (let i = 0; i < 5; i++) {
    const randomWidth = ((longWidth * 1000) * Math.random() / 1000)
    const randomHeight = ((latWidth * 1000) * Math.random() / 1000)
    randomPoints.push({ 'lat': req.body.bottomLeft.lat + randomHeight, 'lng': req.body.topRight.lng - randomWidth })
  }

  res.json({
    points: randomPoints
  });
});

export default router;