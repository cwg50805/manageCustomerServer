const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite/customer.db', (err) => {
if (err) {
    console.log('Could not connect to database', err)
} else {
    console.log('Connected to database')
}
})

module.exports = db;