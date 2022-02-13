const db = require("../sqlite/sqlite");
const compare = require("../utils/auth/compare");
const bcrypt = require("bcryptjs");
const getWeather = require("../utils/getWeather");
const generateAuthToken = require("../utils/auth/generateAuthToken");
const e = require("express");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    const sql = `
        SELECT pwd, email, lastLogin FROM user WHERE role = 'manager' AND email = '${email}';
    `
    db.get(sql, async(error, row) =>{
        if (error){
            throw error 
        }
        if (row == null){
            res.status(400).json({
                msg: "User / Password are incorrect",
                });
            return
        }
        try{
            if (!await compare(password, row.pwd)){
                res.status(400).json({
                    msg: "User / Password are incorrect",
                    });
                return
            }
            const jwtContent = {
                role: row.role,
                email: row.email,
                lastLogin: row.lastLogin,
            };
            res.json({
                name: "Test User",
                token: "Bearer " + generateAuthToken(jwtContent),
                msg: "Successful login",
            });
        }catch(err){
            res.status(400).json({
                        msg: "User / Password are incorrect",
                        });
                    return
        }
        
        
        return
    })
};

const getUsers = async (req, res = response) => {
    const sql = `
    SELECT id, age, lastLogin, name, gender, email, cityOfBirth, role FROM user;
    `

    var map = await getWeather()
    if (map===null){
        res.status(400).json({
            msg: "User / Password are incorrect",
            });
        return
    }
    db.all(sql, async(error, row) =>{
        row.forEach(element => {
            element.temp = map.get(element.cityOfBirth);
            console.log(element);
        });
        if (error){
            throw error 
        }
        try{
            res.json({
                name: "Test User",
                data: row,
                msg: "Successful login",
            });
        }catch(err){
            res.status(400).json({
                        msg: "User / Password are incorrect",
                        });
                    return
        }
        
        
        return
    })
};

const deleteUserByID = async (req, res = response) => {
    const { id } = req.body;
    const sql = `
        DELETE FROM user WHERE id = '${id}';
    `
    db.run(sql, (error) =>{
        if (error){
            throw error 
        }
    })
    res.json({
        name: "Test User",
        msg: "Successful delete",
    });
    return
};



module.exports = {
  login,
  getUsers,
  deleteUserByID,
};