const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {

    const singing = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha.')
        }
        
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if(!user) return res.status(400).send('Usuário não existe, por favor cadastre-se')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if(!isMatch) return res.status(401).send('Email/senha invalidos.')

        const now = Math.floor(Date.now())

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 31)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validationToken = async (req, res) => {
        const userData = req.body || null

        try {
            if(!userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Data()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            
        }

        res.send(false)
    }

    return { singing, validationToken }
}