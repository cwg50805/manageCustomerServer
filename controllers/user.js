const db = require("../sqlite/sqlite");
const compare = require("../utils/auth/compare");
const bcrypt = require("bcryptjs");
const getWeather = require("../utils/getWeather");
const generateAuthToken = require("../utils/auth/generateAuthToken");
const e = require("express");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    if (!email||!password){
        res.status(401).json({
            msg: "Enter email or password",
        });
        return;
    }
    const sql = `
        SELECT pwd, email, lastLogin FROM user WHERE role = 'manager' AND email = '${email}';
    `;
    db.get(sql, async (error, row) => {
        if (error) {
            throw error;
        }
        if (row == null) {
            throw "User / Password are incorrect"
        }
        try {
            if (!(await compare(password, row.pwd))) {
                throw "User / Password are incorrect"
            }
            const jwtContent = {
                role: row.role,
                email: row.email,
                lastLogin: row.lastLogin,
            };
            res.json({
                jwtToken: await generateAuthToken(jwtContent),
                msg: "Successful login",
            });
        } catch (err) {
            res.status(401).json({
                msg: err,
            });
            return;
        }
    });

    return;
};

const getUsers = async (req, res = response) => {
    const count = `
    SELECT COUNT(*) as 'count' FROM user;
    `;

    var cnt;
    db.get(count, async (error, row) => {
        if(error != null){
            res.status(500).json({
                msg: err,
            });
            return
        }
        cnt = row.count;
    });

    const map = await getWeather();
    if (map === null) {
        res.status(500).json({
            msg: "Error getting weather",
        });
        return;
    }

    try{
        const range = JSON.parse(req.query.range);
        const sort = JSON.parse(req.query.sort);
        const sql = `
        SELECT id, age, lastLogin, name, gender, email, cityOfBirth, role FROM user ORDER BY ${sort[0]
            } ${sort[1]} LIMIT ${range[1] - range[0] + 1} OFFSET ${range[0]} ;
        `;
        db.all(sql, async (error, row) => {
            row.forEach((element) => {
                element.temp = map.get(element.cityOfBirth);
                element.lastLogin = new Date(element.lastLogin * 1000);
            });
            if (error) {
                throw error;
            }
            res.json({
                data: row,
                total: `${range[0]}-${range[1]}/${cnt}`,
                msg: "Successful get data",
            });
        });
    }catch(err){
        res.status(500).json({
                msg: err,
        })
    }
    
    return
};

const deleteUserByID = async (req, res = response) => {
    try{
        const filter = JSON.parse(req.query.filter);
        const { id } = req.body;
        const sql = `
            DELETE FROM user WHERE id IN (${filter["id"].join()});
        `;
        db.run(sql, (result, error) => {
            if (error) {
                throw error;
            }
        });
        res.json({
            data: [{}],
            msg: "Successful delete",
        });
    }catch{
        res.status(500).json({
            msg: err,
        })
    }
    
    return;
};

module.exports = {
    login,
    getUsers,
    deleteUserByID,
};
