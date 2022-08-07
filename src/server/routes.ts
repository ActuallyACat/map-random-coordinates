import * as express from 'express';
import { generateRandomPoints } from './utils';

// @TODO - The applicable endpoints can be template types
const BASE_PATH = '/api';
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.post(`${BASE_PATH}/points`, (req, res, next) => {
  const randomPoints = generateRandomPoints(req.body.topLeft, req.body.topRight, req.body.bottomLeft, req.body.bottomRight);

  res.json({
    points: randomPoints
  });
});

export default router;