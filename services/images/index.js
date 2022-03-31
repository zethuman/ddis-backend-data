const { getPublicDB } = require("../orbitdb")

async function getData(key) {
    return await new Promise(async (resolve, reject) => {
        try {
            const db = await getPublicDB()
            const data = await db.get(key)
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
                if (info.identity === db.identity.id) {
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

async function deleteData(key) {
    return await new Promise(async (resolve, reject) => {
        try {
            const db = await getPublicDB()
            const info = await db.get(key)
            if (info) {
                if (info.identity === db.identity.id) {
                    deletedHash = db.del(key)
                    resolve(deletedHash)
                } else {
                    reject("You don't have permissions to delete this object")
                }
            } else {
                reject("There isn't any metadata for this image")
            }
        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    getData,
    saveData,
    deleteData
}