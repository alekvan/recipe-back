const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    recipeTitle: {
      type: String,
      required: true,
    },
    recipeImg: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    recipeDesc: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('recipe', recipeSchema);
