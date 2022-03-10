var express = require('express');
const { createMetadata, getMetadata } = require('../services/metadata');
var router = express.Router();

router.get('/get',
  async function (req, res) {
    const cid = req.body.cid
    try {
      const result = await getMetadata(cid)
      res.status(200).send(result)
    } catch (err) {
      console.error(err)
      res.status(500).send({ "err": err })
    }
  }
);

router.post('/create',
  async function (req, res) {
    const body = req.body
    try {
      const cid = await createMetadata(body)
      res.status(200).send(cid)
    } catch (err) {
      console.error(err)
      res.status(500).send({ "err": err })
    }
  }
);

module.exports = router;