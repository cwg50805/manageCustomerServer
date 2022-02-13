class customer {
    constructor(db) {
      this.db = db
      this.createTable()
      this.insertData()
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER DEFAULT 0,
        lastLogin INTEGER DEFAULT 0,
        name TEXT,
        gender TEXT,
        email TEXT,
        pwd TEXT,
        role TEXT,
        cityOfBirth TEXT
        )`
      return this.db.run(sql)
    }

    

    async insertData() {
        const bcrypt = require("bcryptjs");
        const pwdHash = await bcrypt.hash("123456", 10);
        const sql = `
        INSERT INTO user(age, name, gender, lastLogin, email, pwd, role, cityOfBirth) VALUES 
        (24, 'will', 'male', ${Math.floor(Date.now()/1000)}, 'will@gmail.com', '${pwdHash}', 'manager', '臺中市'),
        (24, "jack", "male", ${Math.floor(Date.now()/1000)},"jack@gmail.com", "${pwdHash}", "customer","新竹縣"),
        (24, "sherry", "female", ${Math.floor(Date.now()/1000)},"sherry@gmail.com", "${pwdHash}", "customer","金門縣"),
        (24, "amy", "female", ${Math.floor(Date.now()/1000)},"amy@gmail.com", "${pwdHash}", "customer","苗栗縣"),
        (24, "steven", "male", ${Math.floor(Date.now()/1000)},"steven@gmail.com", "${pwdHash}", "customer","新北市"),
        (24, "alex", "male", ${Math.floor(Date.now()/1000)},"alex@gmail.com", "${pwdHash}", "customer","宜蘭縣"),
        (24, "hank", "male", ${Math.floor(Date.now()/1000)},"hank@gmail.com", "${pwdHash}", "customer","雲林縣"),
        (24, "wilson", "male", ${Math.floor(Date.now()/1000)},"wilson@gmail.com", "${pwdHash}", "customer","臺南市"),
        (24, "jimmy", "male", ${Math.floor(Date.now()/1000)},"jimmy@gmail.com", "${pwdHash}", "customer","高雄市"),
        (24, "judy", "male", ${Math.floor(Date.now()/1000)},"judy@gmail.com", "${pwdHash}", "customer","彰化縣"),
        (24, "winnie", "male", ${Math.floor(Date.now()/1000)},"winnie@gmail.com", "${pwdHash}", "customer","臺北市"),
        (24, "willy", "male", ${Math.floor(Date.now()/1000)},"willy@gmail.com", "${pwdHash}", "customer","南投縣"),
        (24, "melody", "female", ${Math.floor(Date.now()/1000)},"melody@gmail.com", "${pwdHash}", "customer","澎湖縣"),
        (24, "frank", "male", ${Math.floor(Date.now()/1000)},"frank@gmail.com", "${pwdHash}", "customer","基隆市"),
        (24, "julia", "female", ${Math.floor(Date.now()/1000)},"julia@gmail.com", "${pwdHash}", "customer","桃園市"),
        (24, "eric", "male", ${Math.floor(Date.now()/1000)},"eric@gmail.com", "${pwdHash}", "customer","花蓮縣"),
        (24, "anna", "female", ${Math.floor(Date.now()/1000)},"anna@gmail.com", "${pwdHash}", "customer","連江縣"),
        (24, "sam", "male", ${Math.floor(Date.now()/1000)},"sam@gmail.com", "${pwdHash}", "customer","臺東縣"),
        (24, "hanna", "female", ${Math.floor(Date.now()/1000)},"hanna@gmail.com", "${pwdHash}", "customer","嘉義市"),
        (24, "ally", "female", ${Math.floor(Date.now()/1000)},"ally@gmail.com", "${pwdHash}", "customer","新竹市");
        `
        return this.db.run(sql)
    }

    getCustomer() {
        const sql = `
        SELECT age, lastLogin, name, gender, email, cityOfBirth FROM user WHERE role = 'customer';
        `
        this.db.each(sql, (error, row) =>{
            console.log(row);
        })
    }
  }
  
module.exports = customer;
