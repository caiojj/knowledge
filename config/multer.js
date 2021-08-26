const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storageType = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'profile'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'profile'),
    storage: storageType['local'],
    limits: {
        fileSize: 2 * 2024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/git'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type image'))
        }
    }
}