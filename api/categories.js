module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if(req.params.id) cotegory.id = req.params.id

        try {
            existsOrError(category.name, "Nome não informado")
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(category.id) {
            app.db('category')
                .update(category)
                .where( {id: req.params.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))   
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da categoria não informado.')

            const subcategory = await app.db('categories')
                .where( {parentId: req.params.id })
                notExistsOrError(subcategory, 'Categoria possui subcategoria.')
            
            const articles = await app.db('articles')
                .where({ id: req.params.id })

            notExistsOrError(articles, 'Categoria possui artigos')

            const rowsDel = await app.db('categories')
                                    .where( {id: req.params.id })
                                    .del()
            existsOrError(rowsDel, 'Categoria não encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('categories')
            .then(categories => {
                return res.json(categories)
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send())
    }

    return { save, remove, get, getById }
}