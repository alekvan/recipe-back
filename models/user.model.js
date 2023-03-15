const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    recipes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'recipe',
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'recipe',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
