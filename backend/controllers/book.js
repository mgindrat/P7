const fs = require('fs');
const Book = require('../models/book');


//Controleur pour créer un livre
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename.replace(/\.jpeg|\.jpg|\.png/g, "_")}thumbnail.webp`,
    });
        book.save()
    .then(() => { res.status(201).json({message: 'Livre créé !'})})
    .catch(error => { res.status(400).json( { error })})
    
 };

// Controleur modifiant un livre
exports.modifyBooks = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename.replace(/\.jpeg|\.jpg|\.png/g, "_")}thumbnail.webp`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non authorizé'});
            } else {
                if(bookObject.imageUrl){
                    const filenameThumb = book.imageUrl.split('/images/')[1];
                    const filenameLarge = filenameThumb.split('_thumbnail')[0];
                    fs.unlink(`images/${filenameLarge}.jpg`, () => { });
                    fs.unlink(`images/${filenameLarge}.png`, () => { });
                    fs.unlink(`images/${filenameThumb}`, () => { });
                }
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

// Controleur supprimant un livre
exports.deleteBooks = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
       .then(book => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({message: 'Non autorisé'});
           } else {
            // Récupérer le nom de fichier de l'image à partir de l'URL
                const filenameThumb = book.imageUrl.split('/images/')[1];
                const filenameLarge = filenameThumb.split('_thumbnail')[0];
            //Supprime l'image du système de fichier
                fs.unlink(`images/${filenameLarge}.jpg`, () => { });
                fs.unlink(`images/${filenameLarge}.png`, () => { });
                fs.unlink(`images/${filenameThumb}`, () => {
            //Supprime le livre de la DB
                Book.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};

// Controleur affichant un livre par ID
exports.getOneBooks = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
}

// Controleur affichant tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}))
}

// Controleur bestrating 
exports.getBestRating = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
      .then(books => res.status(201).json(books))
      .catch(error => res.status(400).json({error}))
}

//Controleur qui note les livres 
exports.ratingBooks = async (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => {    
        const isAlreadyRated = book.ratings.find((book) => book.userId === req.auth.userId);
          if ( !isAlreadyRated) {
            book.ratings.push({
                userId: req.auth.userId,
                grade: req.body.rating
            })
            let newAverageRating = book.ratings.reduce((accumulator, currentValue) => accumulator + currentValue.grade, 0)/book.ratings.length;
            book.averageRating = newAverageRating;

            return book.save()
            } else {
                res.status(401).json({message: 'Livre déjà noté'});
            }
        })
    .then(book => res.status(201).json(book))
    .catch(error => res.status(500).json({ error }));
  };

