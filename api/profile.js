const path = require('path')
require('dotenv').config()

module.exports = app => {

    const save = async (req, res) => {
        const { id } = req.params
        const { filename } = req.file
        const url = `${process.env.APP_URL}/profile/${filename}`
        app.db('users')
            .update({ imageUrl: url })
            .where({ id })
            .then(_ => res.status(200).send())
            .catch(err => res.status(500).send(err))
        return res.status(200).send()
    }

    const getImage = async (req, res) => {
        const { filename } = req.file
        const dirname = path.resolve()
        const fullfilpath = path.join(dirname, '../tmp/profile/' + filename)
        return res.sendFile(fullfilpath)
    }

    return { save, getImage }
}