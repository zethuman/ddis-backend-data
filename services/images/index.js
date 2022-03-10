const { getPublicDB } = require("../orbitdb")

async function getData(key) {
    return await new Promise(async (resolve, reject) => {
        try {
            const db = await getPublicDB()
            const data = await db.get(key)
            console.log(await db.all)
            console.log(data)
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}

async function saveData(key, value, metadata) {
    return await new Promise(async (resolve, reject) => {
        try {
            const db = await getPublicDB()
            const info = await db.get(key)
            if (info) {
                console.log(info.identity, db.identity.id)
                if (info.identity === db.identity) {
                    db.put(key, { "hash": value, "identity": db.identity.id, "metadata": metadata }, { pin: true })
                } else {
                    reject("imagename already exists")
                }
            } else {
                db.put(key, { "hash": value, "identity": db.identity.id, "metadata": metadata }, { pin: true })
            }
            resolve(true)
        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    getData,
    saveData
}