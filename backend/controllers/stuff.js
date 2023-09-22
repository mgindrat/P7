const Books = require('../models/Books');

exports.createBook = (req, res, next) => {
    delete req.body.id;
    const books = new Books({
        ...req.body
    });
    books.save()
        .then(() => res.status(201).json({ message: "Livre enregistré !"}))
        .catch(error => res.status(400).json({ error }));
  }

exports.modifyBooks = (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Livre modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteBooks = (req, res, next) => {
    Books.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneBooks = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
}

exports.getAllBooks = (req, res, next) => {
    Books.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error}));
}