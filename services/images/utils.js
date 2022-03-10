const crypto = require("crypto")

function hash(data) {
    return crypto.createHash("sha256").update(data, "binary").digest("base64");
}

module.exports = {
    hash
}