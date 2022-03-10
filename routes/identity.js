var express = require('express');
const { getPublicDB, getSharedPrivateDB, getSharedPublicDB } = require('../services/orbitdb');
var router = express.Router();

router.get('/get',
    async function (req, res) {
        try {
            const publicDB = await getPublicDB()
            // const sharedPublicDB = await getSharedPublicDB()
            // const sharedPrivateDB = await getSharedPrivateDB()
            res.send({
                "publicDB": {
                    "identity": publicDB.identity.id,
                    "address": publicDB.address.toString()
                },
                // "sharedPublicKey": {
                //     "identity": sharedPublicDB.identity.id,
                //     "address": sharedPublicDB.address.toString()
                // },
                // "sharedPrivateKey": {
                //     "identity": sharedPrivateDB.identity.id,
                //     "address": sharedPrivateDB.address.toString()
                // }
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ "err": err })
        }
    }
);

module.exports = router;