const { getIPFS } = require("../ipfs")
const utf8decoder = new TextDecoder('utf8');

async function createMetadata(body) {
    return await new Promise(async (resolve, reject) => {
        try {
            const ipfs = await getIPFS()
            const data = {
                Data: Buffer.from(JSON.stringify(body)),
                Links: []
            }
            const cid = await ipfs.object.put(data, "json")
            console.log({ "cid": cid.toString() })
            resolve({ "cid": cid.toString() })
        } catch (err) {
            reject(err)
        }
    })
}

async function getMetadata(cid) {
    return await new Promise(async (resolve, reject) => {
        try {
            console.log(cid)
            const ipfs = await getIPFS()
            const decoded = await ipfs.object.data(cid)
            const result = JSON.parse(utf8decoder.decode(decoded))
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createMetadata,
    getMetadata
}