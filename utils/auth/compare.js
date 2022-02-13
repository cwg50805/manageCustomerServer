const bcrypt = require("bcryptjs");
const compare = async(password, pwdhash) => {
    return await bcrypt.compare(password, pwdhash);
}

module.exports = compare;