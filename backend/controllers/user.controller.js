const { Op } = require('sequelize')
const Role = require('../helpers/role')
const db = require('../models')

module.exports = {
    index: async (req, res, next) => {
            const {
                username,
                email,
                password
            } = req.body

            const sentence = `INSERT INTO users (username, email, password) VALUES ('` + username + `','` +email +`','` + password+ `')`;
            db.query(sentence, (error) => {
                if (error) {
                    throw error
                }
                res.status(201).send(`User added with ID:`)
            })
    },

    getuser: async (req, res, next) => {
        const sentence = `select * from users where username = '` + req.body.id+`'`;
        db.query(sentence, (error, results)=> {
            if(error) {
                throw error
            }
            res.send(results)
        })
    },
    deluser: async (req, res, next) => {
        const sentence = `delete from users where id = '` + req.body.id + `'`;
        db.query(sentence, (error, results)=> {
            if(error) {
                throw error
            }
            res.status(201).send(`User deleted`);
        })
    },
    edituser: async (req, res, next) => {
        const {
            username,
            email,
            password,
            id
        } = req.body;
        const sentence = `update users set username ='`+username+`', email = '`+email+`', password='`+password+ `' where id = ` +id;
        db.query(sentence, (error, results)=> {
            if(error) {
                throw error
            }
            res.status(201).send('Success')
        })
    }
}
