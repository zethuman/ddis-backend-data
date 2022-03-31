var express = require('express');
const { saveData, getData, deleteData } = require('../services/images');
const { hash } = require('../services/images/utils');
var router = express.Router();

router.get('/get',
  async function (req, res) {
    const imageName = req.body.name
    const tag = req.body.tag
    try {
      const key = hash(imageName + ":" + (tag ? tag : 'latest'))
      const data = await getData(key)
      if (!data) {
        res.status(404).send({ "hash": `not found` })
        return
      }
      res.status(200).send({ "data": data })
    } catch (err) {
      console.trace(err)
      res.status(500).send({ "err": err })
    }
  }
);

router.post('/post',
  async function (req, res) {
    const body = req.body
    try {
      const key = hash(body.name + ":" + (body.tag ? body.tag : 'latest'))
      const err = await saveData(key, body.hash, body.metadata)
      if (!err) {
        res.status(500).send({ "err": err })
        return
      }
      res.status(200).send({ "status": "success" })
    } catch (err) {
      console.trace(err)
      res.status(500).send({ "err": err })
    }
  }
);

router.delete('/delete',
  async function (req, res) {
    const body = req.body
    try {
      const key = hash(body.name + ":" + (body.tag ? body.tag : 'latest'))
      try {
        const deletedHash = await deleteData(key)
        res.status(200).send({ "status": "deleted", "hash": deletedHash })
      } catch (err) {
        res.status(500).send({ "err": err })
        return
      }
    } catch (err) {
      console.trace(err)
      res.status(500).send({ "err": err })
    }
  }
);

module.exports = router;