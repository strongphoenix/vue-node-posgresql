const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, resp) => {
        const user = { ...req.body }

        if (req.params.id) {
            user.id = req.params.id
        }

        if (!req.originalUrl.startsWith('/users')) {
            user.admin = false
        }
        if (!req.user || !req.user.admin) {
            user.admin = false
        }

        try {
            existsOrError(user.name, 'Name information')
            existsOrError(user.email, 'E-mail information')
            existsOrError(user.password, 'Senha information')
            existsOrError(user.confirmPassword, 'Confirm invalid')
            equalsOrError(user.password, user.confirmPassword, 'password')

            const userFromDB = await app.db('users').where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'error')
            }

        } catch(msg) {
            return resp.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
               .update(user)
               .where({ id: user.id })
               .whereNull('deletedAt')  
               .then(() => resp.status(204).send())  
               .catch(err => resp.status(500).send(err)) 
        } else {
            // Inclusão
            app.db('users')
               .insert(user)
               .then(() => resp.status(204).send())  
               .catch(err => resp.status(500).send(err))
        }

    }

    const get = (req, resp) => {
        console.log()
        app.db('users')
           .select('id', 'name', 'email', 'admin')
           .whereNull('deletedAt')  
           .then(users => resp.json(users))
           .catch(err => resp.status(500).send(err)) 
    }    

    const stats = (req, resp) => {
        app.db('users')
           .count('id as users')
           .whereNull('deletedAt')  
           .first()
           .then(users => resp.json(users));
    }        

    const getById = (req, resp) => {
        app.db('users')
           .select('id', 'name', 'email', 'admin')
           .where({ id: req.params.id })
           .whereNull('deletedAt')  
           .first()
           .then(user => resp.json(user))
           .catch(err => resp.status(500).send(err)) 
    }    

    const remove = async (req, resp) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })

            existsOrError(rowsUpdated, 'error!')

            resp.status(204).send() // OK
        } catch(msg) {
            resp.status(400).send(msg) // Error
        }
    }

    return { save, get, stats, getById, remove }
}