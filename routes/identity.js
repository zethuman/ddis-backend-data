var express = require('express');
const { getPublicDB } = require('../services/orbitdb');
var router = express.Router();

router.get('/get',
    async function (req, res) {
        try {
            const publicDB = await getPublicDB()
            res.send({
                "publicDB": {
                    "identity": publicDB.identity.id,
                    "address": publicDB.address.toString()
                },
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ "err": err })
        }
    }
);

module.exports = router;