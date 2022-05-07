const OrbitDB = require('orbit-db')
const { getIPFS } = require('../ipfs')

let publicDB

async function initOrbit() {
    const ipfs = await getIPFS()
    console.log(process.env.MASTER_NODE)
    await ipfs.swarm.connect(process.env.MASTER_NODE)
    const orbitdb = await OrbitDB.createInstance(ipfs, { directory: './orbitdb' })
    try {
        publicDB = await orbitdb.open(process.env.MASTER_DATABASE, {
            sync: true,
            accessController: {
                write: ['*']
            },
        })
        await publicDB.load()
        console.log(await publicDB.get('sample/helloworld:latest'))
        publicDB.events.on("replicated", address => {
            console.log("replicated: ", address)
        })
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    console.log("Public database initialized", publicDB.address.toString())
}

async function getPublicDB() {
    await publicDB.load()
    return publicDB
}

module.exports = {
    getPublicDB,
    initOrbit
}