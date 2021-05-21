const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text: String,
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
});

module.exports = mongoose.model('Post', PostSchema);