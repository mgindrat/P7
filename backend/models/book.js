const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: {type: Number, required: true},
    userId : {type: String},
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
      {
        userID: {type: String, required: true},
        grade: {type: Number, required: true, min:0, max:5}
      },
  ],
    //ratings.grade: { type: Number, required: true },//
    averageRating: {type: Number, default: 0, required: true},
  });

 
  module.exports = mongoose.model('Book', bookSchema);
 