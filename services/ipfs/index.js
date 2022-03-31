const { create } = require('ipfs-http-client')

let ipfs

async function initIPFS() {
    ipfs = create({ protocol: 'http', host: process.env.IPFS_HOST, port: 5001, path: 'api/v0' })
}

function getIPFS() {
    return ipfs
}

module.exports = {
    initIPFS,
    getIPFS
}